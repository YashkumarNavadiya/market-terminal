// news_fetcher.js – Cloudflare Worker (scheduled)
import RSSParser from 'rss-parser';

// KV namespace (auto‑injected by Cloudflare Workers KV binding)
const NEWS_KV = NEWS_KV; // binding name defined in wrangler.toml

const parser = new RSSParser();

async function fetchAndStore() {
  // Load RSS source list – stored as JSON in KV under key 'sources'
  const sourcesRaw = await NEWS_KV.get('sources', { type: 'json' });
  const sources = sourcesRaw ?? [];
  for (const url of sources) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items) {
        const id = `raw:${item.link.replace(/[^a-zA-Z0-9]/g, '_')}`;
        await NEWS_KV.put(id, JSON.stringify(item), { expirationTtl: 86400 }); // 1 day
      }
    } catch (e) {
      console.error('RSS fetch error', url, e);
    }
  }
}

addEventListener('scheduled', event => event.waitUntil(fetchAndStore()));
