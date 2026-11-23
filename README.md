# 🌐 ApexMarket — Real-Time Global Market Terminal

> **Live Deployment**: [`https://market.yashkumarnavadiya.tech`](https://market.yashkumarnavadiya.tech)  
> **Author**: Yashkumar Navadiya  

An institutional-grade, zero-latency global market terminal combining the ranking screener power of **CompaniesMarketCap** with the live technical charting and oscillator studio of **TradingView**.

---

## ⚡ Features

- **🏢 Top 100 Global Equities**: Live streaming quotes, 24h % returns, 52-week ranges, and valuation tiers ($1T+ Mega, $500B+) for Apple, NVIDIA, Microsoft, Alphabet, Amazon, **SpaceX (`SPCX`)**, Meta, Tesla, **Anthropic (`ANT`)**, and 90+ more.
- **🪙 Precious Metals**: Real-time quotes for Gold Spot (`GC=F`), Silver Spot (`SI=F`), Copper (`HG=F`), Platinum (`PL=F`), and Palladium (`PA=F`).
- **🛢️ Energy & Oil**: WTI Crude Oil (`CL=F`), Brent Crude (`BZ=F`), Natural Gas (`NG=F`), RBOB Gasoline (`RB=F`), and Heating Oil (`HO=F`).
- **₿ Cryptocurrencies**: Bitcoin (`BTC-USD`), Ethereum (`ETH-USD`), Solana (`SOL-USD`), BNB, XRP, Dogecoin, Cardano, and Avalanche.
- **💱 Foreign Exchange (FX)**: US Dollar Index (`DXY`), EUR/USD, USD/JPY, GBP/USD, USD/CAD, AUD/USD, and USD/INR.
- **🌍 Top 10 Sovereign Economies**: Real-time benchmark index tracking for US (S&P 500, Nasdaq), China, Japan, Germany, India, UK, France, Canada, and Australia.
- **📈 Pro Technical Chart Studio**: Dynamic SVG interactive charts, 52W high/low channel analysis, and real-time technical momentum gauges (Oversold / Retracement / Bullish).
- **▦ Performance Heatmap Treemap**: Sized and colored tiles dynamically mapping real market pullbacks and sector rallies.
- **⚡ Edge Caching Engine**: Powered by Cloudflare Pages Functions edge workers (`/api/live`) with global 30-second edge cache distribution.

---

## 🛠️ Architecture & Deployment

- **Edge Runtime**: Cloudflare Pages (`market.yashkumarnavadiya.tech`)
- **Serverless API**: Cloudflare Pages Functions (`functions/api/live.js`)
- **Real-Time Data Feeds**: Institutional chart feeds with edge micro-caching
- **Client Polling**: 30-second seamless background auto-refresh
- **Quant Ecosystem**: Cross-linked with quantitative trading suites on [`blog.yashkumarnavadiya.tech`](https://blog.yashkumarnavadiya.tech)

---

## 🚀 Local Development

```bash
# Preview locally with Cloudflare Wrangler
npx wrangler pages dev .
```
