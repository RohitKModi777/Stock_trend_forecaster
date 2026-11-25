import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DesktopHeader from '../components/navigation/DesktopHeader';

// StockTrend AI Real-Time Global Indices Telemetry
const INDICES_FEED = [
  { name: 'NIFTY 50', value: '24,852.15', change: '+142.30 (+0.58%)', isPositive: true },
  { name: 'SENSEX', value: '81,420.30', change: '+468.20 (+0.58%)', isPositive: true },
  { name: 'BANK NIFTY', value: '51,280.90', change: '+412.50 (+0.81%)', isPositive: true },
  { name: 'FINNIFTY', value: '23,410.20', change: '+150.10 (+0.64%)', isPositive: true },
  { name: 'MIDCPNIFTY', value: '13,140.50', change: '+146.00 (+1.12%)', isPositive: true },
  { name: 'NASDAQ 100', value: '18,124.50', change: '+188.40 (+1.05%)', isPositive: true },
  { name: 'S&P 500', value: '5,702.40', change: '+27.80 (+0.49%)', isPositive: true },
  { name: 'INDIA VIX', value: '12.84', change: '-0.42 (-3.17%)', isPositive: false, isVol: true }
];

// Rich Multi-Asset Stock Database (Indian Equities & US Tech Leaders)
const STOCKS_DATA = {
  RELIANCE: {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    category: 'most_bought',
    currency: '₹',
    price: 2942.50,
    change: '+2.35%',
    changeVal: '+₹67.50',
    isPositive: true,
    predictedNext: 2995.00,
    confidence: '92.4%',
    dayLow: 2890.00,
    dayHigh: 2955.00,
    fiftyTwoWeekLow: 2220.00,
    fiftyTwoWeekHigh: 3217.90,
    volume: '8.4M',
    marketCap: '₹19.9T',
    peRatio: '28.1',
    bidsPercent: 64,
    asksPercent: 36,
    sparkline: [2870, 2895, 2910, 2925, 2938, 2942.50],
    timeframePoints: {
      '1D': [2900, 2915, 2928, 2935, 2940, 2942.50],
      '1W': [2860, 2885, 2905, 2920, 2935, 2942.50],
      '1M': [2780, 2820, 2865, 2900, 2925, 2942.50],
      '1Y': [2350, 2550, 2720, 2850, 2910, 2942.50]
    }
  },
  TCS: {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    category: 'most_bought',
    currency: '₹',
    price: 4210.80,
    change: '+1.65%',
    changeVal: '+₹68.40',
    isPositive: true,
    predictedNext: 4268.00,
    confidence: '94.8%',
    dayLow: 4160.00,
    dayHigh: 4225.00,
    fiftyTwoWeekLow: 3313.00,
    fiftyTwoWeekHigh: 4585.00,
    volume: '3.1M',
    marketCap: '₹15.2T',
    peRatio: '31.4',
    bidsPercent: 58,
    asksPercent: 42,
    sparkline: [4150, 4170, 4185, 4195, 4205, 4210.80],
    timeframePoints: {
      '1D': [4165, 4178, 4190, 4202, 4208, 4210.80],
      '1W': [4120, 4145, 4168, 4185, 4200, 4210.80],
      '1M': [3980, 4040, 4095, 4140, 4180, 4210.80],
      '1Y': [3450, 3680, 3850, 4050, 4150, 4210.80]
    }
  },
  HDFCBANK: {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    category: 'gainers',
    currency: '₹',
    price: 1682.40,
    change: '+2.85%',
    changeVal: '+₹46.60',
    isPositive: true,
    predictedNext: 1720.00,
    confidence: '93.1%',
    dayLow: 1640.00,
    dayHigh: 1689.00,
    fiftyTwoWeekLow: 1363.55,
    fiftyTwoWeekHigh: 1794.00,
    volume: '16.5M',
    marketCap: '₹12.8T',
    peRatio: '19.2',
    bidsPercent: 66,
    asksPercent: 34,
    sparkline: [1645, 1658, 1665, 1672, 1678, 1682.40],
    timeframePoints: {
      '1D': [1648, 1656, 1668, 1675, 1680, 1682.40],
      '1W': [1620, 1638, 1650, 1665, 1675, 1682.40],
      '1M': [1550, 1580, 1610, 1645, 1665, 1682.40],
      '1Y': [1480, 1520, 1420, 1580, 1640, 1682.40]
    }
  },
  TATAMOTORS: {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Passenger Vehicles',
    category: 'gainers',
    currency: '₹',
    price: 984.60,
    change: '+3.45%',
    changeVal: '+₹32.80',
    isPositive: true,
    predictedNext: 1015.00,
    confidence: '91.2%',
    dayLow: 955.00,
    dayHigh: 991.00,
    fiftyTwoWeekLow: 621.75,
    fiftyTwoWeekHigh: 1179.05,
    volume: '11.8M',
    marketCap: '₹3.62T',
    peRatio: '10.8',
    bidsPercent: 71,
    asksPercent: 29,
    sparkline: [958, 965, 972, 976, 981, 984.60],
    timeframePoints: {
      '1D': [960, 968, 974, 978, 982, 984.60],
      '1W': [935, 948, 960, 972, 980, 984.60],
      '1M': [890, 915, 940, 965, 975, 984.60],
      '1Y': [650, 780, 890, 990, 950, 984.60]
    }
  },
  INFY: {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    category: 'most_bought',
    currency: '₹',
    price: 1912.30,
    change: '+1.15%',
    changeVal: '+₹21.70',
    isPositive: true,
    predictedNext: 1945.00,
    confidence: '95.0%',
    dayLow: 1890.00,
    dayHigh: 1920.00,
    fiftyTwoWeekLow: 1358.35,
    fiftyTwoWeekHigh: 1991.45,
    volume: '7.9M',
    marketCap: '₹7.94T',
    peRatio: '29.6',
    bidsPercent: 54,
    asksPercent: 46,
    sparkline: [1892, 1900, 1905, 1908, 1910, 1912.30],
    timeframePoints: {
      '1D': [1895, 1902, 1906, 1910, 1911, 1912.30],
      '1W': [1870, 1885, 1895, 1905, 1908, 1912.30],
      '1M': [1820, 1850, 1875, 1890, 1905, 1912.30],
      '1Y': [1420, 1550, 1680, 1820, 1890, 1912.30]
    }
  },
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'gainers',
    currency: '$',
    price: 128.45,
    change: '+4.15%',
    changeVal: '+$5.12',
    isPositive: true,
    predictedNext: 133.80,
    confidence: '96.8%',
    dayLow: 123.50,
    dayHigh: 129.20,
    fiftyTwoWeekLow: 39.23,
    fiftyTwoWeekHigh: 140.76,
    volume: '82.6M',
    marketCap: '$3.16T',
    peRatio: '58.4',
    bidsPercent: 68,
    asksPercent: 32,
    sparkline: [119, 121, 123, 125, 126, 128.45],
    timeframePoints: {
      '1D': [124.0, 125.2, 126.8, 126.2, 127.9, 128.45],
      '1W': [118.5, 121.2, 123.0, 125.5, 126.8, 128.45],
      '1M': [105.0, 112.4, 118.2, 122.0, 125.1, 128.45],
      '1Y': [45.0, 68.0, 88.5, 110.0, 120.5, 128.45]
    }
  },
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'most_bought',
    currency: '$',
    price: 227.16,
    change: '+1.42%',
    changeVal: '+$3.18',
    isPositive: true,
    predictedNext: 231.40,
    confidence: '92.4%',
    dayLow: 224.20,
    dayHigh: 228.05,
    fiftyTwoWeekLow: 164.08,
    fiftyTwoWeekHigh: 237.23,
    volume: '48.2M',
    marketCap: '$3.45T',
    peRatio: '33.8',
    bidsPercent: 62,
    asksPercent: 38,
    sparkline: [222, 223, 221, 224, 225, 227.16],
    timeframePoints: {
      '1D': [225.1, 225.8, 226.3, 225.9, 226.8, 227.16],
      '1W': [221.0, 222.5, 224.0, 225.3, 226.2, 227.16],
      '1M': [215.4, 218.0, 220.5, 222.1, 224.8, 227.16],
      '1Y': [178.2, 185.0, 192.4, 208.6, 219.0, 227.16]
    }
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    category: 'losers',
    currency: '$',
    price: 245.18,
    change: '-1.42%',
    changeVal: '-$3.52',
    isPositive: false,
    predictedNext: 248.60,
    confidence: '90.8%',
    dayLow: 241.10,
    dayHigh: 249.80,
    fiftyTwoWeekLow: 138.80,
    fiftyTwoWeekHigh: 271.00,
    volume: '64.1M',
    marketCap: '$782B',
    peRatio: '66.2',
    bidsPercent: 44,
    asksPercent: 56,
    sparkline: [248, 246, 249, 247, 246, 245.18],
    timeframePoints: {
      '1D': [248.5, 247.2, 246.0, 246.8, 244.5, 245.18],
      '1W': [238.0, 241.5, 245.0, 249.0, 247.0, 245.18],
      '1M': [210.0, 222.0, 235.0, 240.0, 248.0, 245.18],
      '1Y': [215.0, 175.0, 145.0, 185.0, 230.0, 245.18]
    }
  }
};

