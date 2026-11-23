// Cloudflare Pages Function: /api/live
// High-speed edge quote engine for market.yashkumarnavadiya.tech

const COMPANIES = [
  {
    "rank": 1,
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$3.6T"
  },
  {
    "rank": 2,
    "ticker": "NVDA",
    "name": "NVIDIA Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$3.1T"
  },
  {
    "rank": 3,
    "ticker": "MSFT",
    "name": "Microsoft Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$3.1T"
  },
  {
    "rank": 4,
    "ticker": "GOOGL",
    "name": "Alphabet Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$2.2T"
  },
  {
    "rank": 5,
    "ticker": "AMZN",
    "name": "Amazon.com Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer / Cloud",
    "cap_label": "$2.1T"
  },
  {
    "rank": 6,
    "ticker": "SPCX",
    "name": "Space Exploration Technologies (SpaceX)",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Aerospace & Telecom",
    "cap_label": "$1.74T"
  },
  {
    "rank": 7,
    "ticker": "META",
    "name": "Meta Platforms",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$1.4T"
  },
  {
    "rank": 8,
    "ticker": "TSLA",
    "name": "Tesla Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Automotive / AI",
    "cap_label": "$1.1T"
  },
  {
    "rank": 9,
    "ticker": "TSM",
    "name": "Taiwan Semi (TSMC)",
    "country": "Taiwan",
    "flag": "\ud83c\uddf9\ud83c\uddfc",
    "sector": "Semiconductors",
    "cap_label": "$1.0T"
  },
  {
    "rank": 10,
    "ticker": "BRK-B",
    "name": "Berkshire Hathaway",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$920B"
  },
  {
    "rank": 11,
    "ticker": "AVGO",
    "name": "Broadcom Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$810B"
  },
  {
    "rank": 12,
    "ticker": "ANT",
    "name": "Anthropic, PBC",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Artificial Intelligence",
    "cap_label": "$185B"
  },
  {
    "rank": 13,
    "ticker": "LLY",
    "name": "Eli Lilly & Co.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$780B"
  },
  {
    "rank": 14,
    "ticker": "WMT",
    "name": "Walmart Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$680B"
  },
  {
    "rank": 15,
    "ticker": "JPM",
    "name": "JPMorgan Chase",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$620B"
  },
  {
    "rank": 16,
    "ticker": "V",
    "name": "Visa Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$580B"
  },
  {
    "rank": 17,
    "ticker": "XOM",
    "name": "ExxonMobil Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Energy",
    "cap_label": "$520B"
  },
  {
    "rank": 18,
    "ticker": "ASML",
    "name": "ASML Holding",
    "country": "Netherlands",
    "flag": "\ud83c\uddf3\ud83c\uddf1",
    "sector": "Semiconductors",
    "cap_label": "$490B"
  },
  {
    "rank": 19,
    "ticker": "COST",
    "name": "Costco Wholesale",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$480B"
  },
  {
    "rank": 20,
    "ticker": "ORCL",
    "name": "Oracle Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$460B"
  },
  {
    "rank": 21,
    "ticker": "NVO",
    "name": "Novo Nordisk",
    "country": "Denmark",
    "flag": "\ud83c\udde9\ud83c\uddf0",
    "sector": "Healthcare",
    "cap_label": "$460B"
  },
  {
    "rank": 22,
    "ticker": "MA",
    "name": "Mastercard Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$450B"
  },
  {
    "rank": 23,
    "ticker": "HD",
    "name": "Home Depot",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$410B"
  },
  {
    "rank": 24,
    "ticker": "PG",
    "name": "Procter & Gamble",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$390B"
  },
  {
    "rank": 25,
    "ticker": "JNJ",
    "name": "Johnson & Johnson",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$380B"
  },
  {
    "rank": 26,
    "ticker": "BAC",
    "name": "Bank of America",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$360B"
  },
  {
    "rank": 27,
    "ticker": "ABBV",
    "name": "AbbVie Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$350B"
  },
  {
    "rank": 28,
    "ticker": "CRM",
    "name": "Salesforce Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$330B"
  },
  {
    "rank": 29,
    "ticker": "NFLX",
    "name": "Netflix Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Communications",
    "cap_label": "$330B"
  },
  {
    "rank": 30,
    "ticker": "KO",
    "name": "Coca-Cola Co.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$300B"
  },
  {
    "rank": 31,
    "ticker": "TM",
    "name": "Toyota Motor",
    "country": "Japan",
    "flag": "\ud83c\uddef\ud83c\uddf5",
    "sector": "Automotive",
    "cap_label": "$300B"
  },
  {
    "rank": 32,
    "ticker": "CVX",
    "name": "Chevron Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Energy",
    "cap_label": "$295B"
  },
  {
    "rank": 33,
    "ticker": "SAP",
    "name": "SAP SE",
    "country": "Germany",
    "flag": "\ud83c\udde9\ud83c\uddea",
    "sector": "Technology",
    "cap_label": "$290B"
  },
  {
    "rank": 34,
    "ticker": "BABA",
    "name": "Alibaba Group",
    "country": "China",
    "flag": "\ud83c\udde8\ud83c\uddf3",
    "sector": "Consumer / Tech",
    "cap_label": "$280B"
  },
  {
    "rank": 35,
    "ticker": "WFC",
    "name": "Wells Fargo",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$270B"
  },
  {
    "rank": 36,
    "ticker": "AMD",
    "name": "Advanced Micro Devices",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$260B"
  },
  {
    "rank": 37,
    "ticker": "PEP",
    "name": "PepsiCo Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$245B"
  },
  {
    "rank": 38,
    "ticker": "LIN",
    "name": "Linde plc",
    "country": "United Kingdom",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "sector": "Materials",
    "cap_label": "$240B"
  },
  {
    "rank": 39,
    "ticker": "AZN",
    "name": "AstraZeneca",
    "country": "United Kingdom",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "sector": "Healthcare",
    "cap_label": "$235B"
  },
  {
    "rank": 40,
    "ticker": "NVS",
    "name": "Novartis AG",
    "country": "Switzerland",
    "flag": "\ud83c\udde8\ud83c\udded",
    "sector": "Healthcare",
    "cap_label": "$230B"
  },
  {
    "rank": 41,
    "ticker": "SHEL",
    "name": "Shell plc",
    "country": "United Kingdom",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "sector": "Energy",
    "cap_label": "$225B"
  },
  {
    "rank": 42,
    "ticker": "QCOM",
    "name": "Qualcomm Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$220B"
  },
  {
    "rank": 43,
    "ticker": "TMO",
    "name": "Thermo Fisher Scientific",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$215B"
  },
  {
    "rank": 44,
    "ticker": "CSCO",
    "name": "Cisco Systems",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$215B"
  },
  {
    "rank": 45,
    "ticker": "MCD",
    "name": "McDonald's Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$210B"
  },
  {
    "rank": 46,
    "ticker": "ACN",
    "name": "Accenture plc",
    "country": "Ireland",
    "flag": "\ud83c\uddee\ud83c\uddea",
    "sector": "Technology",
    "cap_label": "$210B"
  },
  {
    "rank": 47,
    "ticker": "ABT",
    "name": "Abbott Laboratories",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$205B"
  },
  {
    "rank": 48,
    "ticker": "GE",
    "name": "GE Aerospace",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Industrials",
    "cap_label": "$205B"
  },
  {
    "rank": 49,
    "ticker": "PM",
    "name": "Philip Morris",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$200B"
  },
  {
    "rank": 50,
    "ticker": "MS",
    "name": "Morgan Stanley",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$195B"
  },
  {
    "rank": 51,
    "ticker": "IBM",
    "name": "IBM Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$195B"
  },
  {
    "rank": 52,
    "ticker": "INTU",
    "name": "Intuit Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$190B"
  },
  {
    "rank": 53,
    "ticker": "TXN",
    "name": "Texas Instruments",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$190B"
  },
  {
    "rank": 54,
    "ticker": "CAT",
    "name": "Caterpillar Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Industrials",
    "cap_label": "$185B"
  },
  {
    "rank": 55,
    "ticker": "NOW",
    "name": "ServiceNow Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$185B"
  },
  {
    "rank": 56,
    "ticker": "VZ",
    "name": "Verizon Communications",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Communications",
    "cap_label": "$180B"
  },
  {
    "rank": 57,
    "ticker": "DIS",
    "name": "Walt Disney Co.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Communications",
    "cap_label": "$180B"
  },
  {
    "rank": 58,
    "ticker": "AMAT",
    "name": "Applied Materials",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$175B"
  },
  {
    "rank": 59,
    "ticker": "GS",
    "name": "Goldman Sachs",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$175B"
  },
  {
    "rank": 60,
    "ticker": "AXP",
    "name": "American Express",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$170B"
  },
  {
    "rank": 61,
    "ticker": "TTE",
    "name": "TotalEnergies SE",
    "country": "France",
    "flag": "\ud83c\uddeb\ud83c\uddf7",
    "sector": "Energy",
    "cap_label": "$165B"
  },
  {
    "rank": 62,
    "ticker": "RTX",
    "name": "RTX Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Aerospace & Defense",
    "cap_label": "$165B"
  },
  {
    "rank": 63,
    "ticker": "ISRG",
    "name": "Intuitive Surgical",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$160B"
  },
  {
    "rank": 64,
    "ticker": "PFE",
    "name": "Pfizer Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$160B"
  },
  {
    "rank": 65,
    "ticker": "HON",
    "name": "Honeywell International",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Industrials",
    "cap_label": "$155B"
  },
  {
    "rank": 66,
    "ticker": "BKNG",
    "name": "Booking Holdings",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$155B"
  },
  {
    "rank": 67,
    "ticker": "UNH",
    "name": "UnitedHealth Group",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$155B"
  },
  {
    "rank": 68,
    "ticker": "LRCX",
    "name": "Lam Research",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$150B"
  },
  {
    "rank": 69,
    "ticker": "T",
    "name": "AT&T Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Communications",
    "cap_label": "$150B"
  },
  {
    "rank": 70,
    "ticker": "SPGI",
    "name": "S&P Global Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$150B"
  },
  {
    "rank": 71,
    "ticker": "SYK",
    "name": "Stryker Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Healthcare",
    "cap_label": "$145B"
  },
  {
    "rank": 72,
    "ticker": "BLK",
    "name": "BlackRock Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$145B"
  },
  {
    "rank": 73,
    "ticker": "LOW",
    "name": "Lowe's Companies",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$140B"
  },
  {
    "rank": 74,
    "ticker": "TJX",
    "name": "TJX Companies",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$140B"
  },
  {
    "rank": 75,
    "ticker": "COP",
    "name": "ConocoPhillips",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Energy",
    "cap_label": "$135B"
  },
  {
    "rank": 76,
    "ticker": "DE",
    "name": "Deere & Co.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Industrials",
    "cap_label": "$135B"
  },
  {
    "rank": 77,
    "ticker": "BA",
    "name": "Boeing Co.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Aerospace & Defense",
    "cap_label": "$130B"
  },
  {
    "rank": 78,
    "ticker": "LMT",
    "name": "Lockheed Martin",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Aerospace & Defense",
    "cap_label": "$130B"
  },
  {
    "rank": 79,
    "ticker": "SCHW",
    "name": "Charles Schwab",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$125B"
  },
  {
    "rank": 80,
    "ticker": "PGR",
    "name": "Progressive Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$125B"
  },
  {
    "rank": 81,
    "ticker": "C",
    "name": "Citigroup Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Financials",
    "cap_label": "$125B"
  },
  {
    "rank": 82,
    "ticker": "PLTR",
    "name": "Palantir Technologies",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology / AI",
    "cap_label": "$120B"
  },
  {
    "rank": 83,
    "ticker": "MDT",
    "name": "Medtronic plc",
    "country": "Ireland",
    "flag": "\ud83c\uddee\ud83c\uddea",
    "sector": "Healthcare",
    "cap_label": "$120B"
  },
  {
    "rank": 84,
    "ticker": "ADI",
    "name": "Analog Devices",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$115B"
  },
  {
    "rank": 85,
    "ticker": "PANW",
    "name": "Palo Alto Networks",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Cybersecurity",
    "cap_label": "$115B"
  },
  {
    "rank": 86,
    "ticker": "KLAC",
    "name": "KLA Corp.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$110B"
  },
  {
    "rank": 87,
    "ticker": "SNPS",
    "name": "Synopsys Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$110B"
  },
  {
    "rank": 88,
    "ticker": "CDNS",
    "name": "Cadence Design Systems",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$105B"
  },
  {
    "rank": 89,
    "ticker": "CRWD",
    "name": "CrowdStrike Holdings",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Cybersecurity",
    "cap_label": "$105B"
  },
  {
    "rank": 90,
    "ticker": "MU",
    "name": "Micron Technology",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Semiconductors",
    "cap_label": "$105B"
  },
  {
    "rank": 91,
    "ticker": "SNOW",
    "name": "Snowflake Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Technology",
    "cap_label": "$100B"
  },
  {
    "rank": 92,
    "ticker": "UBER",
    "name": "Uber Technologies",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer / Tech",
    "cap_label": "$100B"
  },
  {
    "rank": 93,
    "ticker": "ABNB",
    "name": "Airbnb Inc.",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Consumer",
    "cap_label": "$95B"
  },
  {
    "rank": 94,
    "ticker": "MELI",
    "name": "MercadoLibre",
    "country": "Uruguay",
    "flag": "\ud83c\uddfa\ud83c\uddfe",
    "sector": "E-Commerce",
    "cap_label": "$95B"
  },
  {
    "rank": 95,
    "ticker": "SHOP",
    "name": "Shopify Inc.",
    "country": "Canada",
    "flag": "\ud83c\udde8\ud83c\udde6",
    "sector": "Technology",
    "cap_label": "$95B"
  },
  {
    "rank": 96,
    "ticker": "ARM",
    "name": "Arm Holdings",
    "country": "United Kingdom",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "sector": "Semiconductors",
    "cap_label": "$95B"
  },
  {
    "rank": 97,
    "ticker": "DELL",
    "name": "Dell Technologies",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Hardware / AI",
    "cap_label": "$90B"
  },
  {
    "rank": 98,
    "ticker": "COIN",
    "name": "Coinbase Global",
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "sector": "Crypto / Fintech",
    "cap_label": "$90B"
  },
  {
    "rank": 99,
    "ticker": "PDD",
    "name": "PDD Holdings (Temu)",
    "country": "China",
    "flag": "\ud83c\udde8\ud83c\uddf3",
    "sector": "Consumer",
    "cap_label": "$90B"
  },
  {
    "rank": 100,
    "ticker": "SPOT",
    "name": "Spotify Technology",
    "country": "Sweden",
    "flag": "\ud83c\uddf8\ud83c\uddea",
    "sector": "Communications",
    "cap_label": "$90B"
  }
];
const TOP10_INDICES = [
  {
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "name": "S&P 500",
    "symbol": "^GSPC",
    "regime": "Tech / Macro Correction"
  },
  {
    "country": "United States",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "name": "Nasdaq 100",
    "symbol": "^NDX",
    "regime": "Tech High-Beta"
  },
  {
    "country": "China",
    "flag": "\ud83c\udde8\ud83c\uddf3",
    "name": "Shanghai Composite",
    "symbol": "000001.SS",
    "regime": "Fiscal Policy Support"
  },
  {
    "country": "Japan",
    "flag": "\ud83c\uddef\ud83c\uddf5",
    "name": "Nikkei 225",
    "symbol": "^N225",
    "regime": "BOJ Rate Hike Sensitivity"
  },
  {
    "country": "Germany",
    "flag": "\ud83c\udde9\ud83c\uddea",
    "name": "DAX 40",
    "symbol": "^GDAXI",
    "regime": "Industrial Headwinds"
  },
  {
    "country": "India",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "name": "Nifty 50",
    "symbol": "^NSEI",
    "regime": "Strong Domestic Flows"
  },
  {
    "country": "United Kingdom",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "name": "FTSE 100",
    "symbol": "^FTSE",
    "regime": "Defensive High-Yield"
  },
  {
    "country": "France",
    "flag": "\ud83c\uddeb\ud83c\uddf7",
    "name": "CAC 40",
    "symbol": "^FCHI",
    "regime": "Luxury Valuation Reset"
  },
  {
    "country": "Canada",
    "flag": "\ud83c\udde8\ud83c\udde6",
    "name": "TSX Composite",
    "symbol": "^GSPTSE",
    "regime": "Commodities Tailwinds"
  },
  {
    "country": "Australia",
    "flag": "\ud83c\udde6\ud83c\uddfa",
    "name": "ASX 200",
    "symbol": "^AXJO",
    "regime": "Mining & Financials"
  }
];
const CRYPTO = [
  {
    "symbol": "BTC-USD",
    "name": "Bitcoin",
    "code": "BTC",
    "icon": "\u20bf",
    "category": "crypto"
  },
  {
    "symbol": "ETH-USD",
    "name": "Ethereum",
    "code": "ETH",
    "icon": "\u039e",
    "category": "crypto"
  },
  {
    "symbol": "SOL-USD",
    "name": "Solana",
    "code": "SOL",
    "icon": "\u25ce",
    "category": "crypto"
  },
  {
    "symbol": "BNB-USD",
    "name": "BNB",
    "code": "BNB",
    "icon": "\ud83d\udfe1",
    "category": "crypto"
  },
  {
    "symbol": "XRP-USD",
    "name": "XRP",
    "code": "XRP",
    "icon": "\u2715",
    "category": "crypto"
  },
  {
    "symbol": "DOGE-USD",
    "name": "Dogecoin",
    "code": "DOGE",
    "icon": "\ud83d\udc15",
    "category": "crypto"
  },
  {
    "symbol": "ADA-USD",
    "name": "Cardano",
    "code": "ADA",
    "icon": "\u20b3",
    "category": "crypto"
  },
  {
    "symbol": "AVAX-USD",
    "name": "Avalanche",
    "code": "AVAX",
    "icon": "\ud83d\udd3a",
    "category": "crypto"
  }
];
const METALS = [
  {
    "symbol": "GC=F",
    "name": "Gold Spot",
    "code": "GOLD",
    "unit": "$/oz",
    "icon": "\ud83e\udd47",
    "category": "metals"
  },
  {
    "symbol": "SI=F",
    "name": "Silver Spot",
    "code": "SILVER",
    "unit": "$/oz",
    "icon": "\ud83e\udd48",
    "category": "metals"
  },
  {
    "symbol": "HG=F",
    "name": "Copper (COMEX)",
    "code": "COPPER",
    "unit": "$/lb",
    "icon": "\ud83e\udd49",
    "category": "metals"
  },
  {
    "symbol": "PL=F",
    "name": "Platinum",
    "code": "PLATINUM",
    "unit": "$/oz",
    "icon": "\u26aa",
    "category": "metals"
  },
  {
    "symbol": "PA=F",
    "name": "Palladium",
    "code": "PALLADIUM",
    "unit": "$/oz",
    "icon": "\ud83e\ude99",
    "category": "metals"
  }
];
const ENERGY = [
  {
    "symbol": "CL=F",
    "name": "Crude Oil (WTI)",
    "code": "WTI",
    "unit": "$/bbl",
    "icon": "\ud83d\udee2\ufe0f",
    "category": "energy"
  },
  {
    "symbol": "BZ=F",
    "name": "Brent Crude Oil",
    "code": "BRENT",
    "unit": "$/bbl",
    "icon": "\u26fd",
    "category": "energy"
  },
  {
    "symbol": "NG=F",
    "name": "Natural Gas",
    "code": "NATGAS",
    "unit": "$/MMBtu",
    "icon": "\ud83d\udd25",
    "category": "energy"
  },
  {
    "symbol": "RB=F",
    "name": "RBOB Gasoline",
    "code": "GASOLINE",
    "unit": "$/gal",
    "icon": "\ud83d\ude97",
    "category": "energy"
  },
  {
    "symbol": "HO=F",
    "name": "Heating Oil",
    "code": "HEATOIL",
    "unit": "$/gal",
    "icon": "\ud83c\udfe0",
    "category": "energy"
  }
];
const CURRENCIES = [
  {
    "symbol": "DX-Y.NYB",
    "name": "US Dollar Index",
    "code": "DXY",
    "pair": "USD Basket",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "category": "currencies"
  },
  {
    "symbol": "EURUSD=X",
    "name": "Euro / US Dollar",
    "code": "EUR/USD",
    "pair": "EUR/USD",
    "flag": "\ud83c\uddea\ud83c\uddfa",
    "category": "currencies"
  },
  {
    "symbol": "JPY=X",
    "name": "USD / Japanese Yen",
    "code": "USD/JPY",
    "pair": "USD/JPY",
    "flag": "\ud83c\uddef\ud83c\uddf5",
    "category": "currencies"
  },
  {
    "symbol": "GBPUSD=X",
    "name": "British Pound / USD",
    "code": "GBP/USD",
    "pair": "GBP/USD",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "category": "currencies"
  },
  {
    "symbol": "CAD=X",
    "name": "USD / Canadian Dollar",
    "code": "USD/CAD",
    "pair": "USD/CAD",
    "flag": "\ud83c\udde8\ud83c\udde6",
    "category": "currencies"
  },
  {
    "symbol": "AUDUSD=X",
    "name": "AUD / US Dollar",
    "code": "AUD/USD",
    "pair": "AUD/USD",
    "flag": "\ud83c\udde6\ud83c\uddfa",
    "category": "currencies"
  },
  {
    "symbol": "INR=X",
    "name": "USD / Indian Rupee",
    "code": "USD/INR",
    "pair": "USD/INR",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "category": "currencies"
  },
  {
    "symbol": "CHF=X",
    "name": "USD / Swiss Franc",
    "code": "USD/CHF",
    "pair": "USD/CHF",
    "flag": "\ud83c\udde8\ud83c\udded",
    "category": "currencies"
  }
];
const MACRO = [
  {
    "symbol": "CL=F",
    "name": "Brent / Crude Oil"
  },
  {
    "symbol": "GC=F",
    "name": "Gold Spot"
  },
  {
    "symbol": "DX-Y.NYB",
    "name": "US Dollar Index (DXY)"
  },
  {
    "symbol": "^TNX",
    "name": "US 10Y Yield"
  },
  {
    "symbol": "BTC-USD",
    "name": "Bitcoin (USD)"
  }
];

