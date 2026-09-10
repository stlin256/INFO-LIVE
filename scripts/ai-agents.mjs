/**
 * Expert-agent contracts used by the orchestration harness.
 *
 * This module is deliberately dependency-free.  It describes the agents, their
 * small input contracts and budgets, and validates data before it is handed to
 * another agent or to the site writer.  It does not call a model or perform
 * any I/O.
 */

export const AGENT_ROLES = Object.freeze([
  'fact-extractor',
  'translator',
  'source-positioner',
  'topic-classifier',
  'media-evidence',
  'evidence-merger',
  'hourly-editor',
  'daily-analyst',
  'social-trends',
  'topic-lifecycle',
  'editorial-qa',
]);

// Aliases make the public contract convenient for callers which use either
// "roles" or "agents" terminology.
export const ROLES = AGENT_ROLES;
export const AGENT_ROLE_SET = new Set(AGENT_ROLES);

export const MIN_INPUT_METADATA = Object.freeze([
  'schemaVersion',
  'runId',
  'taskId',
  'role',
  'generatedAt',
  'targetLanguage',
]);

export const DEFAULT_MODEL_POLICY = Object.freeze({
  primary: process.env.AI_MODEL || 'gemini-3.8-flash',
  fallback: process.env.AI_FALLBACK_MODEL || 'gpt-5.6-luna',
  primaryModel: process.env.AI_MODEL || 'gemini-3.8-flash',
  fallbackModel: process.env.AI_FALLBACK_MODEL || 'gpt-5.6-luna',
  maxAttempts: 2,
  retries: 1,
  failoverOnInvalidJson: true,
  retryableStatuses: Object.freeze([429, 500, 502, 503, 504]),
  samePayloadOnce: true,
});

export const DEFAULT_BUDGET = Object.freeze({
  maxInputChars: 12000,
  maxOutputChars: 6000,
  timeoutMs: 30000,
  retries: 1,
  maxAttempts: 2,
});
export const DEFAULT_BUDGETS = DEFAULT_BUDGET;

const ARTICLE_REQUIRED = Object.freeze([
  'article.id',
  'article.title',
  'article.source',
  'article.sourceLang',
  'article.publishedAt',
  'article.url',
]);

const ROLE_REQUIRED_INPUT = Object.freeze({
  'fact-extractor': [...ARTICLE_REQUIRED],
  translator: [...ARTICLE_REQUIRED],
  'source-positioner': [...ARTICLE_REQUIRED, 'evidence.facts'],
  'topic-classifier': ['article.id', 'article.title', 'evidence.facts'],
  'media-evidence': [...ARTICLE_REQUIRED, 'article.imageUrl'],
  'evidence-merger': ['relatedArticles', 'evidence'],
  'hourly-editor': ['relatedArticles', 'evidence'],
  'daily-analyst': ['relatedArticles', 'evidence'],
  'social-trends': ['relatedArticles', 'evidence'],
  'topic-lifecycle': ['topicContext', 'evidence'],
  'editorial-qa': ['relatedArticles', 'evidence'],
});

const ROLE_REQUIRED_OUTPUT = Object.freeze({
  'fact-extractor': ['facts', 'entities', 'unverified', 'evidence'],
  translator: ['translatedTitle', 'originalTitle', 'fullTranslation'],
  'source-positioner': ['sourceRole', 'narrativeFocus', 'stakeholders', 'consensus', 'disagreements', 'blindSpots'],
  'topic-classifier': ['dimensions', 'tags', 'candidateTopicSlugs', 'priority'],
  'media-evidence': ['images', 'source', 'explanation'],
  'evidence-merger': ['facts', 'conflicts', 'citations'],
  'hourly-editor': ['title', 'lead', 'signals', 'recommendedArticles'],
  'daily-analyst': ['title', 'lead', 'themes'],
  'social-trends': ['radar', 'debates'],
  'topic-lifecycle': ['action', 'slug', 'stage'],
  'editorial-qa': ['valid', 'warnings', 'repairs'],
});

