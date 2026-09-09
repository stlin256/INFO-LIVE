/**
 * Pure-logic task DAG harness for AI orchestration.
 *
 * The harness deliberately knows nothing about HTTP, models, files, or agents.
 * A task can provide `run(input, taskContext)` directly, or callers can provide
 * an injected `execute` function for tasks without a `run` handler.
 */

const TERMINAL_STATUSES = new Set(['succeeded', 'degraded', 'failed', 'skipped']);
const SUCCESS_STATUSES = new Set(['succeeded']);
const DEFAULT_MAX_CONCURRENCY = 4;
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_OUTPUT_LIMIT = 100_000;

export class HarnessValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HarnessValidationError';
  }
}

export class HarnessTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HarnessTimeoutError';
  }
}

function assert(condition, message) {
  if (!condition) throw new HarnessValidationError(message);
}

function normalizeInteger(value, fallback, name, { min = 0 } = {}) {
  if (value === undefined || value === null) return fallback;
  const number = Number(value);
  assert(Number.isInteger(number) && number >= min, `${name} must be an integer >= ${min}`);
  return number;
}

function normalizeTask(task, index) {
  assert(task && typeof task === 'object' && !Array.isArray(task), `tasks[${index}] must be an object`);
  const id = String(task.id ?? '').trim();
  assert(id, `tasks[${index}] is missing id`);
  const dependsOn = task.dependsOn === undefined ? [] : task.dependsOn;
  assert(Array.isArray(dependsOn), `task ${id} dependsOn must be an array`);
  const inputKeys = task.inputKeys === undefined ? [] : task.inputKeys;
  assert(Array.isArray(inputKeys), `task ${id} inputKeys must be an array`);
  return {
    ...task,
    id,
    role: String(task.role ?? id),
    dependsOn: [...new Set(dependsOn.map((dependency) => String(dependency).trim()))],
    inputKeys: inputKeys.map((key) => String(key)),
    optional: Boolean(task.optional),
    retries: normalizeInteger(task.retries, 0, `task ${id} retries`),
    timeoutMs: normalizeInteger(task.timeoutMs, undefined, `task ${id} timeoutMs`, { min: 1 }),
  };
}

/**
 * Validate a task graph and return a stable topological order.
 */
export function validateTaskGraph(tasks) {
  assert(Array.isArray(tasks), 'tasks must be an array');
  const normalized = tasks.map(normalizeTask);
  const byId = new Map();

  for (const task of normalized) {
    assert(!byId.has(task.id), `duplicate task id: ${task.id}`);
    byId.set(task.id, task);
  }
  for (const task of normalized) {
    for (const dependency of task.dependsOn) {
      assert(byId.has(dependency), `task ${task.id} depends on unknown task: ${dependency}`);
    }
  }

  const indegree = new Map(normalized.map((task) => [task.id, task.dependsOn.length]));
  const dependents = new Map(normalized.map((task) => [task.id, []]));
  for (const task of normalized) {
    for (const dependency of task.dependsOn) dependents.get(dependency).push(task.id);
  }

  const queue = normalized.filter((task) => indegree.get(task.id) === 0).map((task) => task.id);
  const order = [];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const id = queue[cursor];
    order.push(id);
    for (const dependent of dependents.get(id)) {
      indegree.set(dependent, indegree.get(dependent) - 1);
      if (indegree.get(dependent) === 0) queue.push(dependent);
    }
  }
  assert(order.length === normalized.length, 'task graph contains a cycle');

  return {
    tasks: normalized,
    byId,
    dependents,
    order,
  };
}

export function topologicalSort(tasks) {
  return validateTaskGraph(tasks).order;
}

function clockValue(now) {
  const value = typeof now === 'function' ? now() : now ?? Date.now();
  if (value instanceof Date) return value.getTime();
  const number = Number(value);
  if (Number.isFinite(number)) return number;
  const parsed = Date.parse(String(value));
  return Number.isFinite(parsed) ? parsed : Date.now();
}

function isoTime(now) {
  return new Date(clockValue(now)).toISOString();
}

function makeRunId(now) {
  const stamp = isoTime(now).replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const suffix = Math.random().toString(36).slice(2, 8).padEnd(6, '0');
  return `${stamp}-${suffix}`;
}

function jsonSize(value) {
  if (value === undefined) return 0;
  try {
    return JSON.stringify(value).length;
  } catch {
    return String(value).length;
  }
}