async function fetchQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      cf: { cacheTtl: 30, cacheEverything: true }
    });
    if (!res.ok) return { symbol, error: res.statusText };
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    if (!result) return { symbol, error: "No chart data" };

    const meta = result.meta || {};
    const price = meta.regularMarketPrice;
    const prevClose = meta.chartPreviousClose || meta.previousClose;
    let changePct = meta.regularMarketChangePercent;
    let changeAmt = 0.0;

    if (price && prevClose && prevClose > 0) {
      changeAmt = Math.round((price - prevClose) * 100) / 100;
      if (changePct === undefined || changePct === null) {
        changePct = Math.round(((changeAmt / prevClose) * 100) * 100) / 100;
      } else {
        changePct = Math.round(changePct * 100) / 100;
      }
    } else {
      changePct = Math.round((changePct || 0.0) * 100) / 100;
    }

    return {
      symbol,
      price,
      previous_close: prevClose,
      change: changeAmt,
      change_pct: changePct,
      positive: changePct >= 0,
      currency: meta.currency || "USD",
      high_52w: meta.fiftyTwoWeekHigh,
      low_52w: meta.fiftyTwoWeekLow
    };
  } catch (err) {
    return { symbol, error: err.message, price: null, change_pct: 0.0 };
  }
}

export async function onRequestGet(context) {
  // 1. Gather all unique symbols
  const symSet = new Set();
  COMPANIES.forEach(c => symSet.add(c.ticker));
  TOP10_INDICES.forEach(i => symSet.add(i.symbol));
  CRYPTO.forEach(cr => symSet.add(cr.symbol));
  METALS.forEach(m => symSet.add(m.symbol));
  ENERGY.forEach(e => symSet.add(e.symbol));
  CURRENCIES.forEach(fx => symSet.add(fx.symbol));
  MACRO.forEach(m => symSet.add(m.symbol));

  const allSymbols = Array.from(symSet);

  // 2. Fetch in concurrent chunks
  const chunkSize = 25;
  const quotesMap = {};
  for (let i = 0; i < allSymbols.length; i += chunkSize) {
    const chunk = allSymbols.slice(i, i + chunkSize);
    const results = await Promise.all(chunk.map(fetchQuote));
    results.forEach(r => { if (r && r.symbol) quotesMap[r.symbol] = r; });
  }

  // 3. Enrich items
  function enrich(items, symKey = "symbol") {
    return items.map(item => {
      const q = quotesMap[item[symKey]] || {};
      return {
        ...item,
        price: q.price,
        previous_close: q.previous_close,
        change: q.change,
        change_pct: q.change_pct || 0.0,
        positive: q.positive || false,
        high_52w: q.high_52w,
        low_52w: q.low_52w
      };
    });
  }

  const payload = {
    source: "ApexMarket Cloudflare Edge & Yahoo Finance Real-Time API",
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    companies: enrich(COMPANIES, "ticker"),
    top10_countries: TOP10_INDICES.map(idx => {
      const q = quotesMap[idx.symbol] || {};
      return {
        ...idx,
        level: q.price,
        change: q.change,
        change_pct: q.change_pct || 0.0,
        positive: q.positive || false
      };
    }),
    crypto: enrich(CRYPTO),
    metals: enrich(METALS),
    energy: enrich(ENERGY),
    currencies: enrich(CURRENCIES),
    macro: enrich(MACRO)
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=15, s-maxage=30, stale-while-revalidate=60",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
