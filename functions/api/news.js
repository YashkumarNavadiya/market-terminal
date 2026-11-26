// news.js – Cloudflare Worker (HTTP endpoint)
// Serves a JSON list of the latest rewritten news posts.

const NEWS_KV = NEWS_KV; // KV binding

function parseFrontMatter(md) {
  const fmMatch = md.match(/^---\n([\s\S]*?)\n---/);
  const result = {};
  if (fmMatch) {
    fmMatch[1].split('\n').forEach(line => {
      const [k, ...v] = line.split(':');
      if (k && v.length) result[k.trim()] = v.join(':').trim();
    });
  }
  return result;
}

async function onRequest(context) {
  const list = await NEWS_KV.list({ prefix: 'md:' });
  const posts = [];
  for (const key of list.keys) {
    const md = await NEWS_KV.get(key.name);
    const fm = parseFrontMatter(md);
    const slug = key.name.replace(/^md:/, '');
    posts.push({ slug, title: fm.title, date: fm.date, source: fm.source, excerpt: fm.excerpt });
  }
  posts.sort((a,b) => new Date(b.date) - new Date(a.date));
  const latest = posts.slice(0,10);
  return new Response(JSON.stringify(latest), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } });
}

addEventListener('fetch', event => {
  event.respondWith(onRequest(event));
});