// Groww-style FAQ Accordion Data
const FAQS = [
  {
    q: 'How does StockTrend AI compute Next-Day stock price predictions?',
    a: 'StockTrend AI trains walk-forward LSTM neural networks on consolidated order flow tapes, institutional block order imbalances, options smile skews, and sector relative drift strictly prior to cash market close. The models produce expected target prices and 1σ/2σ confidence corridors with zero look-ahead bias.'
  },
  {
    q: 'What are the charges for trading and investing on StockTrend AI?',
    a: 'StockTrend AI offers ₹0 / $0 brokerage on direct Mutual Fund investments and Equity Delivery. Intraday and F&O are charged at a flat, low-cost rate of ₹20 or 0.05% per executed order. All exchange turnover charges and statutory taxes are transparently displayed before order dispatch.'
  },
  {
    q: 'How accurate are the 1σ (68%) and 2σ (95%) expected range corridors?',
    a: 'Across more than 2,400 audited historical trading sessions, the 2-Sigma (95%) corridor has maintained an empirical hit rate of 94.6% across large-cap equities. All past forecasts are recorded in point-in-time immutable audit logs that can be reviewed in the Predictions page.'
  },
  {
    q: 'Can I access the live AI terminal and real-time feeds on mobile devices?',
    a: 'Yes! The platform is 100% responsive and provides dedicated mobile views at /m/overview and /m/forecast, allowing instant portfolio tracking, real-time tick monitoring, and corridor notifications directly on iOS and Android browsers.'
  },
  {
    q: 'How secure is my portfolio data and account authentication on StockTrend AI?',
    a: 'All sessions are secured with bank-grade 256-bit TLS encryption, strict biometric/OTP two-factor authentication, and audited session token stores. Your capital remains held safely with SEBI/SEC registered clearing partners.'
  }
];