function redact(value) {
  return String(value ?? '')
    .replace(/Bearer\s+[^\s]+/gi, 'Bearer [REDACTED]')
    .replace(/(api[_-]?key|authorization|token|secret|password)\s*[:=]\s*[^\s,;]+/gi, '$1=[REDACTED]')
    .replace(/\bsk-[A-Za-z0-9_-]+\b/g, '[REDACTED]')
    .slice(0, 500);
}

function errorSummary(error) {
  return redact(error instanceof Error ? error.message : String(error));
}

function cloneForContext(value, maxChars) {
  if (value === undefined) return undefined;
  let serialized;
  try {
    serialized = JSON.stringify(value);
  } catch {
    return { summary: String(value).slice(0, maxChars), truncated: true };
  }
  if (serialized.length <= maxChars) return value;
  return {
    summary: serialized.slice(0, Math.max(0, maxChars - 40)),
    truncated: true,
  };
}

function pickInput(context, inputKeys) {
  if (!inputKeys.length) {
    return context && typeof context === 'object' && !Array.isArray(context) ? { ...context } : { value: context };
  }
  const input = {};
  for (const key of inputKeys) {
    if (Object.prototype.hasOwnProperty.call(context ?? {}, key)) input[key] = context[key];
  }
  return input;
}

function modelCandidates(task, context) {
  const policy = task.modelPolicy;
  let candidates = [];
  if (Array.isArray(policy)) candidates = policy;
  else if (typeof policy === 'string') candidates = [policy];
  else if (policy && typeof policy === 'object') {
    candidates = policy.models
      ?? [policy.primary, policy.primaryModel, policy.fallback, policy.fallbackModel];
  }
  if (!candidates.length && context && typeof context === 'object') {
    candidates = [context.model, context.primaryModel, context.fallbackModel, context.AI_MODEL, context.AI_FALLBACK_MODEL];
  }
  return [...new Set(candidates.filter((model) => model !== undefined && model !== null && String(model) !== '').map(String))];
}

function limitFromPolicy(task, name) {
  const policy = task.modelPolicy;
  return policy && typeof policy === 'object' && Number.isInteger(policy[name]) ? policy[name] : undefined;
}

function getConcurrencyMap(options, aliases) {
  for (const key of aliases) {
    if (options[key] && typeof options[key] === 'object') return options[key];
  }
  return {};
}

function callExecutor(execute, task, input, taskContext) {
  if (typeof execute !== 'function') return undefined;
  if (execute.length >= 3) return execute(task, input, taskContext);
  if (execute.length === 2) return execute(input, taskContext);
  return execute({ task, input, taskContext, run: task.run });
}

function dependencyIsAllowed(dependency, state) {
  return SUCCESS_STATUSES.has(state.status)
    || (dependency.optional && TERMINAL_STATUSES.has(state.status));
}

function dependencySummary(dependency, state, outputs, outputLimit) {
  return {
    status: state.status,
    optional: dependency.optional,
    output: SUCCESS_STATUSES.has(state.status) ? cloneForContext(outputs[dependency.id], outputLimit) : undefined,
    error: state.error,
  };
}

function createMetrics(taskCount, maxConcurrency) {
  return {
    totalTasks: taskCount,
    completedTasks: 0,
    succeeded: 0,
    degraded: 0,
    failed: 0,
    skipped: 0,
    totalAttempts: 0,
    timeouts: 0,
    maxConcurrency,
    peakConcurrency: 0,
    durationMs: 0,
    byRole: {},
    byModel: {},
  };
}

function incrementBucket(bucket, key, field) {
  const name = key || 'unknown';
  bucket[name] ??= {};
  bucket[name][field] = (bucket[name][field] ?? 0) + 1;
}

/**
 * Execute a validated task DAG with bounded concurrency and task isolation.
 */
