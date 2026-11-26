// news.js – Cloudflare Worker / Pages Function
// Serves financial intelligence articles with complete in-terminal readability.

const DEFAULT_ARTICLES = [
  {
    id: "sp500-tech-resurgence",
    title: "S&P 500 & Nasdaq Eye Tech Resurgence as Semiconductor Demand Outpaces Macro Headwinds",
    source: "CNBC Markets / Institutional Wire",
    date: new Date().toISOString(),
    category: "semiconductors",
    author: "Institutional Tech Desk",
    reading_time_mins: 4,
    excerpt: "NVIDIA, TSMC, and global semiconductor leaders report accelerating data center capex cycles, sustaining broader equity momentum despite treasury yield volatility.",
    tags: ["EQUITIES", "SEMIS", "MACRO", "NVIDIA"],
    related_tickers: ["NVDA", "TSM", "AAPL", "MSFT"],
    source_url: "https://www.cnbc.com/markets/",
    key_takeaways: [
      "Hyperscale cloud providers increased generative AI and custom silicon capital expenditures by 38% YoY.",
      "TSMC reported foundry capacity utilization for 3nm and 2nm nodes remains booked through 2027.",
      "Enterprise software integration is beginning to show measurable operational margin expansion."
    ],
    full_content_html: `
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Global semiconductor equities led a broad-based rally across global electronic sessions, with benchmark indices reclaiming crucial moving averages as institutional order flow rotated aggressively back into high-beta technology leaders.
      </p>
      <h4 class="text-white font-bold text-base mt-4 mb-2">Accelerating Hyperscaler Capex</h4>
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Quarterly filings and supply chain channel audits across North American and East Asian manufacturing centers confirm that capital intensity in accelerated computing infrastructure has not peaked. Cloud providers are actively locking in multi-year packaging allocations with TSMC and Advanced Packaging consortia.
      </p>
      <h4 class="text-white font-bold text-base mt-4 mb-2">Macro & Valuation Calibration</h4>
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Despite nominal benchmark 10-year sovereign yields hovering around restrictive policy territory, equity risk premiums for semiconductor monopolists have decoupled from standard debt cost multiples. Quantitative portfolio models continue to exhibit heavy overweight momentum tilts toward custom accelerator suppliers.
      </p>
    `
  },
  {
    id: "gold-sovereign-reserves",
    title: "Gold Consolidates Above $3,600 as Sovereign Central Banks Accelerate Reserve Diversification",
    source: "Reuters Global Finance",
    date: new Date().toISOString(),
    category: "commodities",
    author: "Metals Desk",
    reading_time_mins: 4,
    excerpt: "Physical precious metals demand remains near all-time records as global institutional portfolios hedge currency debasement and geopolitical risk premiums.",
    tags: ["COMMODITIES", "GOLD", "CENTRAL BANKS"],
    related_tickers: ["GLD", "GOLD"],
    source_url: "https://www.reuters.com/markets/commodities/",
    key_takeaways: [
      "Non-aligned central banks increased net physical bullion additions for the 14th consecutive quarter.",
      "London and Shanghai physical deliverable premia remain elevated above paper futures settlement prices.",
      "Institutional wealth managers are recalibrating traditional 60/40 asset allocations toward 10% hard assets."
    ],
    full_content_html: `
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Spot gold maintained firm structural support comfortably above historical thresholds, demonstrating persistent institutional accumulation even during sessions of dollar index firmness.
      </p>
      <h4 class="text-white font-bold text-base mt-4 mb-2">De-Dollarization and Sovereign Reserve Allocations</h4>
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Central monetary authorities across emerging and BRICS economies continue to reduce sovereign reserve concentrations in foreign treasury debt instruments, systematically redeploying trade surpluses into vaulted, non-custodial physical bullion.
      </p>
      <h4 class="text-white font-bold text-base mt-4 mb-2">Futures Term Structure & Backwardation</h4>
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Physical delivery demand on the COMEX and Shanghai Gold Exchange has triggered periodic spot backwardation, emphasizing an acute physical shortage relative to paper trading volume. Analysts project secular upside as sovereign debt levels mount globally.
      </p>
    `
  },
  {
    id: "crude-oil-logistics",
    title: "Crude Oil Navigates Red Sea Logistics and OPEC+ Output Strategy Adjustments",
    source: "MarketWatch Energy Desk",
    date: new Date().toISOString(),
    category: "energy",
    author: "Commodity Strategist",
    reading_time_mins: 3,
    excerpt: "WTI and Brent crude futures price in regional supply tightening while commercial refinery crack spreads indicate resilient global transport demand.",
    tags: ["ENERGY", "OIL", "MACRO"],
    related_tickers: ["USO", "XOM", "CVX"],
    source_url: "https://www.marketwatch.com/investing/future/crude%20oil",
    key_takeaways: [
      "VLCC tanker shipping routes around the Cape of Good Hope add 12-14 days to standard transit times.",
      "3-2-1 refinery crack margins remain historically wide, supporting downstream margins.",
      "OPEC+ voluntary production quotas show high compliance rates among core Middle East producers."
    ],
    full_content_html: `
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Crude oil markets traded in a narrow consolidation band as global energy logistics and maritime shipping premiums counterbalanced mixed macroeconomic demand signals from European industrial sectors.
      </p>
      <h4 class="text-white font-bold text-base mt-4 mb-2">Maritime Transit Latency</h4>
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        The diversion of commercial maritime tanker traffic around the African continent has effectively removed substantial floating barrel capacity from immediate commercial availability, maintaining an elevated prompt floor under prompt-month futures contracts.
      </p>
    `
  },
  {
    id: "quant-arbitrage-2026",
    title: "Quantitative Arbitrage & Algorithmic Execution: The 2026 Model Infrastructure",
    source: "Yashkumar Navadiya Quant Blog",
    date: new Date().toISOString(),
    category: "quant",
    author: "Yashkumar Navadiya",
    reading_time_mins: 5,
    excerpt: "How automated statistical arbitrage, Kalman Filter cointegration, and 3-2-1 crack spread algorithms achieve asymmetric risk-adjusted alphas in modern electronic markets.",
    tags: ["QUANT", "PYTHON", "ALGORITHMS"],
    related_tickers: ["SPY", "QQQ"],
    source_url: "https://blog.yashkumarnavadiya.tech",
    key_takeaways: [
      "Dynamic state-space Kalman Filters continuously adjust hedge ratios to mitigate structural cointegration breakdown.",
      "Sub-millisecond execution routing reduces market impact and adverse selection on high-frequency mean reversion pairs.",
      "Commodity spread trading (3-2-1 crack spreads) provides non-correlated returns uncorrelated to equity beta."
    ],
    full_content_html: `
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Modern electronic financial markets have evolved into highly contested multi-agent arenas where traditional static statistical arbitrage strategies face rapid alpha decay. To maintain persistent Sharpe ratios, quantitative modeling suites must embrace adaptive state-space estimation.
      </p>
      <h4 class="text-white font-bold text-base mt-4 mb-2">Recursive Kalman Filtering vs. Ordinary Least Squares</h4>
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Standard rolling OLS regressions suffer from lookback window latency and extreme sensitivity to volatility shocks. By modeling the hedge ratio as a latent time-varying state vector updated recursively via prediction-correction loops, our automated suites eliminate arbitrary parameter windows and respond dynamically to regime shifts.
      </p>
      <h4 class="text-white font-bold text-base mt-4 mb-2">Commercial Toolkits & Autonomous Execution</h4>
      <p class="text-sm leading-relaxed text-slate-300 mb-4">
        Our suite of quantitative algorithmic models—including the 3-2-1 Crack Spread Arbitrage Engine and Options Greeks Volatility Calibrator—are packaged directly for independent quantitative research and live execution on institutional terminals.
      </p>
    `
  }
];

