import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/brand/Logo';
import MobileDock from '../components/navigation/MobileDock';

export default function MobileOverviewPage() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const tickers = ['AAPL', 'MSFT', 'GOOGL', 'NVDA'];

  return (
    <div className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen pb-20">
      {/* Mobile Top Header */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
        <div className="h-20 px-space-md flex flex-col justify-center gap-space-xs">
          <div className="flex items-center justify-between gap-space-sm">
            <Link to="/" className="flex items-center gap-space-xs">
              <Logo className="h-8 w-8" showText={false} />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface leading-tight">
                  StockTrend AI
                </span>
                <span className="font-label-caps text-label-caps uppercase text-primary font-medium tracking-wider">
                  Overview
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-space-xs">
              <button
                className="flex items-center gap-space-xs bg-surface-container px-space-sm py-space-xs rounded-full min-h-[44px] min-w-[44px] text-on-surface-variant hover:text-on-surface transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span className="font-metric-sm text-metric-sm text-outline">FIND TICKER</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-space-2xs">
            <div className="flex items-center gap-space-xs">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-outline"></span>
              <span className="font-metric-sm text-metric-sm text-on-surface-variant">
                Market Closed · Sep 23, 4:00 PM EST
              </span>
            </div>
            <span className="font-label-caps text-label-caps uppercase text-outline">INSTITUTIONAL TELEMETRY</span>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col relative w-full pt-24 pb-20 bg-surface px-space-sm gap-space-md">
        {/* MARKET CONTEXT BAR */}
        <section className="w-full bg-surface-container-lowest rounded-lg p-space-xs shadow-sm overflow-hidden border border-outline-variant/30">
          <div className="flex items-center gap-space-md overflow-x-auto no-scrollbar py-space-2xs px-space-xs">
            <div className="flex items-center gap-space-2xs shrink-0">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">S&P 500</span>
              <span className="font-metric-sm text-metric-sm text-secondary flex items-center">
                <span className="material-symbols-outlined text-[12px]">arrow_drop_up</span>+0.42%
              </span>
            </div>
            <span className="w-[1px] h-3 bg-surface-container-highest shrink-0"></span>
            <div className="flex items-center gap-space-2xs shrink-0">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">NASDAQ</span>
              <span className="font-metric-sm text-metric-sm text-secondary flex items-center">
                <span className="material-symbols-outlined text-[12px]">arrow_drop_up</span>+0.71%
              </span>
            </div>
            <span className="w-[1px] h-3 bg-surface-container-highest shrink-0"></span>
            <div className="flex items-center gap-space-2xs shrink-0">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Tech Sector</span>
              <span className="font-metric-sm text-metric-sm text-secondary flex items-center">
                <span className="material-symbols-outlined text-[12px]">arrow_drop_up</span>+0.58%
              </span>
            </div>
            <span className="w-[1px] h-3 bg-surface-container-highest shrink-0"></span>
            <div className="flex items-center gap-space-2xs shrink-0">
              <span className="font-label-caps text-label-caps text-primary uppercase font-bold">AAPL</span>
              <span className="font-metric-sm text-metric-sm text-secondary flex items-center font-bold">
                <span className="material-symbols-outlined text-[12px]">arrow_drop_up</span>+1.42%
              </span>
            </div>
          </div>
        </section>

        {/* STOCK HEADER & RAPID TICKER SWITCH */}
        <section className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl shadow-md border border-outline-variant/30">
          <div className="flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-space-2xs">
              {tickers.map((ticker) => (
                <button
                  key={ticker}
                  onClick={() => setSelectedTicker(ticker)}
                  className={`px-space-sm py-space-2xs rounded font-label-caps text-label-caps tracking-wider transition-colors ${
                    selectedTicker === ticker
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  {ticker}
                </button>
              ))}
            </div>
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest shrink-0">
              EQ·NASDAQ
            </span>
          </div>

          <div className="flex items-start justify-between gap-space-sm pt-space-xs">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <h1 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                  {selectedTicker}
                </h1>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Apple Inc.</span>
              </div>
              <p className="font-metric-sm text-metric-sm text-outline mt-space-2xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                Closed · Sep 23, 2026 · 4:00 PM EST
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <div className="font-metric-display-mobile text-metric-display-mobile text-on-surface font-semibold tracking-tight leading-none">
                $245.18
              </div>
              <div className="flex items-center gap-1 mt-space-2xs px-space-xs py-0.5 rounded bg-secondary/10 text-secondary">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span className="font-metric-sm text-metric-sm font-semibold">+$3.42 (+1.42%)</span>
              </div>
            </div>
          </div>
        </section>

        {/* HERO CARD: NEXT TRADING DAY FORECAST */}
        <section className="flex flex-col gap-space-md bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low p-space-md rounded-xl shadow-xl relative overflow-hidden border border-outline-variant/30">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center justify-between gap-space-sm z-10">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">auto_graph</span>
              <span className="font-label-caps text-label-caps tracking-widest uppercase text-primary font-bold">
                NEXT TRADING DAY FORECAST
              </span>
            </div>
            <span className="font-metric-sm text-metric-sm text-on-surface-variant">Sep 23, 2026 · 4:05 PM</span>
          </div>

          {/* MAIN CONVERGENCE VALUES */}
          <div className="flex items-baseline justify-between gap-space-sm z-10 pt-space-2xs">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                Target Projected Close
              </span>
              <div className="flex items-center gap-space-xs mt-space-2xs">
                <span className="font-metric-display text-metric-display text-primary font-bold tracking-tight leading-none">
                  $247.63
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                Expected Movement
              </span>
              <div className="flex items-center gap-1 mt-space-2xs text-secondary font-metric-lg text-metric-lg font-semibold">
                <span className="material-symbols-outlined text-[16px]">north_east</span>
                <span>+1.00%</span>
                <span className="text-on-surface-variant font-body-sm text-body-sm">(+$2.45)</span>
              </div>
            </div>
          </div>

          {/* EMPIRICAL GAUGING RANGE */}
          <div className="flex flex-col gap-space-xs z-10 bg-surface-container-lowest/80 p-space-sm rounded-lg backdrop-blur-sm shadow-inner">
            <div className="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant">
              <span>LOWER BOUND (P10)</span>
              <span className="text-primary font-bold">EMPIRICAL RANGE DENSITY</span>
              <span>UPPER BOUND (P90)</span>
            </div>
            <div className="relative w-full h-8 flex items-center justify-between px-space-2xs">
              <div className="absolute left-0 right-0 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="absolute left-[15%] right-[10%] h-full bg-primary/40 rounded-full"></div>
              </div>
              <div className="absolute left-[35%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-on-surface shadow-sm"></div>
                <span className="font-metric-sm text-metric-sm text-outline mt-3 leading-none">$245.18</span>
              </div>
              <div className="absolute left-[62%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></div>
                </div>
                <span className="font-metric-sm text-metric-sm text-primary font-bold mt-2 leading-none">$247.63</span>
              </div>
              <span className="font-metric-sm text-metric-sm text-outline-variant z-10">$243.90</span>
              <span className="font-metric-sm text-metric-sm text-outline-variant z-10">$251.20</span>
            </div>
            <div className="flex items-center justify-between text-outline text-[10px] font-metric-sm pt-space-xs">
              <span>Current: $245.18</span>
              <span>Interval Width: $7.30 (2.98%)</span>
            </div>
          </div>

          <div className="flex items-start gap-space-xs z-10">
            <span className="material-symbols-outlined text-outline text-[14px] shrink-0 mt-0.5">verified_user</span>
            <p className="font-metric-sm text-metric-sm text-outline leading-tight">
              Empirical forecast interval calibrated from historical out-of-sample error distribution.
            </p>
          </div>
        </section>

        {/* HISTORICAL FORECAST VALIDATION AUDIT CARD */}
        <section className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-md border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">
              HISTORICAL VALIDATION (30 SESSIONS)
            </span>
            <span className="font-metric-sm text-metric-sm text-secondary font-semibold">98.4% AUDITED</span>
          </div>

          <div className="grid grid-cols-2 gap-space-xs">
            <div className="bg-surface-container-low p-space-xs rounded flex flex-col">
              <span className="font-label-caps text-label-caps text-outline">DIRECTION CORRECT</span>
              <span className="font-metric-lg text-metric-lg text-secondary font-semibold mt-1">63.3%</span>
              <span className="text-[10px] text-outline font-metric-sm">19 of 30 sessions</span>
            </div>
            <div className="bg-surface-container-low p-space-xs rounded flex flex-col">
              <span className="font-label-caps text-label-caps text-outline">MAE</span>
              <span className="font-metric-lg text-metric-lg text-on-surface font-semibold mt-1">$2.18</span>
              <span className="text-[10px] text-outline font-metric-sm">Avg divergence</span>
            </div>
            <div className="bg-surface-container-low p-space-xs rounded flex flex-col">
              <span className="font-label-caps text-label-caps text-outline">MAPE</span>
              <span className="font-metric-lg text-metric-lg text-on-surface font-semibold mt-1">0.91%</span>
              <span className="text-[10px] text-outline font-metric-sm">Mean % error</span>
            </div>
            <div className="bg-surface-container-low p-space-xs rounded flex flex-col">
              <span className="font-label-caps text-label-caps text-outline">IN RANGE (2σ)</span>
              <span className="font-metric-lg text-metric-lg text-secondary font-semibold mt-1">71.0%</span>
              <span className="text-[10px] text-outline font-metric-sm">Corridor hits</span>
            </div>
          </div>

          <Link
            to="/m/forecast"
            className="w-full flex items-center justify-center gap-1.5 py-2 mt-2 bg-surface-container-high hover:bg-surface-container-highest rounded text-primary font-headline-sm text-headline-sm font-semibold transition-colors"
          >
            <span>Inspect Forecast Drivers</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </section>

        {/* Disclaimer */}
        <div className="mt-space-md mb-space-sm px-space-xs text-center">
          <p className="font-metric-sm text-metric-sm text-outline-variant leading-relaxed max-w-sm mx-auto">
            FOR RESEARCH & SIMULATION ONLY · NOT FINANCIAL ADVICE · PAST METRIC DRIFT DOES NOT GUARANTEE ALPHA
          </p>
        </div>
      </main>

      <MobileDock />
    </div>
  );
}
