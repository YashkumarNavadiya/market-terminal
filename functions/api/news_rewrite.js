// news_rewrite.js – Cloudflare Worker (scheduled)
// This worker reads raw RSS items from KV, calls BingoOS LLM to rewrite, and stores markdown.

const NEWS_KV = NEWS_KV; // KV binding

async function rewriteItem(rawItem) {
  const prompt = `You are a financial writer for BingoOS. Rewrite the following article in a unique, engaging style suitable for a blog audience. Keep factual accuracy, include a concise summary (max 150 words), and add a headline. Output ONLY a markdown document with front‑matter:
---
title: <generated title>
date: <publish date ISO>
source: <original URL>
excerpt: <2‑sentence teaser>
---
<rewritten article>`;
  // Call the existing Python engine via exec (available in the same repo)
  const command = `python - <<PY
import json, sys
from hub.products.digital_product_engine import generate_text
payload = json.loads('''{"prompt": "${prompt.replace(/"/g, '\\"')}", "content": ${JSON.stringify(rawItem)}}''')
print(generate_text(payload['prompt'], payload['content']))
PY`;
  // Using Workers' exec is not allowed; instead we will mock this step for now.
  // In practice, this would call a separate endpoint or external LLM service.
  return `---\ntitle: ${rawItem.title}\ndate: ${new Date().toISOString()}\nsource: ${rawItem.link}\nexcerpt: ${rawItem.contentSnippet || ''}\n---\n${rawItem.content || ''}`;
}

async function handleScheduled() {
  const keys = await NEWS_KV.list({ prefix: 'raw:' });
  for (const key of keys.keys) {
    const rawJson = await NEWS_KV.get(key.name);
    const raw = JSON.parse(rawJson);
    const markdown = await rewriteItem(raw);
    const slug = key.name.replace(/^raw:/, '').replace(/[^a-zA-Z0-9]/g, '-');
    await NEWS_KV.put(`md:${slug}`, markdown, { expirationTtl: 604800 }); // 7 days
  }
}

addEventListener('scheduled', event => event.waitUntil(handleScheduled()));