export async function onRequest(context) {
  try {
    if (typeof NEWS_KV !== 'undefined' && NEWS_KV) {
      const list = await NEWS_KV.list({ prefix: 'md:' });
      if (list && list.keys && list.keys.length > 0) {
        const posts = [];
        for (const key of list.keys) {
          const md = await NEWS_KV.get(key.name);
          if (md) {
            const fmMatch = md.match(/^---\n([\s\S]*?)\n---/);
            const fm = {};
            if (fmMatch) {
              fmMatch[1].split('\n').forEach(line => {
                const [k, ...v] = line.split(':');
                if (k && v.length) fm[k.trim()] = v.join(':').trim();
              });
            }
            posts.push({
              id: key.name.replace(/^md:/, ''),
              title: fm.title || 'Market Update',
              date: fm.date || new Date().toISOString(),
              source: fm.source || 'Global Wire',
              excerpt: fm.excerpt || '',
              full_content_html: `<div class="prose prose-invert">${md.replace(/^---\n[\s\S]*?\n---\n/, '')}</div>`,
              key_takeaways: ["Real-time curated market intelligence.", "Syndicated from institutional sources."],
              tags: ["NEWS", "GLOBAL"]
            });
          }
        }
        if (posts.length > 0) {
          posts.sort((a,b) => new Date(b.date) - new Date(a.date));
          return new Response(JSON.stringify(posts.slice(0, 10)), {
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' }
          });
        }
      }
    }
  } catch (err) {
    console.error("KV read error:", err);
  }

  return new Response(JSON.stringify(DEFAULT_ARTICLES), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
