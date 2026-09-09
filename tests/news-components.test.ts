import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import { renderMarkdown } from '../src/lib/markdown.ts';
import { listEditableBlocks } from '../src/lib/edit-blocks.ts';

describe('新闻叙事可视化组件', () => {
  it('renders event chain as an accessible ordered narrative with stagger metadata', async () => {
    const html = await renderMarkdown([
      '::::event-chain{title="事件链" intro="从触发到后续观察"}',
      ':::event-node{step="1" phase="trigger" date="09-09 08:30" title="触发" tone="warning"}',
      '第一条事实。',
      ':::',
      ':::event-node{step="2" phase="response" date="09-09 11:00" title="回应"}',
      '主要回应。',
      ':::',
      '::::',
    ].join('\n'), { lang: 'zh' });

    expect(html).toContain('<section class="news-component event-chain reveal"');
    expect(html).toContain('<h2 class="event-chain-title news-component-title">事件链</h2>');
    expect(html).toContain('<ol class="news-chain-list">');
    expect(html).toContain('<li class="news-component-node event-node reveal tone-warning"');
    expect(html).toContain('style="--delay:0ms"');
    expect(html).toContain('09-09 11:00');
  });

  it('renders value chain and signal flow with mobile-safe list semantics', async () => {
    const html = await renderMarkdown([
      '::::value-chain{title="价值链传导" unit="影响路径"}',
      ':::value-node{index="1" label="原料" metric="供给收缩" tone="risk"}',
      '资源端变化。',
      ':::',
      ':::value-node{index="2" label="终端" metric="价格重估"}',
      '终端变化。',
      ':::',
      '::::',
      '',
      '::::signal-flow{title="信号 → 影响 → 行动"}',
      ':::signal-node{kind="signal" label="事实信号" value="官方声明"}',
      '来源证据。',
      ':::',
      ':::signal-node{kind="action" label="行动" value="政策回应"}',
      '实际行动。',
      ':::',
      '::::',
    ].join('\n'), { lang: 'zh' });

    expect(html).toContain('<ol class="value-chain-list">');
    expect(html).toContain('value-node-label">原料');
    expect(html).toContain('tone-risk');
    expect(html).toContain('<ol class="signal-flow-list">');
    expect(html).toContain('kind-signal');
    expect(html).toContain('kind-action');
  });

  it('renders compare grid and impact spectrum without relying on color alone', async () => {
    const html = await renderMarkdown([
      '::::compare-grid{title="来源叙事对照" caption="事实相同，重点不同"}',
      ':::compare-column{label="共识" tone="consensus"}',
      '共同确认的事实。',
      ':::',
      ':::compare-column{label="盲区" tone="blindspot"}',
      '仍待核验。',
      ':::',
      '::::',
      '',
      '::::impact-spectrum{title="影响谱" scale="1-5"}',
      ':::impact-item{label="治理" score="5" direction="risk"}',
      '监管影响。',
      ':::',
      '::::',
    ].join('\n'), { lang: 'zh' });

    expect(html).toContain('role="list"');
    expect(html).toContain('role="listitem"');
    expect(html).toContain('共识');
    expect(html).toContain('影响强度 5/5');
    expect(html).toContain('5/5');
    expect(html).toContain('风险');
    expect(html).toContain('--impact-score:100%');
  });

  it('keeps the responsive motion contract explicit in CSS', async () => {
    const css = await readFile(new URL('../src/styles/markdown-body.css', import.meta.url), 'utf8');
    expect(css).toContain('@media (max-width: 900px)');
    expect(css).toContain('@media (max-width: 600px)');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('overflow-wrap: anywhere');
    expect(css).toContain('--delay');
    expect(css).toContain('html.js .news-component-node.reveal.reveal-pending');
  });

  it('degrades invalid required attributes and keeps new directives editable', async () => {
    const html = await renderMarkdown([
      '::::impact-spectrum{title="影响谱"}',
      ':::impact-item{label="坏数据" score="9"}',
      '正文仍保留。',
      ':::',
      '::::',
    ].join('\n'), { lang: 'zh' });
    expect(html).not.toContain('impact-spectrum-list');
    expect(html).toContain(':::impact-item');

    const blocks = listEditableBlocks([
      '::::event-chain{title="链"}',
      ':::event-node{title="节点" date="2026"}',
      '内容',
      ':::',
      '::::',
    ].join('\n'));
    expect(blocks.filter((block) => block.name).map((block) => block.name)).toEqual(['event-chain', 'event-node']);
  });
});