const ROLE_BUDGETS = Object.freeze({
  'fact-extractor': { maxInputChars: 12000, maxOutputChars: 5000, timeoutMs: 25000 },
  translator: { maxInputChars: 12000, maxOutputChars: 12000, timeoutMs: 30000 },
  'source-positioner': { maxInputChars: 12000, maxOutputChars: 5000, timeoutMs: 25000 },
  'topic-classifier': { maxInputChars: 12000, maxOutputChars: 4000, timeoutMs: 20000 },
  'media-evidence': { maxInputChars: 6000, maxOutputChars: 3000, timeoutMs: 20000 },
  'evidence-merger': { maxInputChars: 28000, maxOutputChars: 8000, timeoutMs: 35000 },
  'hourly-editor': { maxInputChars: 20000, maxOutputChars: 8000, timeoutMs: 35000 },
  'daily-analyst': { maxInputChars: 20000, maxOutputChars: 8000, timeoutMs: 35000 },
  'social-trends': { maxInputChars: 16000, maxOutputChars: 6000, timeoutMs: 30000 },
  'topic-lifecycle': { maxInputChars: 16000, maxOutputChars: 6000, timeoutMs: 30000 },
  'editorial-qa': { maxInputChars: 20000, maxOutputChars: 5000, timeoutMs: 30000 },
});

const ROLE_DESCRIPTIONS = Object.freeze({
  'fact-extractor': 'Extracts claims, entities, numbers and evidence without adding facts.',
  translator: 'Translates one article while preserving the original title and provenance.',
  'source-positioner': 'Separates source framing, interests and blind spots from facts.',
  'topic-classifier': 'Assigns dimensions, tags and candidate topic slugs.',
  'media-evidence': 'Checks image/media provenance and describes media evidence.',
  'evidence-merger': 'Merges article-level evidence and makes conflicts explicit.',
  'hourly-editor': 'Writes a bounded hourly brief from verified event clusters.',
  'daily-analyst': 'Produces a 24-hour analysis from aggregated, verified evidence.',
  'social-trends': 'Summarizes community signals, heat and disagreements.',
  'topic-lifecycle': 'Decides whether a topic is initiated, evolved, iterated or archived.',
  'editorial-qa': 'Runs publication quality checks and proposes repairs without editing evidence.',
});

const COMMON_RESULT_REQUIRED = Object.freeze(['schemaVersion', 'role', 'runId', 'status', 'data']);
const RESULT_STATUSES = new Set(['ok', 'degraded', 'empty']);

const SENSITIVE_KEY_PARTS = [
  'apiKey', 'apikey', 'authorization', 'authToken', 'accessToken', 'refreshToken',
  'password', 'passwd', 'secret', 'privateKey', 'clientSecret', 'cookie', 'setCookie',
  'command', 'shell', 'exec', 'spawn', 'processEnv', 'environmentVariables',
  'filePath', 'filesystem', 'writeFile', 'deleteFile', 'gitCommand', 'headers',
];
const DANGEROUS_SCHEMES = /^(?:javascript|vbscript|file):/i;
const MAX_VALIDATION_DEPTH = 12;

function freeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value)) freeze(child);
  return value;
}