export async function runHarness({
  tasks,
  context = {},
  execute,
  maxConcurrency = DEFAULT_MAX_CONCURRENCY,
  defaultTimeoutMs = DEFAULT_TIMEOUT_MS,
  now = Date.now,
  runId: requestedRunId,
  roleConcurrency,
  roleMaxConcurrency,
  modelConcurrency,
  modelMaxConcurrency,
  outputLimit = DEFAULT_OUTPUT_LIMIT,
} = {}) {
  const graph = validateTaskGraph(tasks);
  const concurrency = normalizeInteger(maxConcurrency, DEFAULT_MAX_CONCURRENCY, 'maxConcurrency', { min: 1 });
  const timeout = normalizeInteger(defaultTimeoutMs, DEFAULT_TIMEOUT_MS, 'defaultTimeoutMs', { min: 1 });
  const maxOutputChars = normalizeInteger(outputLimit, DEFAULT_OUTPUT_LIMIT, 'outputLimit', { min: 100 });
  const runId = requestedRunId || (context && typeof context === 'object' && context.runId) || makeRunId(now);
  const states = Object.fromEntries(graph.tasks.map((task) => [task.id, {
    id: task.id,
    role: task.role,
    optional: task.optional,
    dependsOn: [...task.dependsOn],
    status: 'pending',
    attempts: 0,
    models: [],
    degradedDependencies: [],
  }]));
  const outputs = {};
  const metrics = createMetrics(graph.tasks.length, concurrency);
  const roleLimits = roleConcurrency ?? roleMaxConcurrency ?? getConcurrencyMap({}, ['roleConcurrency']);
  const modelLimits = modelConcurrency ?? modelMaxConcurrency ?? {};
  const activeRoles = {};
  const activeModels = {};
  let active = 0;
  let runStartedAt = clockValue(now);
  let peakActive = 0;

  const roleLimitFor = (task) => limitFromPolicy(task, 'maxConcurrency') ?? roleLimits?.[task.role] ?? Infinity;
  const modelLimitFor = (task, model) => {
    const policyLimit = limitFromPolicy(task, 'modelConcurrency');
    return policyLimit ?? modelLimits?.[model] ?? Infinity;
  };
  const canStart = (task, model) => active < concurrency
    && (activeRoles[task.role] ?? 0) < roleLimitFor(task)
    && (activeModels[model] ?? 0) < modelLimitFor(task, model);
  const reserve = (task, model) => {
    active += 1;
    activeRoles[task.role] = (activeRoles[task.role] ?? 0) + 1;
    if (model) activeModels[model] = (activeModels[model] ?? 0) + 1;
    peakActive = Math.max(peakActive, active);
    metrics.peakConcurrency = peakActive;
  };
  const release = (task, model) => {
    active -= 1;
    activeRoles[task.role] -= 1;
    if (model) activeModels[model] -= 1;
  };

  const taskInput = (task) => {
    const taskSource = typeof task.input === 'function'
      ? task.input({ context, runId, taskId: task.id, role: task.role })
      : (task.input ?? context);
    const input = pickInput(taskSource, task.inputKeys);
    const dependencies = {};
    const degradedDependencies = [];
    for (const dependencyId of task.dependsOn) {
      const dependency = graph.byId.get(dependencyId);
      const state = states[dependencyId];
      dependencies[dependencyId] = dependencySummary(dependency, state, outputs, maxOutputChars);
      if (!SUCCESS_STATUSES.has(state.status)) degradedDependencies.push(dependencyId);
    }
    input.dependencies = dependencies;
    return { input, degradedDependencies };
  };

  const invokeWithTimeout = async (task, input, taskContext, model) => {
    const controller = new AbortController();
    const actualTimeout = task.timeoutMs ?? timeout;
    const timeoutHandle = setTimeout(() => controller.abort(), actualTimeout);
    let promise;
    try {
      const nextContext = { ...taskContext, model, signal: controller.signal };
      if (typeof task.run === 'function') promise = task.run(input, nextContext);
      else promise = callExecutor(execute, task, input, nextContext);
      if (promise === undefined) throw new Error(`task ${task.id} has no run function or execute handler`);
      return await new Promise((resolve, reject) => {
        let settled = false;
        const finish = (fn, value) => {
          if (settled) return;
          settled = true;
          fn(value);
        };
        const timeoutHandleInner = setTimeout(() => finish(reject, new HarnessTimeoutError(`task ${task.id} timed out after ${actualTimeout}ms`)), actualTimeout);
        Promise.resolve(promise).then(
          (value) => {
            clearTimeout(timeoutHandleInner);
            finish(resolve, value);
          },
          (error) => {
            clearTimeout(timeoutHandleInner);
            finish(reject, error);
          },
        );
      });
    } finally {
      clearTimeout(timeoutHandle);
    }
  };

  const executeTask = async (task) => {
    const state = states[task.id];
    const { input, degradedDependencies } = taskInput(task);
    const models = modelCandidates(task, context);
    const attemptCount = Math.max(task.retries + 1, models.length || 0, 1);
    state.status = 'running';
    state.startedAt = isoTime(now);
    state.inputChars = jsonSize(input);
    state.degradedDependencies = degradedDependencies;
    if (degradedDependencies.length) state.degraded = true;

    let lastError = null;
    let lastModel;
    for (let attempt = 0; attempt < attemptCount; attempt += 1) {
      const model = models[attempt] ?? models.at(-1);
      lastModel = model;
      state.attempts += 1;
      state.models.push(model ?? null);
      metrics.totalAttempts += 1;
      incrementBucket(metrics.byRole, task.role, 'attempts');
      if (model) incrementBucket(metrics.byModel, model, 'attempts');
      const taskContext = {
        runId,
        taskId: task.id,
        role: task.role,
        attempt: attempt + 1,
        maxAttempts: attemptCount,
        context: pickInput(context, task.inputKeys),
        dependencies: input.dependencies,
        degraded: degradedDependencies.length > 0,
        degradedDependencies: [...degradedDependencies],
        execute,
      };
      try {
        const result = await invokeWithTimeout(task, input, taskContext, model);
        if (typeof task.validate === 'function') {
          const valid = await task.validate(result, taskContext);
          if (!valid) throw new Error('task output failed validation');
        }
        outputs[task.id] = result;
        state.outputChars = jsonSize(result);
        state.model = model;
        state.status = 'succeeded';
        lastError = null;
        break;
      } catch (error) {
        lastError = error;
        if (error instanceof HarnessTimeoutError) {
          state.timedOut = true;
          metrics.timeouts += 1;
        }
      }
    }

    state.finishedAt = isoTime(now);
    state.durationMs = Math.max(0, clockValue(now) - clockValue(state.startedAt));
    state.model = lastModel;
    if (state.status !== 'succeeded') {
      state.error = errorSummary(lastError);
      state.status = task.optional ? 'degraded' : 'failed';
    }
    return state;
  };

  const markSkippedIfBlocked = () => {
    let changed = false;
    for (const task of graph.tasks) {
      const state = states[task.id];
      if (state.status !== 'pending') continue;
      const dependenciesTerminal = task.dependsOn.every((dependencyId) => TERMINAL_STATUSES.has(states[dependencyId].status));
      if (!dependenciesTerminal) continue;
      const blockedBy = task.dependsOn.filter((dependencyId) => {
        const dependency = graph.byId.get(dependencyId);
        return !dependencyIsAllowed(dependency, states[dependencyId]);
      });
      if (!blockedBy.length) continue;
      state.status = 'skipped';
      state.skippedBecause = blockedBy;
      state.degradedDependencies = blockedBy;
      state.startedAt = undefined;
      state.finishedAt = isoTime(now);
      state.durationMs = 0;
      state.error = `blocked by required dependency: ${blockedBy.join(', ')}`;
      changed = true;
    }
    return changed;
  };

  const pendingTasks = () => graph.tasks.filter((task) => states[task.id].status === 'pending');
  const readyTasks = () => graph.order
    .map((id) => graph.byId.get(id))
    .filter((task) => states[task.id].status === 'pending')
    .filter((task) => task.dependsOn.every((dependencyId) => TERMINAL_STATUSES.has(states[dependencyId].status)))
    .filter((task) => task.dependsOn.every((dependencyId) => dependencyIsAllowed(graph.byId.get(dependencyId), states[dependencyId])));

  const startTask = (task) => {
    const firstModel = modelCandidates(task, context)[0];
    if (!canStart(task, firstModel)) return false;
    reserve(task, firstModel);
    executeTask(task).finally(() => release(task, firstModel));
    return true;
  };

  while (pendingTasks().length || active) {
    markSkippedIfBlocked();
    let started = false;
    for (const task of readyTasks()) {
      if (active >= concurrency) break;
      if (startTask(task)) started = true;
    }
    if (active) {
      await new Promise((resolve) => setTimeout(resolve, started ? 0 : 1));
      continue;
    }
    if (!started && pendingTasks().length) {
      // This can only happen with a malformed limit (caught above) or a task
      // whose role/model budget is zero. Mark it explicitly instead of hanging.
      for (const task of readyTasks()) {
        const state = states[task.id];
        state.status = 'skipped';
        state.error = 'no available concurrency budget';
        state.finishedAt = isoTime(now);
      }
    }
  }

  const finishedAt = clockValue(now);
  runStartedAt = Number.isFinite(runStartedAt) ? runStartedAt : finishedAt;
  metrics.durationMs = Math.max(0, finishedAt - runStartedAt);
  for (const state of Object.values(states)) {
    metrics[state.status] += 1;
    metrics.completedTasks += 1;
    incrementBucket(metrics.byRole, state.role, state.status);
    if (state.model) incrementBucket(metrics.byModel, state.model, state.status);
  }
  const degraded = Object.values(states).some((state) => state.status !== 'succeeded');
  return {
    runId,
    tasks: states,
    taskList: graph.order.map((id) => states[id]),
    outputs,
    metrics,
    degraded,
    degradedTasks: Object.values(states).filter((state) => state.status !== 'succeeded').map((state) => state.id),
  };
}