// Animated Phone — matches Groww reference exactly
// White card, purple icon, large bold price, animated trendline, timeframe tabs
function AnimatedStockPhone({
  stockName = 'Renewable Energy Solutions',
  ticker = 'RESE',
  price = '791.62',
  change = '+16.04 (2.34%)',
  isPositive = true,
  defaultTimeframe = '1D'
}) {
  const [activeTf, setActiveTf] = useState(defaultTimeframe);
  const [pulse, setPulse] = useState(false);
  const [drawProgress, setDrawProgress] = useState(0);

  // Pulsing dot on chart tip
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(t);
  }, []);

  // Animate the chart line drawing in on mount (stroke-dashoffset trick via state)
  useEffect(() => {
    setDrawProgress(0);
    const raf = requestAnimationFrame(() => {
      setTimeout(() => setDrawProgress(1), 60);
    });
    return () => cancelAnimationFrame(raf);
  }, [activeTf]);

  // Chart points matching the Groww reference zigzag shape
  const POINTS = '12,108 28,112 44,88 58,100 72,72 86,90 100,48 116,62 130,22 144,34 158,14';
  // Pre-compute the approximate polyline length for stroke-dashoffset animation
  const APPROX_LEN = 340;

  const displayChange = isPositive !== false ? (change || '+16.04 (2.34%)') : (change || '-1.42%');
  const changeColor = isPositive !== false ? '#00A87E' : '#E53935';

  return (
    <div
      className="relative mx-auto select-none w-full max-w-[300px]"
    >
      {/* Phone outer shell — matches white rounded rectangle from reference */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '40px',
          padding: '12px',
          boxShadow: '0 8px 48px rgba(0,0,0,0.13), 0 2px 12px rgba(0,0,0,0.08)',
          border: '6px solid rgba(0,0,0,0.06)',
        }}
      >
        {/* Top speaker pill */}
        <div style={{ width: '72px', height: '5px', background: '#D1D5DB', borderRadius: '99px', margin: '0 auto 10px' }} />

        {/* Screen content */}
        <div style={{ background: '#FFFFFF', borderRadius: '30px', padding: '18px 16px 14px', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>

          {/* Header: Icon + Name + Action icons */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Purple gradient app icon matching reference */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #6C63FF 0%, #9C4FFF 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {/* Groww-style zigzag icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <polyline points="2,14 6,10 10,13 14,6 18,8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#9CA3AF', fontWeight: '700', letterSpacing: '0.05em', lineHeight: 1.2 }}>
                  {ticker || 'RESE'}
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827', lineHeight: 1.3, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {stockName || 'Renewable Energy Solutions'}
                </div>
              </div>
            </div>
            {/* Alarm + bookmark icons */}
            <div style={{ display: 'flex', gap: '8px', color: '#9CA3AF', marginTop: '2px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="13" r="7"/><path d="M12 10v3l2 2"/><path d="M5 3 2 6M19 3l3 3"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>

          {/* Price — large bold like reference: ₹791.62 */}
          <div style={{ marginBottom: '4px' }}>
            <div style={{ fontSize: '28px', fontWeight: '900', fontFamily: 'monospace', color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>
              ₹{price || '791.62'}
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', fontFamily: 'monospace', color: changeColor, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>{displayChange}</span>
              <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'sans-serif', fontWeight: '500' }}>1D</span>
            </div>
          </div>

          {/* Animated SVG Chart — matches the Groww zigzag trendline with area fill */}
          <div style={{ flex: 1, position: 'relative', marginTop: '8px', overflow: 'hidden' }}>
            <svg
              width="100%" height="170"
              viewBox="0 0 172 130"
              preserveAspectRatio="xMidYMid meet"
              style={{ display: 'block' }}
            >
              <defs>
                {/* Green gradient area fill */}
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D09C" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#00D09C" stopOpacity="0.00" />
                </linearGradient>
                {/* Clip mask for draw-in animation */}
                <clipPath id="chartReveal">
                  <rect
                    x="0" y="0" height="130"
                    style={{
                      width: `${drawProgress * 172}px`,
                      transition: 'width 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  />
                </clipPath>
              </defs>

              {/* Horizontal dashed reference line */}
              <line x1="8" y1="80" x2="165" y2="80" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3" />

              {/* Area fill under trendline */}
              <path
                d="M 12,108 L 28,112 L 44,88 L 58,100 L 72,72 L 86,90 L 100,48 L 116,62 L 130,22 L 144,34 L 158,14 L 158,120 L 12,120 Z"
                fill="url(#areaGrad)"
                clipPath="url(#chartReveal)"
              />

              {/* Green trendline — draws in on mount */}
              <polyline
                points={POINTS}
                fill="none"
                stroke="#00D09C"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={APPROX_LEN}
                style={{
                  strokeDashoffset: drawProgress === 0 ? APPROX_LEN : 0,
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />

              {/* Pulsing dot at chart tip */}
              <g clipPath="url(#chartReveal)">
                {/* Outer pulse ring */}
                <circle
                  cx="158" cy="14"
                  r={pulse ? '9' : '5'}
                  fill="#00D09C"
                  opacity="0.25"
                  style={{ transition: 'r 0.7s ease' }}
                />
                {/* Solid center dot */}
                <circle cx="158" cy="14" r="4.5" fill="#00D09C" stroke="white" strokeWidth="2" />
              </g>
            </svg>
          </div>

          {/* Timeframe tabs — pill style, 3M dark selected to match reference */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #F3F4F6' }}>
            {['1D', '1W', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'All'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTf(t)}
                style={{
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  fontWeight: activeTf === t ? '900' : '600',
                  padding: '3px 5px',
                  borderRadius: '6px',
                  background: activeTf === t ? '#111827' : 'transparent',
                  color: activeTf === t ? '#FFFFFF' : '#9CA3AF',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Live Cityscape Stock Ticker Feeds
const CITY_TICKER_ROW_1 = [
  { sym: 'RELIANCE', price: '2942.50', chg: '+2.35%', isUp: true },
  { sym: 'TCS', price: '4210.80', chg: '+1.65%', isUp: true },
  { sym: 'HDFCBANK', price: '1682.40', chg: '+2.85%', isUp: true },
  { sym: 'TATAMOTORS', price: '984.60', chg: '+3.10%', isUp: true },
  { sym: 'INFY', price: '1912.30', chg: '-0.80%', isUp: false },
  { sym: 'ICICIBANK', price: '1240.20', chg: '+1.92%', isUp: true },
  { sym: 'BHARTIARTL', price: '1690.00', chg: '+1.45%', isUp: true },
  { sym: 'ITC', price: '492.15', chg: '-0.32%', isUp: false },
];

const CITY_TICKER_ROW_2 = [
  { sym: 'NIFTY 50', price: '24852.15', chg: '+0.58%', isUp: true },
  { sym: 'SENSEX', price: '81420.30', chg: '+0.58%', isUp: true },
  { sym: 'NVDA', price: '$128.45', chg: '+3.42%', isUp: true },
  { sym: 'AAPL', price: '$227.16', chg: '+0.94%', isUp: true },
  { sym: 'TSLA', price: '$245.18', chg: '-1.40%', isUp: false },
  { sym: 'MSFT', price: '$442.80', chg: '+1.12%', isUp: true },
  { sym: 'BANK NIFTY', price: '51280.90', chg: '+0.81%', isUp: true },
  { sym: 'GOLD', price: '₹76450', chg: '+0.48%', isUp: true },
];

// Animated Cityscape Overlay:
// 1) Continuous isometric flowing stock ticker around the curved building corner
// 2) Blower hologram airflow beam + levitating/blowing StockTrend AI logo badge
function AnimatedCityScapeOverlay() {
  const renderTickerText = (items) => {
    const repeated = [...items, ...items, ...items];
    return repeated.map((item, i) => (
      <React.Fragment key={i}>
        <tspan fill="#DEE2E6">{item.sym} {item.price} </tspan>
        <tspan fill={item.isUp ? '#00D09C' : '#EB5757'}>
          {item.isUp ? '▲' : '▼'} {item.chg}{'  '}
        </tspan>
        <tspan fill="#64748B">·  </tspan>
      </React.Fragment>
    ));
  };

  return (
    <svg
      viewBox="0 0 1280 800"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradients for Blower Hologram */}
        <linearGradient id="blowerBeamGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#00D09C" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#00D09C" stopOpacity="0.30" />
          <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="logoGlobeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00D09C" />
          <stop offset="45%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        <radialGradient id="blowerAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D09C" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>

        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip paths for Ticker Board corner wrapping */}
        <clipPath id="tickerLeftClip">
          <polygon points="335.5,346.6 426.9,398.9 426.9,422.6 335.5,370.3" />
        </clipPath>
        <clipPath id="tickerRightClip">
          <polygon points="426.9,398.9 496.4,358.8 496.4,382.5 426.9,422.6" />
        </clipPath>
      </defs>

      {/* ========================================================= */}
      {/* 1. CURVED BUILDING STOCK TICKER BOARD (FLOWING CONTINUOUSLY) */}
      {/* ========================================================= */}
      {/* Left Face of Ticker Board */}
      <g clipPath="url(#tickerLeftClip)">
        <polygon points="335.5,346.6 426.9,398.9 426.9,422.6 335.5,370.3" fill="#142634" />
        <g transform="translate(335.5, 346.6) skewY(29.8)">
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              from="91.4 0"
              to="-622.6 0"
              dur="22s"
              repeatCount="indefinite"
            />
            {/* Row 1 */}
            <text y="9.5" fill="#E2E8F0" fontSize="5.2" fontFamily="monospace" fontWeight="bold" letterSpacing="0.3">
              {renderTickerText(CITY_TICKER_ROW_1)}
            </text>
            {/* Row 2 */}
            <text y="18" fill="#E2E8F0" fontSize="5.2" fontFamily="monospace" fontWeight="bold" letterSpacing="0.3">
              {renderTickerText(CITY_TICKER_ROW_2)}
            </text>
          </g>
        </g>
      </g>

      {/* Right Face of Ticker Board */}
      <g clipPath="url(#tickerRightClip)">
        <polygon points="426.9,398.9 496.4,358.8 496.4,382.5 426.9,422.6" fill="#0f1d28" />
        <g transform="translate(426.9, 398.9) skewY(-29.9)">
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-714 0"
              dur="22s"
              repeatCount="indefinite"
            />
            {/* Row 1 */}
            <text y="9.5" fill="#E2E8F0" fontSize="5.2" fontFamily="monospace" fontWeight="bold" letterSpacing="0.3">
              {renderTickerText(CITY_TICKER_ROW_1)}
            </text>
            {/* Row 2 */}
            <text y="18" fill="#E2E8F0" fontSize="5.2" fontFamily="monospace" fontWeight="bold" letterSpacing="0.3">
              {renderTickerText(CITY_TICKER_ROW_2)}
            </text>
          </g>
        </g>
      </g>

      {/* Corner Bevel Seam */}
      <line x1="426.9" y1="398.9" x2="426.9" y2="422.6" stroke="#2c5370" strokeWidth="0.8" opacity="0.8" />

      {/* ========================================================= */}
      {/* 2. BLOWER / LEVITATING LOGO AT HOLOGRAPHIC PEDESTAL       */}
      {/* ========================================================= */}
      {/* Upward Airflow Light Beam & Breeze Waves */}
      <g transform="translate(835.8, 515.6)">
        {/* Soft wide beam */}
        <polygon
          points="-14,0 -24,-90 24,-90 14,0"
          fill="url(#blowerBeamGrad)"
        />
        {/* Focused inner beam */}
        <polygon
          points="-8,0 -14,-80 14,-80 8,0"
          fill="url(#blowerBeamGrad)"
          opacity="0.85"
        />

        {/* Pulsing aperture base rim */}
        <ellipse cx="0" cy="0" rx="13" ry="5.5" fill="none" stroke="#00D09C" strokeWidth="1.2">
          <animate attributeName="opacity" values="0.4; 0.95; 0.4" dur="2s" repeatCount="indefinite" />
        </ellipse>

        {/* Rising Airflow / Breeze Waves (Blowing effect) */}
        <ellipse cx="0" cy="-5" rx="10" ry="3.5" fill="none" stroke="#00D09C" strokeWidth="0.8">
          <animate attributeName="cy" values="-5; -75" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="rx" values="9; 16" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="ry" values="3.5; 5.5" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8; 0" dur="2.4s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="0" cy="-5" rx="10" ry="3.5" fill="none" stroke="#38BDF8" strokeWidth="0.8">
          <animate attributeName="cy" values="-5; -75" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="rx" values="9; 16" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="ry" values="3.5; 5.5" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="opacity" values="0.8; 0" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
        </ellipse>
        <ellipse cx="0" cy="-5" rx="10" ry="3.5" fill="none" stroke="#00D09C" strokeWidth="0.8">
          <animate attributeName="cy" values="-5; -75" dur="2.4s" repeatCount="indefinite" begin="1.6s" />
          <animate attributeName="rx" values="9; 16" dur="2.4s" repeatCount="indefinite" begin="1.6s" />
          <animate attributeName="ry" values="3.5; 5.5" dur="2.4s" repeatCount="indefinite" begin="1.6s" />
          <animate attributeName="opacity" values="0.8; 0" dur="2.4s" repeatCount="indefinite" begin="1.6s" />
        </ellipse>

        {/* Upward Airflow Sparkle Particles */}
        <circle cx="-4" cy="-10" r="1" fill="#00D09C">
          <animate attributeName="cy" values="-5; -80" dur="2.1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9; 0" dur="2.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="5" cy="-15" r="1.2" fill="#38BDF8">
          <animate attributeName="cy" values="-5; -85" dur="2.6s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="opacity" values="0.9; 0" dur="2.6s" repeatCount="indefinite" begin="0.6s" />
        </circle>
        <circle cx="0" cy="-8" r="0.8" fill="#FFFFFF">
          <animate attributeName="cy" values="-5; -70" dur="1.8s" repeatCount="indefinite" begin="1.2s" />
          <animate attributeName="opacity" values="1; 0" dur="1.8s" repeatCount="indefinite" begin="1.2s" />
        </circle>
      </g>

      {/* Floating Animated StockTrend Logo (Levitating in Blower Stream) */}
      <g transform="translate(835.8, 452)">
        {/* Bobbing / Floating Animation */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -11; 0 0"
            keyTimes="0; 0.5; 1"
            dur="3.4s"
            repeatCount="indefinite"
          />
          {/* Subtle Wobble */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0; 3; -2; 0"
              keyTimes="0; 0.35; 0.7; 1"
              dur="3.4s"
              repeatCount="indefinite"
            />

            {/* Glowing Aura */}
            <circle cx="0" cy="0" r="26" fill="url(#blowerAura)">
              <animate attributeName="r" values="24; 28; 24" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45; 0.85; 0.45" dur="2.4s" repeatCount="indefinite" />
            </circle>

            {/* Rotating Orbit Ring */}
            <ellipse cx="0" cy="0" rx="24" ry="11" fill="none" stroke="#38BDF8" strokeWidth="0.9" strokeDasharray="3 2" opacity="0.75">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="12s"
                repeatCount="indefinite"
              />
            </ellipse>

            {/* Main 3D Spherical Token / Coin */}
            <circle
              cx="0" cy="0" r="18"
              fill="#0A1322"
              stroke="url(#logoGlobeGrad)"
              strokeWidth="2.2"
              filter="url(#neonGlow)"
            />
            {/* Inner subtle rim */}
            <circle cx="0" cy="0" r="15.2" fill="none" stroke="#00D09C" strokeWidth="0.6" opacity="0.6" />

            {/* StockTrend Logo Upward Trendline Icon */}
            <path
              d="M-9 5 L-4 -1 L0 3 L6 -5"
              stroke="#00D09C"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M2 -5 H6 V-1"
              stroke="#00D09C"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* AI Node Sparkle */}
            <circle cx="6" cy="-5" r="2.2" fill="#38BDF8" />
            <circle cx="6" cy="-5" r="4.2" fill="#38BDF8" opacity="0.35">
              <animate attributeName="r" values="3.5; 5; 3.5" dur="1.8s" repeatCount="indefinite" />
            </circle>

            {/* Top Gloss Highlight */}
            <ellipse cx="0" cy="-8.5" rx="8.5" ry="3.2" fill="#FFFFFF" opacity="0.25" />
          </g>
        </g>
      </g>
    </svg>
  );
}


export default function LandingPage() {
  const [selectedStockKey, setSelectedStockKey] = useState('RELIANCE');
  const [activeMarketTab, setActiveMarketTab] = useState('most_bought');
  const [timeframe, setTimeframe] = useState('1D');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  // SIP Calculator State
  const [calcMode, setCalcMode] = useState('sip');
  const [calcAmount, setCalcAmount] = useState(10000);
  const [calcRate, setCalcRate] = useState(14);
  const [calcYears, setCalcYears] = useState(5);

  // Live simulated micro-ticks
  const [livePrices, setLivePrices] = useState({
    RELIANCE: 2942.50,
    TCS: 4210.80,
    HDFCBANK: 1682.40,
    TATAMOTORS: 984.60,
    INFY: 1912.30,
    NVDA: 128.45,
    AAPL: 227.16,
    TSLA: 245.18
  });
  const [tickFlash, setTickFlash] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const keys = Object.keys(STOCKS_DATA);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const deltaPercent = (Math.random() - 0.49) * 0.003;

      setLivePrices((prev) => {
        const cur = prev[randomKey] || STOCKS_DATA[randomKey].price;
        const nextPrice = +(cur * (1 + deltaPercent)).toFixed(2);
        const dir = nextPrice >= cur ? 'up' : 'down';

        setTickFlash((f) => ({ ...f, [randomKey]: dir }));
        setTimeout(() => setTickFlash((f) => ({ ...f, [randomKey]: null })), 600);

        return { ...prev, [randomKey]: nextPrice };
      });
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const currentStock = STOCKS_DATA[selectedStockKey] || STOCKS_DATA.RELIANCE;
  const currentPrice = livePrices[selectedStockKey] || currentStock.price;

  // SIP Math Calculation
  const sipResult = useMemo(() => {
    const P = Number(calcAmount);
    const r = Number(calcRate) / 100;
    const t = Number(calcYears);

    let invested = 0;
    let total = 0;

    if (calcMode === 'sip') {
      const monthlyRate = r / 12;
      const months = t * 12;
      invested = P * months;
      total = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      invested = P;
      total = P * Math.pow(1 + r, t);
    }

    const returns = Math.max(0, total - invested);
    const investedRatio = total > 0 ? (invested / total) * 100 : 50;

    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(total),
      investedRatio: Math.min(100, Math.max(10, Math.round(investedRatio)))
    };
  }, [calcMode, calcAmount, calcRate, calcYears]);

  // Autocomplete Search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return Object.values(STOCKS_DATA).filter(
      (s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Tabbed Market Movers Filter
  const marketMoverStocks = useMemo(() => {
    const all = Object.values(STOCKS_DATA);
    if (activeMarketTab === 'most_bought') return all.filter((s) => s.category === 'most_bought' || s.symbol === 'RELIANCE');
    if (activeMarketTab === 'gainers') return all.filter((s) => s.isPositive);
    if (activeMarketTab === 'losers') return all.filter((s) => !s.isPositive || s.symbol === 'TSLA');
    return all.slice(0, 4);
  }, [activeMarketTab]);

  // SVG Chart Normalized Points
  const activeTimeframePoints = currentStock.timeframePoints[timeframe] || currentStock.timeframePoints['1D'];
  const minPrice = Math.min(...activeTimeframePoints) * 0.996;
  const maxPrice = Math.max(...activeTimeframePoints) * 1.004;
  const priceRange = maxPrice - minPrice || 1;

  const chartPaths = useMemo(() => {
    const width = 640;
    const height = 210;
    const padding = 16;
    const w = width - padding * 2;
    const h = height - padding * 2;

    const coords = activeTimeframePoints.map((val, idx) => {
      const x = padding + (idx / (activeTimeframePoints.length - 1)) * w;
      const y = height - padding - ((val - minPrice) / priceRange) * h;
      return { x, y, val };
    });

    const line = coords.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`, '');
    const area = `${line} L ${width - padding},${height} L ${padding},${height} Z`;

    return { line, area, coords };
  }, [activeTimeframePoints, minPrice, priceRange]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const selectStock = (sym) => {
    setSelectedStockKey(sym);
    setSearchQuery('');
    setSearchFocused(false);
    scrollTo('terminal-section');
  };

  return (
    <div className="bg-white dark:bg-[#090E1A] text-gray-900 dark:text-[#DEE2F3] font-body-md text-body-md min-h-screen selection:bg-[#00D09C]/30 selection:text-[#00D09C] flex flex-col antialiased transition-colors duration-200">
      <DesktopHeader />

      <main className="w-full pt-16 flex-1 bg-white dark:bg-[#090E1A]">
        {/* ========================================================================= */}
        {/* 1. REAL-TIME INDICES TICKER MARQUEE                                       */}
        {/* ========================================================================= */}
        <section className="w-full bg-gray-50 dark:bg-[#0C1222] py-2.5 px-4 border-b border-gray-200 dark:border-[#1E293B] overflow-x-auto whitespace-nowrap shadow-xs flex items-center justify-between text-xs font-mono select-none sticky top-16 z-40 backdrop-blur-md bg-opacity-95">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 pr-4 border-r border-gray-300 dark:border-[#1E293B] shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D09C] animate-pulse"></span>
              <span className="font-extrabold text-gray-900 dark:text-white tracking-wider text-[11px] uppercase">
                LIVE INDICES
              </span>
              <span className="text-[#008761] dark:text-[#00D09C] bg-emerald-100 dark:bg-[#00D09C]/15 px-2 py-0.5 rounded text-[10px] font-bold">
                100ms TICK
              </span>
            </div>

            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
              {INDICES_FEED.map((idx) => (
                <div key={idx.name} className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-gray-700 dark:text-slate-300">{idx.name}</span>
                  <span className="font-extrabold text-gray-950 dark:text-white">{idx.value}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      idx.isPositive
                        ? 'text-[#008761] dark:text-[#00D09C] bg-emerald-50 dark:bg-[#00D09C]/15 border border-emerald-200 dark:border-[#00D09C]/30'
                        : idx.isVol
                        ? 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-400/15 border border-sky-200 dark:border-sky-400/30'
                        : 'text-rose-700 dark:text-[#EB5757] bg-rose-50 dark:bg-[#EB5757]/15 border border-rose-200 dark:border-[#EB5757]/30'
                    }`}
                  >
                    {idx.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-gray-600 dark:text-slate-400 text-xs pl-6 border-l border-gray-300 dark:border-[#1E293B] shrink-0">
            <span className="flex items-center gap-1.5 font-bold text-gray-800 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#00D09C]"></span>
              NSE &amp; BSE: <strong className="text-[#008761] dark:text-[#00D09C]">OPEN</strong>
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. HERO: "StockTrend your wealth" WITH CLEAR CITYSCAPE & PHONE ANIMATION  */}
        {/* ========================================================================= */}
        <section className="w-full pt-12 pb-0 bg-gradient-to-b from-gray-50 via-white to-white dark:from-[#0C1222] dark:via-[#090E1A] dark:to-[#090E1A] relative overflow-hidden transition-colors">
          {/* Soft Glow */}
          <div className="absolute top-12 left-1/4 w-[480px] h-[300px] rounded-full bg-[#00D09C]/10 blur-[130px] pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8 relative z-10">
            {/* Headline */}
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-950 dark:text-white leading-[1.12]">
                StockTrend your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D09C] via-teal-500 to-sky-600 dark:to-sky-400">
                  wealth
                </span>
              </h1>
              <p className="text-lg sm:text-2xl text-gray-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mt-2 font-medium">
                Simple, transparent online investing &amp; Next-Day AI Stock Trend Forecasts.
              </p>
            </div>

            {/* HERO CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/sign-up"
                className="px-10 py-4 rounded-xl bg-[#00D09C] hover:bg-[#00b386] text-white font-extrabold text-lg shadow-lg shadow-[#00D09C]/30 hover:shadow-[#00D09C]/50 transition-all inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Get started</span>
                <span className="material-symbols-outlined text-2xl group-hover:translate-x-1.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                to="/predictions"
                className="px-8 py-4 rounded-xl bg-white dark:bg-[#131B2E] border-2 border-emerald-500 text-[#008761] dark:text-[#00D09C] font-extrabold text-lg shadow-md hover:bg-emerald-50 dark:hover:bg-[#1A253D] transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl">psychology</span>
                <span>View AI Predictions</span>
              </Link>
            </div>

            {/* OMNIBAR SEARCH */}
            <div className="w-full max-w-2xl relative mt-2">
              <div className="relative flex items-center bg-white dark:bg-[#131B2E] border-2 border-gray-300 dark:border-[#22314E] focus-within:border-[#00D09C] dark:focus-within:border-[#00D09C] rounded-2xl shadow-xl transition-all duration-300 px-5 py-4 group">
                <span className="material-symbols-outlined text-gray-400 dark:text-slate-400 text-2xl group-focus-within:text-[#00D09C] transition-colors mr-3">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search stocks, mutual funds, forecasts (e.g. Reliance, Tata Motors, Nifty 50)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 text-base sm:text-lg focus:outline-none w-full font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white">
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown */}
              {searchFocused && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-[#22314E] rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-gray-100 dark:divide-[#1E293B] max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((stk) => (
                      <button
                        key={stk.symbol}
                        onClick={() => selectStock(stk.symbol)}
                        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-emerald-50/60 dark:hover:bg-[#1A253D] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1E2A44] flex items-center justify-center font-bold text-gray-900 dark:text-white text-sm border border-gray-200 dark:border-[#2D3E63]">
                            {stk.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-extrabold text-gray-900 dark:text-white group-hover:text-[#00D09C] transition-colors">
                              {stk.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-slate-400 font-mono font-semibold">{stk.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-extrabold text-gray-900 dark:text-white">{stk.currency}{stk.price.toFixed(2)}</div>
                          <div className={`text-xs font-bold ${stk.isPositive ? 'text-[#008761] dark:text-[#00D09C]' : 'text-rose-600 dark:text-[#EB5757]'}`}>
                            {stk.change}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-slate-400 text-sm font-medium">
                      No instruments found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}

              {/* Popular Trending Tags */}
              <div className="flex items-center justify-center flex-wrap gap-2 mt-4 text-xs font-mono">
                <span className="text-gray-500 dark:text-slate-400 mr-1 font-bold">Trending:</span>
                {['RELIANCE', 'TCS', 'HDFCBANK', 'TATAMOTORS', 'INFY', 'NVDA', 'AAPL'].map((sym) => (
                  <button
                    key={sym}
                    onClick={() => selectStock(sym)}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#131B2E] border border-gray-300 dark:border-[#22314E] hover:border-[#00D09C] text-gray-800 dark:text-slate-200 hover:text-[#008761] dark:hover:text-white transition-all cursor-pointer font-bold shadow-2xs"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* HERO ILLUSTRATION: PHONE FLOATING OVER CITYSCAPE (GROWW LAYOUT)  */}
          {/* Full-width block — city LEFT + RIGHT, phone centered foreground   */}
          {/* ================================================================= */}
          <div
            className="w-full relative overflow-hidden"
            style={{ height: '520px', marginTop: '-8px' }}
          >
            {/* ── LAYER 0: Cityscape SVG ── centered, wider than viewport */}
            <img
              src="https://resources.groww.in/web-assets/story_assets/landing-page/home_page/cityScape.svg"
              alt="StockTrend City"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: '100%',
                width: 'auto',
                minWidth: '130%',
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />

            {/* ── LAYER 1: Animated SVG Overlay (ticker on building, logo) ── */}
            <AnimatedCityScapeOverlay />

            {/* ── LAYER 2: Phone Card — floats centered in foreground ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              <div
                className="drop-shadow-[0_24px_60px_rgba(0,208,156,0.28)] filter"
                style={{
                  animation: 'floatPhone 3.2s ease-in-out infinite',
                  pointerEvents: 'auto',
                  marginTop: '-20px',
                }}
              >
                <AnimatedStockPhone
                  stockName="Reliance Industries Ltd."
                  ticker="RELIANCE"
                  price="2930.22"
                  change="+2.35%"
                  isPositive={true}
                  defaultTimeframe="3M"
                />
              </div>
            </div>

            {/* ── LAYER 3: Bottom fade ── blends into page bg */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '100px',
                background: 'linear-gradient(to bottom, transparent 0%, var(--hero-fade, white) 100%)',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. "INDIA'S #1 INVESTING & FORECASTING PLATFORM" LAUREL RIBBON            */}
        {/* ========================================================================= */}
        <section className="w-full py-8 bg-gray-50 dark:bg-[#0C1222] border-y border-gray-200 dark:border-[#1E293B]">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-2">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-amber-500 text-3xl">verified</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">
                India's #1 Predictive Trading &amp; Investing Platform
              </h3>
              <span className="material-symbols-outlined text-amber-500 text-3xl">verified</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-gray-700 dark:text-slate-300">
              Trusted by <span className="text-[#008761] dark:text-[#00D09C] font-extrabold text-base">2 Cr+ active investors &amp; traders</span> across India
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION: "India’s stock market at your fingertips" (Bento Grid)        */}
        {/* ========================================================================= */}
        <section id="stocks-section" className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-[#090E1A]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white">
                India’s stock market at your fingertips
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-base mt-2 font-medium">
                Trade and invest across equities, ETFs, IPOs, and Fixed Income instruments seamlessly.
              </p>
            </div>

            {/* 4-Card Bento Grid (Matching Groww Layout & Image 3) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Left Column: Stocks (with Phone Mockup) + Bonds */}
              <div className="flex flex-col gap-6">
                {/* Card 1: Stocks (Exact Card with Phone Mockup from Image 3) */}
                <div
                  onClick={() => scrollTo('terminal-section')}
                  className="bg-white dark:bg-[#131B2E] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-[#22314E] hover:border-[#00D09C] transition-all flex flex-col justify-between items-center group cursor-pointer shadow-sm hover:shadow-xl relative overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="w-full flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#008761] dark:text-[#00D09C] uppercase tracking-wider">
                        Equities
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white group-hover:text-[#008761] dark:group-hover:text-[#00D09C] transition-colors mt-0.5">
                        Stocks
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-[#00D09C]/15 border border-emerald-200 dark:border-[#00D09C]/30 text-[#008761] dark:text-[#00D09C] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </div>
                  </div>

                  {/* Phone Mockup (Centered inside the Stocks Card as in Image 3) */}
                  <div className="py-2 w-full flex justify-center">
                    <AnimatedStockPhone
                      stockName="Renewable Energy Solutions"
                      ticker="RESE"
                      price="791.62"
                      change="+16.04 (2.34%)"
                      isPositive={true}
                      defaultTimeframe="1D"
                    />
                  </div>

                  {/* Card Footer */}
                  <div className="w-full mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 font-medium border-t border-gray-100 dark:border-[#1E293B] pt-4">
                    <span>Zero brokerage on equity delivery</span>
                    <span className="font-bold text-[#008761] dark:text-[#00D09C] flex items-center gap-1">
                      Explore Stocks
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>

                {/* Card 4: Bonds (Exact Geometric Architectural Line Pattern from Image 3, directly under Stocks) */}
                <div
                  onClick={() => scrollTo('terminal-section')}
                  className="bg-white dark:bg-[#131B2E] rounded-3xl p-7 border border-gray-200 dark:border-[#22314E] hover:border-purple-500 transition-all flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 min-h-[260px]"
                >
                  {/* Geometric Symmetrical Pattern from Image 3 */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-gray-300 dark:stroke-slate-700 fill-none opacity-85" preserveAspectRatio="none" viewBox="0 0 320 280">
                    {/* Top-left curves */}
                    <path d="M 0 45 A 45 45 0 0 1 45 0" strokeWidth="1.2" />
                    <path d="M 45 0 A 45 45 0 0 1 90 45" strokeWidth="1.2" />
                    <path d="M 0 90 A 45 45 0 0 1 45 45" strokeWidth="1.2" />
                    <path d="M 45 45 A 45 45 0 0 1 90 90" strokeWidth="1.2" />

                    {/* Top-right curves */}
                    <path d="M 230 0 A 45 45 0 0 1 275 45" strokeWidth="1.2" />
                    <path d="M 275 45 A 45 45 0 0 1 320 0" strokeWidth="1.2" />
                    <path d="M 230 90 A 45 45 0 0 1 275 45" strokeWidth="1.2" />
                    <path d="M 275 45 A 45 45 0 0 1 320 90" strokeWidth="1.2" />

                    {/* Bottom curves */}
                    <path d="M 0 190 A 45 45 0 0 1 45 235" strokeWidth="1.2" />
                    <path d="M 45 235 A 45 45 0 0 1 0 280" strokeWidth="1.2" />
                    <path d="M 320 190 A 45 45 0 0 0 275 235" strokeWidth="1.2" />
                    <path d="M 275 235 A 45 45 0 0 0 320 280" strokeWidth="1.2" />

                    {/* Scalloped Rupee Coin Frame */}
                    <circle cx="160" cy="245" r="28" strokeWidth="1.2" />
                    <circle cx="160" cy="245" r="24" strokeWidth="0.8" strokeDasharray="3 3" />
                  </svg>

                  {/* Central Title and Description (Matching Image 3) */}
                  <div className="relative z-10 flex flex-col items-center">
                    <h3 className="text-3xl font-black text-gray-950 dark:text-white">
                      Bonds
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300 text-sm mt-4 font-semibold max-w-[240px] leading-relaxed">
                      Earn fixed interest with regular payouts
                    </p>
                  </div>

                  {/* Centered Rupee Coin Symbol */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center font-black text-gray-500 dark:text-slate-400 text-xl font-mono">
                    ₹
                  </div>
                </div>
              </div>

              {/* Right Column: ETFs + IPOs */}
              <div className="flex flex-col gap-6">
                {/* Card 2: ETFs */}
                <div
                  onClick={() => scrollTo('terminal-section')}
                  className="bg-white dark:bg-[#131B2E] rounded-3xl p-7 border border-gray-200 dark:border-[#22314E] hover:border-sky-500 transition-all flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 min-h-[240px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">pie_chart</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                        Exchange Traded Funds
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      ETFs
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-3 font-medium">
                      Gold, Silver, International &amp; Index ETFs for diversified wealth building.
                    </p>

                    {/* 4 Sub-Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
                      {['Gold', 'Silver', 'International', 'Index'].map((etf) => (
                        <span key={etf} className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-[#1A253D] text-xs font-bold text-gray-800 dark:text-slate-200 text-center border border-gray-200 dark:border-[#2D3E63]">
                          {etf}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-extrabold text-sky-600 dark:text-sky-400">
                    <span>Explore ETF Screener</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </div>
                </div>

                {/* Card 3: IPOs */}
                <div
                  onClick={() => scrollTo('terminal-section')}
                  className="bg-white dark:bg-[#131B2E] rounded-3xl p-7 border border-gray-200 dark:border-[#22314E] hover:border-amber-500 transition-all flex flex-col justify-between flex-1 group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden min-h-[420px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-500/30">
                        Instant Allotment Status
                      </div>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      IPOs
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm mt-3 leading-relaxed font-medium">
                      Track upcoming and ongoing IPOs. Apply in seconds using UPI with zero paperwork.
                    </p>

                    {/* Live & Upcoming IPO Preview Cards */}
                    <div className="mt-6 flex flex-col gap-3">
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1A253D] border border-gray-200 dark:border-[#2D3E63] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-extrabold text-sm">
                            NV
                          </div>
                          <div>
                            <div className="font-extrabold text-sm text-gray-900 dark:text-white">Nova Tech Solutions</div>
                            <div className="text-xs text-gray-500 dark:text-slate-400 font-medium">Bidding Closes Tomorrow</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-[#008761] dark:text-[#00D09C]">
                          3.4x Subscribed
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1A253D] border border-gray-200 dark:border-[#2D3E63] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
                            AI
                          </div>
                          <div>
                            <div className="font-extrabold text-sm text-gray-900 dark:text-white">Apex Infotech Ltd</div>
                            <div className="text-xs text-gray-500 dark:text-slate-400 font-medium">Upcoming · Oct 22</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300">
                          ₹450 - ₹480
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between text-sm font-extrabold text-amber-600 dark:text-amber-400 border-t border-gray-100 dark:border-[#1E293B] pt-4">
                    <span>View IPO Calendar</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SECTION: "Build wealth, SIP by SIP" (Interactive Calculator)           */}
        {/* ========================================================================= */}
        <section id="mf-section" className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-[#0C1222] border-t border-gray-200 dark:border-[#1E293B]">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#008761] dark:text-[#00D09C] uppercase font-extrabold tracking-widest">
                  DIRECT MUTUAL FUNDS · ZERO COMMISSION
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white mt-1">
                  Build wealth, SIP by SIP
                </h2>
              </div>
              <Link
                to="/sign-up"
                className="px-6 py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00b386] text-white font-extrabold text-sm shadow-md transition-all self-start sm:self-auto"
              >
                Invest now
              </Link>
            </div>

            {/* INTERACTIVE SIP & LUMPSUM CALCULATOR */}
            <div id="calculator-section" className="bg-white dark:bg-[#131B2E] rounded-3xl border border-gray-200 dark:border-[#22314E] p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Mode Selector */}
                <div className="flex items-center bg-gray-100 dark:bg-[#0C1222] p-1.5 rounded-xl border border-gray-300 dark:border-[#22314E] w-fit">
                  <button
                    onClick={() => setCalcMode('sip')}
                    className={`px-6 py-2 rounded-lg text-sm font-extrabold transition-all cursor-pointer ${
                      calcMode === 'sip' ? 'bg-[#00D09C] text-white shadow-sm' : 'text-gray-700 dark:text-slate-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    SIP
                  </button>
                  <button
                    onClick={() => setCalcMode('lumpsum')}
                    className={`px-6 py-2 rounded-lg text-sm font-extrabold transition-all cursor-pointer ${
                      calcMode === 'lumpsum' ? 'bg-[#00D09C] text-white shadow-sm' : 'text-gray-700 dark:text-slate-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Lumpsum
                  </button>
                </div>

                {/* Slider 1: Monthly Investment */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-800 dark:text-slate-200">
                      {calcMode === 'sip' ? 'Monthly investment' : 'Total investment'}
                    </span>
                    <span className="font-mono text-2xl font-extrabold text-[#008761] dark:text-[#00D09C]">
                      ₹{calcAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="w-full accent-[#00D09C] bg-gray-200 dark:bg-[#0C1222] h-2.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-mono text-gray-500 dark:text-slate-400 font-bold">
                    <span>₹500</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                {/* Slider 2: Expected return rate */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-800 dark:text-slate-200">Expected return rate (p.a)</span>
                    <span className="font-mono text-2xl font-extrabold text-sky-600 dark:text-sky-400">
                      {calcRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={calcRate}
                    onChange={(e) => setCalcRate(Number(e.target.value))}
                    className="w-full accent-sky-500 bg-gray-200 dark:bg-[#0C1222] h-2.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-mono text-gray-500 dark:text-slate-400 font-bold">
                    <span>1%</span>
                    <span>14% (Equity MF Avg)</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Slider 3: Time period */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-800 dark:text-slate-200">Time period</span>
                    <span className="font-mono text-2xl font-extrabold text-gray-950 dark:text-white">
                      {calcYears} {calcYears === 1 ? 'Year' : 'Years'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={calcYears}
                    onChange={(e) => setCalcYears(Number(e.target.value))}
                    className="w-full accent-[#00D09C] bg-gray-200 dark:bg-[#0C1222] h-2.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-mono text-gray-500 dark:text-slate-400 font-bold">
                    <span>1 Yr</span>
                    <span>10 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Output Dual Figures (5 cols) */}
              <div className="lg:col-span-5 bg-gray-50 dark:bg-[#0C1222] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-[#22314E] flex flex-col justify-between gap-6 shadow-sm">
                <div>
                  <span className="text-xs font-mono text-gray-500 dark:text-slate-400 uppercase font-extrabold tracking-wider block">
                    TOTAL ESTIMATED WEALTH
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-[#008761] dark:text-[#00D09C] mt-1">
                    ₹{sipResult.total.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Dual Color Segmented Bar */}
                <div>
                  <div className="w-full h-4 bg-gray-200 dark:bg-[#1E293B] rounded-full flex overflow-hidden mb-2">
                    <div
                      className="h-full bg-slate-500 transition-all duration-300"
                      style={{ width: `${sipResult.investedRatio}%` }}
                    ></div>
                    <div
                      className="h-full bg-[#00D09C] transition-all duration-300"
                      style={{ width: `${100 - sipResult.investedRatio}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="flex items-center gap-1.5 text-gray-700 dark:text-slate-300">
                      <span className="w-3 h-3 rounded-full bg-slate-500"></span>
                      Invested: ₹{sipResult.invested.toLocaleString('en-IN')}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#008761] dark:text-[#00D09C]">
                      <span className="w-3 h-3 rounded-full bg-[#00D09C]"></span>
                      Gain: ₹{sipResult.returns.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <Link
                  to="/sign-up"
                  className="w-full py-4 rounded-xl bg-[#00D09C] hover:bg-[#00b386] text-white font-extrabold text-center text-sm shadow-md transition-all cursor-pointer"
                >
                  START A SIP
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SECTION: "Trade Futures & Options like a pro"                          */}
        {/* ========================================================================= */}
        <section id="fo-section" className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-[#090E1A] border-t border-gray-200 dark:border-[#1E293B]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono text-[#008761] dark:text-[#00D09C] uppercase font-extrabold tracking-widest">
                DERIVATIVES INTELLIGENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white mt-1">
                Trade Futures &amp; Options like a pro
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-base mt-2 font-medium">
                Lightning-fast order execution with advanced option chains, custom payoff analyzers, and scalper charts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-[#131B2E] p-7 rounded-3xl border border-gray-200 dark:border-[#22314E] flex flex-col justify-between group hover:border-[#00D09C] transition-all shadow-sm hover:shadow-xl">
                <div>
                  <span className="material-symbols-outlined text-4xl text-[#008761] dark:text-[#00D09C] mb-4">terminal</span>
                  <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">Trading Terminal</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Track charts, positions, and trade in a customisable multi-monitor layout.
                  </p>
                </div>
                <Link
                  to="/overview"
                  className="mt-6 py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-[#1A253D] hover:bg-emerald-50 dark:hover:bg-[#202E4C] text-[#008761] dark:text-[#00D09C] font-bold text-xs border border-gray-300 dark:border-[#2D3E63] text-center"
                >
                  Explore Terminal
                </Link>
              </div>

              <div className="bg-white dark:bg-[#131B2E] p-7 rounded-3xl border border-gray-200 dark:border-[#22314E] flex flex-col justify-between group hover:border-sky-500 transition-all shadow-sm hover:shadow-xl">
                <div>
                  <span className="material-symbols-outlined text-4xl text-sky-600 dark:text-sky-400 mb-4">table_chart</span>
                  <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">Option Chain</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Analyse Greeks, live open interest, view payoffs, and create multi-leg basket orders.
                  </p>
                </div>
                <Link
                  to="/overview"
                  className="mt-6 py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-[#1A253D] hover:bg-sky-50 dark:hover:bg-[#202E4C] text-sky-700 dark:text-sky-400 font-bold text-xs border border-gray-300 dark:border-[#2D3E63] text-center"
                >
                  Option Chain
                </Link>
              </div>

              <div className="bg-white dark:bg-[#131B2E] p-7 rounded-3xl border border-gray-200 dark:border-[#22314E] flex flex-col justify-between group hover:border-purple-500 transition-all shadow-sm hover:shadow-xl">
                <div>
                  <span className="material-symbols-outlined text-4xl text-purple-600 dark:text-purple-400 mb-4">touch_app</span>
                  <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">Scalper Mode</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    One-tap instant order placement optimized for mobile intraday options scalping.
                  </p>
                </div>
                <Link
                  to="/m/overview"
                  className="mt-6 py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-[#1A253D] hover:bg-purple-50 dark:hover:bg-[#202E4C] text-purple-700 dark:text-purple-400 font-bold text-xs border border-gray-300 dark:border-[#2D3E63] text-center"
                >
                  Explore Scalper Mode
                </Link>
              </div>

              <div className="bg-white dark:bg-[#131B2E] p-7 rounded-3xl border border-gray-200 dark:border-[#22314E] flex flex-col justify-between group hover:border-amber-500 transition-all shadow-sm hover:shadow-xl">
                <div>
                  <span className="material-symbols-outlined text-4xl text-amber-600 dark:text-amber-400 mb-4">oil_barrel</span>
                  <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">Commodities</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Trade Crude Oil, Natural Gas, Gold, and Silver futures on MCX with competitive margins.
                  </p>
                </div>
                <Link
                  to="/overview"
                  className="mt-6 py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-[#1A253D] hover:bg-amber-50 dark:hover:bg-[#202E4C] text-amber-700 dark:text-amber-400 font-bold text-xs border border-gray-300 dark:border-[#2D3E63] text-center"
                >
                  Explore Commodities
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. SECTION: "Stock trading made simple" (Intraday, MTF, Pledge)           */}
        {/* ========================================================================= */}
        <section id="trading-features" className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-[#0C1222] border-t border-gray-200 dark:border-[#1E293B]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white">
                Stock trading made simple
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-base mt-2 font-medium">
                Fast, simple and secure stock trading. All in one unified platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#131B2E] p-8 rounded-3xl border border-gray-200 dark:border-[#22314E] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono font-extrabold text-[#008761] dark:text-[#00D09C] uppercase mb-2">INTRADAY</div>
                  <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">Top Intraday Stocks</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Monitor top intraday volume and momentum performers in real time with live tick updates.
                  </p>
                </div>
                <button onClick={() => scrollTo('terminal-section')} className="text-left mt-6 text-sm font-extrabold text-[#008761] dark:text-[#00D09C] flex items-center gap-1 cursor-pointer">
                  <span>Explore Intraday Stocks</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              <div className="bg-white dark:bg-[#131B2E] p-8 rounded-3xl border border-gray-200 dark:border-[#22314E] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono font-extrabold text-sky-600 dark:text-sky-400 uppercase mb-2">LEVERAGE</div>
                  <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">Upto 4x MTF Leverage</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Margin Trading Facility (MTF) lets you buy stocks with just 25% upfront margin and hold for up to 365 days.
                  </p>
                </div>
                <button onClick={() => scrollTo('terminal-section')} className="text-left mt-6 text-sm font-extrabold text-sky-600 dark:text-sky-400 flex items-center gap-1 cursor-pointer">
                  <span>Explore MTF Stocks</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              <div className="bg-white dark:bg-[#131B2E] p-8 rounded-3xl border border-gray-200 dark:border-[#22314E] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono font-extrabold text-purple-600 dark:text-purple-400 uppercase mb-2">INSTANT MARGIN</div>
                  <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">Stock Pledge</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Unlock instant trading balance by pledging your existing stock or mutual fund holdings without selling.
                  </p>
                </div>
                <button onClick={() => scrollTo('terminal-section')} className="text-left mt-6 text-sm font-extrabold text-purple-600 dark:text-purple-400 flex items-center gap-1 cursor-pointer">
                  <span>Explore Pledge</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Social Proof Banner */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-[#22314E] text-center shadow-sm">
              <span className="text-lg sm:text-xl font-black text-gray-950 dark:text-white">
                Trusted by <span className="text-[#008761] dark:text-[#00D09C]">20,000,000+</span> Investors across India
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. LIVE REAL-TIME MARKET MOVERS SCREENER                                  */}
        {/* ========================================================================= */}
        <section id="terminal-section" className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-[#090E1A] border-t border-gray-200 dark:border-[#1E293B]">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#008761] dark:text-[#00D09C] uppercase font-extrabold tracking-widest">
                  MARKET EXPLORER
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white mt-1">
                  Live Stock Market Screener
                </h2>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'most_bought', label: 'Most Bought on StockTrend' },
                  { id: 'gainers', label: 'Top Gainers' },
                  { id: 'losers', label: 'Top Losers' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMarketTab(tab.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      activeMarketTab === tab.id
                        ? 'bg-[#00D09C] text-white shadow-md shadow-[#00D09C]/20'
                        : 'bg-gray-100 dark:bg-[#131B2E] text-gray-700 dark:text-slate-300 hover:text-black dark:hover:text-white border border-gray-300 dark:border-[#22314E]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4-Card Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {marketMoverStocks.map((stock) => {
                const livePrice = livePrices[stock.symbol] || stock.price;
                const flash = tickFlash[stock.symbol];
                const isSelected = selectedStockKey === stock.symbol;

                return (
                  <div
                    key={stock.symbol}
                    onClick={() => setSelectedStockKey(stock.symbol)}
                    className={`bg-white dark:bg-[#131B2E] rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                      isSelected
                        ? 'border-[#00D09C] ring-2 ring-[#00D09C]/40 bg-emerald-50/20 dark:bg-[#16223A]'
                        : 'border-gray-200 dark:border-[#22314E] hover:border-gray-400'
                    }`}
                  >
                    <div>
                      {/* Avatar & Symbol */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1A2640] border border-gray-200 dark:border-[#2D3E63] flex items-center justify-center font-extrabold text-gray-900 dark:text-white text-sm">
                            {stock.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-extrabold text-gray-950 dark:text-white group-hover:text-[#008761] dark:group-hover:text-[#00D09C] transition-colors leading-tight">
                              {stock.symbol}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-slate-400 font-medium truncate max-w-[130px]">
                              {stock.name}
                            </div>
                          </div>
                        </div>

                        {/* Sparkline */}
                        <div className="w-16 h-8 flex items-center justify-end">
                          <svg className="w-full h-full" viewBox="0 0 70 30">
                            <polyline
                              fill="none"
                              stroke={stock.isPositive ? '#00A87E' : '#DC2626'}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              points={stock.sparkline
                                .map((v, i) => {
                                  const min = Math.min(...stock.sparkline);
                                  const max = Math.max(...stock.sparkline);
                                  const rng = max - min || 1;
                                  const x = (i / (stock.sparkline.length - 1)) * 66 + 2;
                                  const y = 28 - ((v - min) / rng) * 24;
                                  return `${x},${y}`;
                                })
                                .join(' ')}
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Live Price with Flash Indicator */}
                      <div className="flex items-baseline justify-between mt-4">
                        <span
                          className={`font-mono text-2xl font-black transition-colors duration-300 ${
                            flash === 'up'
                              ? 'text-[#008761] dark:text-[#00D09C]'
                              : flash === 'down'
                              ? 'text-rose-600 dark:text-[#EB5757]'
                              : 'text-gray-950 dark:text-white'
                          }`}
                        >
                          {stock.currency}{livePrice.toFixed(2)}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                            stock.isPositive
                              ? 'bg-emerald-100 dark:bg-[#00D09C]/15 text-[#008761] dark:text-[#00D09C]'
                              : 'bg-rose-100 dark:bg-[#EB5757]/15 text-rose-700 dark:text-[#EB5757]'
                          }`}
                        >
                          {stock.change}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-slate-400 font-medium">MCap: {stock.marketCap}</span>
                      <span className="text-[#008761] dark:text-[#00D09C] font-extrabold flex items-center gap-0.5">
                        <span>Trade</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Spotlight Live Terminal Canvas for Selected Stock */}
            <div className="bg-gray-50 dark:bg-[#0C1222] rounded-3xl border border-gray-200 dark:border-[#1E293B] shadow-xl p-6 sm:p-8 flex flex-col gap-6 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-[#1E293B]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 dark:text-white">
                    {currentStock.name} ({currentStock.symbol})
                  </h3>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-mono text-3xl font-black text-gray-950 dark:text-white">
                      {currentStock.currency}{currentPrice.toFixed(2)}
                    </span>
                    <span className={`text-sm font-extrabold font-mono ${currentStock.isPositive ? 'text-[#008761] dark:text-[#00D09C]' : 'text-rose-600 dark:text-[#EB5757]'}`}>
                      {currentStock.change} ({currentStock.changeVal})
                    </span>
                  </div>
                </div>

                {/* Timeframe switcher */}
                <div className="flex items-center bg-gray-200 dark:bg-[#131B2E] p-1 rounded-xl border border-gray-300 dark:border-[#22314E] w-fit">
                  {['1D', '1W', '1M', '1Y'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono font-extrabold transition-all cursor-pointer ${
                        timeframe === tf ? 'bg-[#00D09C] text-white shadow-xs' : 'text-gray-700 dark:text-slate-400 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* SVG Area Chart */}
              <div className="w-full h-64 sm:h-72 relative bg-white dark:bg-[#101728] rounded-2xl p-4 border border-gray-200 dark:border-[#22314E] overflow-hidden shadow-inner">
                <svg className="w-full h-full" viewBox="0 0 640 210" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradientGroww" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D09C" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00D09C" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal gridlines */}
                  <line x1="16" y1="50" x2="624" y2="50" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-[#1E293B]" />
                  <line x1="16" y1="105" x2="624" y2="105" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-[#1E293B]" />
                  <line x1="16" y1="160" x2="624" y2="160" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-[#1E293B]" />

                  {/* Gradient Fill */}
                  <path d={chartPaths.area} fill="url(#chartGradientGroww)" />

                  {/* Trajectory Stroke */}
                  <path
                    d={chartPaths.line}
                    fill="none"
                    stroke="#00D09C"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Interactive Nodes */}
                  {chartPaths.coords.map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r={i === chartPaths.coords.length - 1 ? 6 : 4}
                      className={i === chartPaths.coords.length - 1 ? 'fill-[#00D09C] stroke-white stroke-2 animate-pulse' : 'fill-white dark:fill-[#101728] stroke-[#00D09C] stroke-2'}
                    />
                  ))}
                </svg>
              </div>

              {/* Day's Range & 52-Week Range Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
                    <span className="text-gray-500 dark:text-slate-400">Low: {currentStock.currency}{currentStock.dayLow.toFixed(2)}</span>
                    <span className="text-gray-900 dark:text-white">Today's Range</span>
                    <span className="text-gray-500 dark:text-slate-400">High: {currentStock.currency}{currentStock.dayHigh.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 dark:bg-[#1E293B] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-[#00D09C] rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(10, ((currentPrice - currentStock.dayLow) / (currentStock.dayHigh - currentStock.dayLow || 1)) * 100))}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
                    <span className="text-gray-500 dark:text-slate-400">52W Low: {currentStock.currency}{currentStock.fiftyTwoWeekLow.toFixed(2)}</span>
                    <span className="text-gray-900 dark:text-white">52-Week Range</span>
                    <span className="text-gray-500 dark:text-slate-400">52W High: {currentStock.currency}{currentStock.fiftyTwoWeekHigh.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 dark:bg-[#1E293B] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-[#00D09C] rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(10, ((currentPrice - currentStock.fiftyTwoWeekLow) / (currentStock.fiftyTwoWeekHigh - currentStock.fiftyTwoWeekLow || 1)) * 100))}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Market Depth (Bids vs Asks) */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                  <span className="text-[#008761] dark:text-[#00D09C]">Buy Orders: {currentStock.bidsPercent}%</span>
                  <span className="text-gray-700 dark:text-slate-300">Market Depth</span>
                  <span className="text-rose-600 dark:text-[#EB5757]">Sell Orders: {currentStock.asksPercent}%</span>
                </div>
                <div className="w-full h-3.5 bg-gray-200 dark:bg-[#1E293B] rounded-full flex overflow-hidden">
                  <div className="h-full bg-[#00D09C]" style={{ width: `${currentStock.bidsPercent}%` }}></div>
                  <div className="h-full bg-[#EB5757]" style={{ width: `${currentStock.asksPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. SECTION: "Finance simplified, in your language"                         */}
        {/* ========================================================================= */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-[#0C1222] border-t border-gray-200 dark:border-[#1E293B]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono text-[#008761] dark:text-[#00D09C] uppercase font-extrabold tracking-widest">
                KNOWLEDGE BASE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white mt-1">
                Finance simplified, in your language
              </h2>
              <p className="text-gray-600 dark:text-slate-400 text-base mt-2 font-medium">
                Learn how to invest, build portfolios, and master predictive strategies with simple visual guides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-7 border border-gray-200 dark:border-[#22314E] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-[#00D09C]/15 text-[#008761] dark:text-[#00D09C] flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">play_circle</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-950 dark:text-white">Stock Market for Beginners</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Understand how the share market works, how share prices move, and how to read candlestick charts.
                  </p>
                </div>
                <Link to="/predictions" className="text-xs font-extrabold text-[#008761] dark:text-[#00D09C] mt-6 flex items-center gap-1">
                  <span>Start learning</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-7 border border-gray-200 dark:border-[#22314E] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">insights</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-950 dark:text-white">Next-Day Forecast Models</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Learn how LSTM neural networks and empirical distributions compute expected probability corridors.
                  </p>
                </div>
                <Link to="/predictions" className="text-xs font-extrabold text-sky-600 dark:text-sky-400 mt-6 flex items-center gap-1">
                  <span>Explore predictions</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="bg-white dark:bg-[#131B2E] rounded-3xl p-7 border border-gray-200 dark:border-[#22314E] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">security</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-950 dark:text-white">Risk Management &amp; Hedging</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
                    Protect your portfolio with stop-loss orders, options hedging, and capital allocation budgeting.
                  </p>
                </div>
                <Link to="/predictions" className="text-xs font-extrabold text-purple-600 dark:text-purple-400 mt-6 flex items-center gap-1">
                  <span>Start learning</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. FAQ ACCORDION                                                         */}
        {/* ========================================================================= */}
        <section id="faq-section" className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-[#090E1A] border-t border-gray-200 dark:border-[#1E293B]">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <div className="text-center">
              <span className="text-xs font-mono text-[#008761] dark:text-[#00D09C] uppercase font-extrabold tracking-widest">
                GOT QUESTIONS?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {FAQS.map((faq, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#131B2E] rounded-2xl border border-gray-200 dark:border-[#22314E] overflow-hidden transition-all duration-300 shadow-xs"
                  >
                    <button
                      onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-gray-950 dark:text-white hover:text-[#008761] dark:hover:text-[#00D09C] transition-colors cursor-pointer"
                    >
                      <span className="text-base sm:text-lg">{faq.q}</span>
                      <span
                        className={`material-symbols-outlined text-2xl transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#00D09C]' : 'text-gray-400 dark:text-slate-400'
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm sm:text-base text-gray-700 dark:text-slate-300 leading-relaxed border-t border-gray-100 dark:border-[#1E293B] pt-4 font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. ABOUT STOCKTREND AI QUANTITATIVE DISCLOSURES                           */}
        {/* ========================================================================= */}
        <section id="about-groww" className="w-full px-4 sm:px-6 lg:px-8 py-14 bg-gray-50 dark:bg-[#0C1222] border-t border-gray-200 dark:border-[#1E293B] text-gray-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
          <div className="max-w-7xl mx-auto flex flex-col gap-5">
            <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">About StockTrend AI</h3>
            <p className="font-medium">
              StockTrend AI is an institutional quantitative trading and forecasting platform where users access empirical point-in-time machine learning predictions, probabilistic 1σ/2σ expected corridors, direct mutual funds, and F&amp;O analytics. StockTrend AI objectively evaluates market microstructure factors and walk-forward historical validation logs with zero look-ahead bias.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-gray-200 dark:border-[#1E293B]">
              <div>
                <strong className="text-gray-900 dark:text-white block mb-1 text-sm font-bold">EMPIRICAL POINT-IN-TIME LOGS</strong>
                <p className="font-medium">
                  All predictive snapshots are strictly logged prior to cash market bell (16:00 EST / 15:30 IST) ensuring complete auditability and eliminating backtesting leakage.
                </p>
              </div>
              <div>
                <strong className="text-gray-900 dark:text-white block mb-1 text-sm font-bold">TRADE AND FORECAST SECURELY</strong>
                <p className="font-medium">
                  On StockTrend AI, investors evaluate NSE, BSE, and NASDAQ listed equities, test systematic SIP compounding returns, and inspect real-time order depth with bank-grade 256-bit encryption.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 12. OFFICIAL STOCKTREND AI INSTITUTIONAL FOOTER                            */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#0C101C] px-4 sm:px-6 lg:px-8 py-14 border-t border-gray-800 text-slate-300 text-xs select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-800">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D09C] to-sky-500 p-0.5">
                <div className="w-full h-full bg-[#0C1222] rounded-[10px] flex items-center justify-center font-black text-base text-[#00D09C]">
                  S
                </div>
              </div>
              <span className="font-extrabold text-white text-xl">
                StockTrend<span className="text-[#00D09C]">.AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mt-1">
              Institutional quantitative telemetry, next-day stock trend predictions &amp; probabilistic corridor intelligence.
            </p>
            <div className="text-xs font-mono font-bold text-[#00D09C] mt-1">
              Contact us: support@stocktrend.ai
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-2.5">
            <h5 className="font-extrabold text-white text-sm">Products</h5>
            <Link to="/predictions" className="hover:text-white transition-colors">AI Predictions (T+1)</Link>
            <Link to="/overview" className="hover:text-white transition-colors">Trading Terminal</Link>
            <Link to="/overview" className="hover:text-white transition-colors">Futures &amp; Options</Link>
            <Link to="/overview" className="hover:text-white transition-colors">Direct Mutual Funds</Link>
            <Link to="/m/overview" className="hover:text-white transition-colors">Mobile App View</Link>
          </div>

          {/* StockTrend */}
          <div className="flex flex-col gap-2.5">
            <h5 className="font-extrabold text-white text-sm">StockTrend</h5>
            <a href="#about-groww" className="hover:text-white transition-colors">About Us</a>
            <Link to="/predictions" className="hover:text-white transition-colors">Prediction Methodology</Link>
            <a href="#faq-section" className="hover:text-white transition-colors">Help &amp; FAQ</a>
            <a href="#trading-features" className="hover:text-white transition-colors">Trust &amp; Safety</a>
          </div>

          {/* Quick Links & Calculators */}
          <div className="flex flex-col gap-2.5">
            <h5 className="font-extrabold text-white text-sm">Analytics &amp; Tools</h5>
            <Link to="/predictions" className="hover:text-white transition-colors">Prediction Intelligence</Link>
            <a href="#calculator-section" className="hover:text-white transition-colors">SIP Calculator</a>
            <a href="#calculator-section" className="hover:text-white transition-colors">Lumpsum Calculator</a>
            <a href="#trading-features" className="hover:text-white transition-colors">Brokerage Calculator</a>
          </div>
        </div>

        {/* Regulatory Disclosures */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col gap-3 text-slate-400 text-xs leading-relaxed">
          <p>
            StockTrend AI Analytics Inc. All empirical forecast corridors, next-day predictions, and expected probability limits are for quantitative research and informational purposes only. Not financial or investment advice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-gray-800 pt-4">
            <p>© 2026 StockTrend AI. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-300 font-bold">
              <span>100% Safe &amp; Secure</span>
              <span>•</span>
              <span>256-bit Bank-grade Encryption</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