function isPlainObject(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function pathValue(value, path) {
  return path.split('.').reduce((current, part) => {
    if (current === null || current === undefined) return undefined;
    return current[part];
  }, value);
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validPublishedAt(value) {
  return value === null || value === undefined || (nonEmptyString(value) && !Number.isNaN(Date.parse(value)));
}

function pushRequiredErrors(value, required, errors) {
  for (const path of required) {
    const current = pathValue(value, path);
    const nullable = path === 'article.publishedAt' || path === 'article.imageUrl';
    if (current === undefined || (!nullable && current === null) || (typeof current === 'string' && !current.trim())) {
      errors.push(`${path} is required`);
    }
  }
}

function checkInputShape(agent, input) {
  const errors = [];
  if (!isPlainObject(input)) return ['input must be a plain object'];

  pushRequiredErrors(input, MIN_INPUT_METADATA, errors);
  pushRequiredErrors(input, agent.requiredInput, errors);
  if (input.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  if (input.role !== agent.role) errors.push(`role must be ${agent.role}`);
  for (const field of ['runId', 'taskId', 'targetLanguage']) {
    if (input[field] !== undefined && !nonEmptyString(input[field])) errors.push(`${field} must be a non-empty string`);
  }
  if (input.generatedAt !== undefined && (typeof input.generatedAt !== 'string' || Number.isNaN(Date.parse(input.generatedAt)))) {
    errors.push('generatedAt must be an ISO date string');
  }
  if (input.article !== undefined && !isPlainObject(input.article)) errors.push('article must be an object');
  if (input.article?.publishedAt !== undefined && !validPublishedAt(input.article.publishedAt)) {
    errors.push('article.publishedAt must be a valid date or null');
  }
  if (input.article?.url !== undefined && !isHttpUrl(input.article.url)) errors.push('article.url must be an http(s) URL');
  if (input.article?.imageUrl !== undefined && input.article.imageUrl !== null && !isHttpUrl(input.article.imageUrl)) {
    errors.push('article.imageUrl must be an http(s) URL or null');
  }
  if (input.lineage !== undefined && !isPlainObject(input.lineage)) errors.push('lineage must be an object');
  return errors;
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function checkResultShape(agent, result) {
  const errors = [];
  if (!isPlainObject(result)) return ['result must be a plain object'];
  pushRequiredErrors(result, agent.requiredOutput, errors);

  if (result.translatedTitle !== undefined && !nonEmptyString(result.translatedTitle)) errors.push('translatedTitle must be a non-empty string');
  if (result.originalTitle !== undefined && !nonEmptyString(result.originalTitle)) errors.push('originalTitle must be a non-empty string');
  if (result.fullTranslation !== undefined && !nonEmptyString(result.fullTranslation)) errors.push('fullTranslation must be a non-empty string');
  if (result.valid !== undefined && typeof result.valid !== 'boolean') errors.push('valid must be a boolean');
  if (result.priority !== undefined && (!Number.isFinite(result.priority) || result.priority < 0 || result.priority > 100)) errors.push('priority must be a number from 0 to 100');
  if (result.action !== undefined && !['initiate', 'evolve', 'iterate', 'archive', 'reopen'].includes(result.action)) errors.push('action is not a supported topic lifecycle action');
  if (result.citations !== undefined && !Array.isArray(result.citations)) errors.push('citations must be an array');
  return errors;
}

function checkSafeFields(value, path = '$', depth = 0, errors = []) {
  if (depth > MAX_VALIDATION_DEPTH) {
    errors.push(`${path} exceeds maximum nesting depth`);
    return errors;
  }
  if (value === null || value === undefined) return errors;
  if (typeof value === 'string') {
    if (DANGEROUS_SCHEMES.test(value.trim())) errors.push(`${path} contains a dangerous URL scheme`);
    if (/\b(?:Bearer\s+[A-Za-z0-9._~+/=-]+|sk-[A-Za-z0-9_-]{12,})\b/i.test(value)) errors.push(`${path} appears to contain a credential`);
    return errors;
  }
  if (typeof value !== 'object') return errors;
  if (Array.isArray(value)) {
    value.forEach((item, index) => checkSafeFields(item, `${path}[${index}]`, depth + 1, errors));
    return errors;
  }
  for (const [key, child] of Object.entries(value)) {
    const normalized = key.replace(/[-_]/g, '').toLowerCase();
    if (SENSITIVE_KEY_PARTS.some((part) => normalized === part.replace(/[-_]/g, '').toLowerCase())) {
      errors.push(`${path}.${key} is not allowed in agent data`);
      continue;
    }
    checkSafeFields(child, `${path}.${key}`, depth + 1, errors);
  }
  return errors;
}

export function validateSafeFields(value) {
  const errors = checkSafeFields(value);
  return { valid: errors.length === 0, ok: errors.length === 0, errors };
}
export const checkResultSafety = validateSafeFields;
export const isSafeFields = (value) => validateSafeFields(value).valid;

function validationResult(errors, value) {
  return { valid: errors.length === 0, ok: errors.length === 0, errors, value };
}

function normalizeDefinition(definition) {
  if (!isPlainObject(definition)) throw new TypeError('agent definition must be a plain object');
  const role = definition.role;
  if (!nonEmptyString(role) || !/^[a-z][a-z0-9-]{1,63}$/.test(role)) throw new TypeError('agent role must be a kebab-case string');
  const requiredInput = [...(definition.requiredInput || definition.inputSchema?.required || [])];
  const requiredOutput = [...(definition.requiredOutput || definition.resultSchema?.required || definition.outputSchema?.required || [])];
  if (!requiredOutput.length) throw new TypeError(`agent ${role} needs a result schema`);
  const budget = { ...DEFAULT_BUDGET, ...(definition.budget || {}) };
  const modelPolicy = { ...DEFAULT_MODEL_POLICY, ...(definition.modelPolicy || {}) };
  return freeze({
    role,
    name: definition.name || role,
    description: definition.description || '',
    requiredInput,
    requiredOutput,
    requiredInputMetadata: [...MIN_INPUT_METADATA],
    inputSchema: { type: 'object', required: [...MIN_INPUT_METADATA, ...requiredInput] },
    resultSchema: { type: 'object', required: [...requiredOutput] },
    outputSchema: { type: 'object', required: [...requiredOutput] },
    budget,
    modelPolicy,
    validateInput: (input) => validateAgentInput(role, input),
    validateResult: (result) => validateAgentResult(role, result),
  });
}

const registry = new Map();

export function registerAgent(definition, options = {}) {
  const agent = normalizeDefinition(definition);
  if (registry.has(agent.role) && options.replace !== true) throw new Error(`agent already registered: ${agent.role}`);
  registry.set(agent.role, agent);
  return agent;
}

for (const role of AGENT_ROLES) {
  registerAgent({
    role,
    description: ROLE_DESCRIPTIONS[role],
    requiredInput: ROLE_REQUIRED_INPUT[role],
    requiredOutput: ROLE_REQUIRED_OUTPUT[role],
    budget: { ...DEFAULT_BUDGET, ...ROLE_BUDGETS[role] },
  });
}

export const AGENT_REGISTRY = registry;
export const AGENTS = Object.freeze(Object.fromEntries(registry));

export function getAgent(role) {
  const agent = registry.get(typeof role === 'string' ? role : role?.role);
  if (!agent) throw new Error(`unknown agent role: ${String(role)}`);
  return agent;
}

export function hasAgent(role) {
  return registry.has(role);
}

export function listAgents() {
  return [...registry.values()];
}

export function validateAgentInput(roleOrInput, maybeInput) {
  const input = maybeInput === undefined ? roleOrInput : maybeInput;
  const role = maybeInput === undefined ? input?.role : roleOrInput;
  let agent;
  try {
    agent = getAgent(role);
  } catch (error) {
    return validationResult([error.message], input);
  }
  const safety = validateSafeFields(input);
  return validationResult([...checkInputShape(agent, input), ...safety.errors], input);
}

function validateCommonEnvelope(agent, result) {
  const errors = [];
  if (!isPlainObject(result)) return ['result must be a plain object'];
  pushRequiredErrors(result, COMMON_RESULT_REQUIRED, errors);
  if (result.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  if (result.role !== agent.role) errors.push(`role must be ${agent.role}`);
  if (!RESULT_STATUSES.has(result.status)) errors.push('status must be ok, degraded or empty');
  if (!nonEmptyString(result.runId)) errors.push('runId must be a non-empty string');
  if (!isPlainObject(result.data)) errors.push('data must be an object');
  if (result.citations !== undefined && !Array.isArray(result.citations)) errors.push('citations must be an array');
  return errors;
}

export function validateCommonResult(result, role) {
  let agent;
  try {
    agent = getAgent(role || result?.role);
  } catch (error) {
    return validationResult([error.message], result);
  }
  const errors = validateCommonEnvelope(agent, result);
  if (errors.length === 0) errors.push(...checkResultShape(agent, result.data));
  errors.push(...validateSafeFields(result).errors);
  return validationResult(errors, result);
}

export function validateAgentResult(roleOrResult, maybeResult) {
  const result = maybeResult === undefined ? roleOrResult : maybeResult;
  const role = maybeResult === undefined ? result?.role : roleOrResult;
  let agent;
  try {
    agent = getAgent(role);
  } catch (error) {
    return validationResult([error.message], result);
  }
  const errors = Object.prototype.hasOwnProperty.call(result || {}, 'data')
    ? validateCommonResult(result, agent.role).errors
    : [...checkResultShape(agent, result), ...validateSafeFields(result).errors];
  return validationResult(errors, result);
}
export const validateAgentOutput = validateAgentResult;

export function assertValidAgentInput(roleOrInput, maybeInput) {
  const validation = validateAgentInput(roleOrInput, maybeInput);
  if (!validation.valid) throw new Error(`invalid ${typeof roleOrInput === 'string' ? roleOrInput : roleOrInput?.role || 'agent'} input: ${validation.errors.join('; ')}`);
  return validation.value;
}

export function assertValidAgentResult(roleOrResult, maybeResult) {
  const validation = validateAgentResult(roleOrResult, maybeResult);
  if (!validation.valid) throw new Error(`invalid agent result: ${validation.errors.join('; ')}`);
  return validation.value;
}

export const COMMON_RESULT_SCHEMA = Object.freeze({
  type: 'object',
  required: [...COMMON_RESULT_REQUIRED],
  statuses: [...RESULT_STATUSES],
});

export { ROLE_REQUIRED_INPUT, ROLE_REQUIRED_OUTPUT };
