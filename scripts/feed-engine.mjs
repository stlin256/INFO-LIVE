/**
 * InfoLive Main Orchestration Engine
  */
  import { SOURCES } from './sources.mjs';
  import { fetchAllFeeds } from './fetcher.mjs';
  import { summarizeWithAI } from './ai-summarizer.mjs';
  import { writeSiteContent } from './site-writer.mjs';
  
export async function main() {
  console.log('====================================');
    console.log('    InfoLive Intelligence Engine    ');
      console.log('====================================');
        const rawItems = await fetchAllFeeds(SOURCES);
          console.log('[Main] Raw items fetched: ' + rawItems.length);
            const summary = await summarizeWithAI(rawItems);
              await writeSiteContent(summary, rawItems);
                console.log('[Main] Pipeline finished successfully!');
                }
                
main().catch(err => {
  console.error('[Main] Fatal execution error:', err);
    process.exit(1);
    });
    