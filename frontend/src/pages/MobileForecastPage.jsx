import React from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Logo from '../components/brand/Logo';
import MobileDock from '../components/navigation/MobileDock';

export default function MobileForecastPage() {
  const factors = [
    {
      name: 'Price Momentum',
      badge: 'STRONG',
      badgeClass: 'bg-secondary-container/20 text-secondary',
      desc: '90-day relative strength & recent breakout persistence above 20-day EMA.',
      val: '+0.42σ',
      valClass: 'text-secondary',
      icon: 'speed',
    },
    {
      name: 'Recent Volatility',
      badge: 'MODERATE',
      badgeClass: 'bg-surface-container-highest text-on-surface-variant',
      desc: 'ATR 2.14, implied historical volatility compression indicating controlled price discovery.',
      val: 'NORMAL',
      valClass: 'text-on-surface-variant',
      icon: 'waves',
    },
    {
      name: 'Trading Volume',
      badge: 'STRONG',
      badgeClass: 'bg-secondary-container/20 text-secondary',
      desc: '1.28x 30-day average volume on up days; consistent accumulation tape.',
      val: '1.28x',
      valClass: 'text-secondary',
      icon: 'bar_chart',
    },
    {
      name: 'Technical Oscillators',
      badge: 'NEUTRAL',
      badgeClass: 'bg-surface-container-highest text-on-surface-variant',
      desc: 'RSI (14) at 58.4; Stochastic %K crossing %D without overbought extreme.',
      val: '58.4',
      valClass: 'text-on-surface-variant',
      icon: 'query_stats',
    },
    {
      name: 'Macro Corroboration',
      badge: 'POSITIVE',
      badgeClass: 'bg-secondary-container/20 text-secondary',
      desc: '10Y Yield stabilizing at 3.74% with concurrent S&P 500 drift +0.42%.',
      val: '+0.71%',
      valClass: 'text-secondary',
      icon: 'hub',
    },
  ];

  useGSAP(() => {
    gsap.to('#text', {
      ease: 'power1.inOut',
      opacity: 1,
      y: 0,
      duration: 1
    });

    gsap.fromTo(
      '.para',
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        stagger: 0.1
      }
    );
  }, []);

  return (
    <div className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen pb-20">
      {/* Mobile Top Header */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
        <div className="h-20 px-space-md flex flex-col justify-center gap-space-xs">
          <div className="flex items-center justify-between gap-space-sm">
            <Link to="/" className="flex items-center gap-space-xs">
              <Logo className="h-8 w-8" showText={false} />
              <div className="flex flex-col">
                <span id="text" className="opacity-0 translate-y-10 font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface leading-tight">
                  StockTrend AI
                </span>
                <span className="font-label-caps text-label-caps uppercase text-primary font-medium tracking-wider">
                  Forecast & Drivers
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
        {/* Asset Header & Context Card */}
        <section className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm shadow-md border border-outline-variant/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-headline-sm font-bold">
                AAPL
              </div>
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold">AAPL</span>
                  <span className="bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps px-space-xs py-space-2xs rounded">
                    NASDAQ
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant para">Apple Inc. · Consumer Tech</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Calibration Grade</span>
              <span className="font-metric-sm text-metric-sm text-secondary flex items-center gap-space-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                PASS · 98.4% Out-of-Sample
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-lg p-space-sm flex items-center justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-outline uppercase block">Current Market Close</span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-metric-lg text-metric-lg text-on-surface font-semibold">$245.18</span>
                <span className="font-metric-sm text-metric-sm text-secondary">+$3.42 (+1.42%)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-label-caps text-label-caps text-outline uppercase block">Forecast Generated</span>
              <span className="font-metric-sm text-metric-sm text-on-surface-variant">Sep 23, 2026 · 4:05 PM EDT</span>
            </div>
          </div>
        </section>

        {/* Next-Day Target Summary Hero Banner */}
        <section className="bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md relative overflow-hidden border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider">
                Next Trading Day Projection
              </span>
            </div>
            <span className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps px-space-sm py-space-2xs rounded-full font-semibold">
              Moderate Bullish Bias
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase mb-space-2xs">
                Predicted Price Median
              </span>
              <span className="font-metric-display-mobile text-metric-display-mobile text-on-surface font-semibold tracking-tight">
                $247.63
              </span>
              <span className="font-metric-sm text-metric-sm text-secondary mt-space-2xs flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +$2.45 (+1.00%)
              </span>
            </div>
            <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col justify-between">
              <div>
                <span className="font-label-caps text-label-caps text-outline uppercase mb-space-2xs">
                  Target Dispersion
                </span>
                <span className="font-metric-lg text-metric-lg text-primary-container font-medium">±$3.65</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Validated 1D Horizon</span>
              </div>
            </div>
          </div>
        </section>

        {/* Expected Forecast Range & Uncertainty Distribution Card */}
        <section className="bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold para">
                Empirical Uncertainty Bounds
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant para">Out-of-sample error distribution</p>
            </div>
            <span className="bg-surface-container-high px-space-sm py-space-2xs rounded font-metric-sm text-metric-sm text-on-surface">
              $243.90 — $251.20
            </span>
          </div>

          {/* Statistical Bell Distribution SVG Graphic */}
          <div className="bg-surface-container-lowest rounded-lg p-space-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between font-label-caps text-label-caps text-outline px-space-xs">
              <span>-2σ Lower: $243.90</span>
              <span className="text-primary font-semibold">Median: $247.63</span>
              <span>+2σ Upper: $251.20</span>
            </div>
            <div className="w-full h-32 flex items-center justify-center relative">
              <svg className="w-full h-full text-on-surface" preserveAspectRatio="none" viewBox="0 0 340 120">
                <defs>
                  <linearGradient id="sigmaTwoGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02"></stop>
                  </linearGradient>
                  <linearGradient id="sigmaOneGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55"></stop>
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 20 110 C 60 108, 90 95, 110 60 C 130 25, 150 12, 170 12 C 190 12, 210 25, 230 60 C 250 95, 280 108, 320 110 Z"
                  fill="url(#sigmaTwoGrad)"
                ></path>
                <path
                  d="M 105 110 L 105 68 C 120 40, 145 12, 170 12 C 195 12, 220 40, 235 68 L 235 110 Z"
                  fill="url(#sigmaOneGrad)"
                ></path>
                <line stroke="#3e484f" strokeWidth="1" x1="10" x2="330" y1="110" y2="110"></line>
                <line stroke="#87929a" strokeDasharray="2 2" strokeWidth="1.5" x1="50" x2="50" y1="110" y2="100"></line>
                <line stroke="#38bdf8" strokeDasharray="2 2" strokeWidth="1.5" x1="105" x2="105" y1="110" y2="68"></line>
                <line stroke="#8ed5ff" strokeWidth="2" x1="170" x2="170" y1="110" y2="10"></line>
                <line stroke="#38bdf8" strokeDasharray="2 2" strokeWidth="1.5" x1="235" x2="235" y1="110" y2="68"></line>
                <line stroke="#87929a" strokeDasharray="2 2" strokeWidth="1.5" x1="290" x2="290" y1="110" y2="100"></line>
                <path
                  d="M 15 110 C 55 108, 85 95, 110 60 C 130 25, 150 12, 170 12 C 190 12, 210 25, 230 60 C 255 95, 285 108, 325 110"
                  fill="none"
                  stroke="#7bd0ff"
                  strokeWidth="2.5"
                ></path>
                <circle cx="170" cy="12" fill="#c4e7ff" r="4.5"></circle>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-space-xs font-metric-sm text-metric-sm text-on-surface-variant pt-space-xs">
              <div className="flex items-center gap-space-xs bg-surface-container-high p-space-xs rounded">
                <span className="w-2.5 h-2.5 bg-primary-container rounded-sm"></span>
                <span>1-Sigma (68%): <strong className="text-on-surface">$245.20 — $249.80</strong></span>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container-high p-space-xs rounded">
                <span className="w-2.5 h-2.5 bg-primary-fixed-dim/40 rounded-sm"></span>
                <span>2-Sigma (95%): <strong className="text-on-surface">$243.90 — $251.20</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Scenario Analysis & Downside Risk */}
        <section className="bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Scenario Analysis & Downside Risk
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Validated asymmetric price paths</p>
            </div>
            <span className="material-symbols-outlined text-outline">tune</span>
          </div>

          <div className="flex flex-col gap-space-xs">
            <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-space-sm">
                <div className="w-2 h-8 rounded-full bg-secondary-container"></div>
                <div>
                  <span className="font-label-caps text-label-caps text-outline uppercase block">
                    Upper Deviation Boundary
                  </span>
                  <span className="font-body-md text-body-md font-medium text-on-surface">
                    Bullish Breakout Expansion
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-metric-md text-metric-md text-on-surface font-semibold block">$251.20</span>
                <span className="font-metric-sm text-metric-sm text-secondary font-medium">+2.45%</span>
              </div>
            </div>

            <div className="bg-surface-container-high rounded-lg p-space-sm flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-2 h-8 rounded-full bg-primary-container"></div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-caps text-label-caps text-primary uppercase block">
                      Base Case Projection
                    </span>
                    <span className="bg-primary/20 text-primary font-label-caps text-[9px] px-1 rounded">MODAL</span>
                  </div>
                  <span className="font-body-md text-body-md font-medium text-on-surface">
                    Trend Continuation (Primary)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-metric-md text-metric-md text-on-surface font-semibold block">$247.63</span>
                <span className="font-metric-sm text-metric-sm text-secondary font-medium">+1.00%</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-space-sm">
                <div className="w-2 h-8 rounded-full bg-tertiary-container"></div>
                <div>
                  <span className="font-label-caps text-label-caps text-outline uppercase block">
                    Lower Deviation Boundary
                  </span>
                  <span className="font-body-md text-body-md font-medium text-on-surface">
                    Intraday Support Test
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-metric-md text-metric-md text-on-surface font-semibold block">$243.90</span>
                <span className="font-metric-sm text-metric-sm text-tertiary font-medium">-0.52%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interpretable Forecast Drivers */}
        <section className="bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-md border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Forecast Market Drivers
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Interpretable attribution factor matrix</p>
            </div>
            <div className="flex items-center gap-space-2xs text-outline font-label-caps text-label-caps">
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span>5 FACTORS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-space-xs">
            {factors.map((f) => (
              <div key={f.name} className="bg-surface-container-low rounded-lg p-space-sm flex items-start justify-between">
                <div className="flex gap-space-sm">
                  <div className="p-2 rounded bg-surface-container-high text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-xs">
                      <span className="font-headline-sm text-headline-sm text-on-surface">{f.name}</span>
                      <span className={`font-label-caps text-label-caps px-space-xs py-space-2xs rounded ${f.badgeClass}`}>
                        {f.badge}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{f.desc}</p>
                  </div>
                </div>
                <span className={`font-metric-sm text-metric-sm font-semibold shrink-0 ml-2 ${f.valClass}`}>
                  {f.val}
                </span>
              </div>
            ))}
          </div>
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
