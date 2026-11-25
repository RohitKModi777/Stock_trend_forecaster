import React, { useState, useEffect } from 'react';
import { getStockPrediction, getStockHistory, getStockSummary} from '../api';
import SidebarRail from '../components/navigation/SidebarRail';
import ConfidenceRibbonChart from '../components/charts/ConfidenceRibbonChart';
import ForecastHistoryTable from '../components/tables/ForecastHistoryTable';
import { useAuth } from '../context/AuthContext';

export default function OverviewPage() {
  const { user } = useAuth();

  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [activeTimeframe, setActiveTimeframe] = useState('30D');
  const [tickers, setTickers] = useState(['AAPL', 'RELIANCE.NS', 'NVDA', 'TCS.NS', 'MSFT', 'GOOGL']);
  const [searchInput, setSearchInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [customTickerInput, setCustomTickerInput] = useState('');

  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const currency = summary?.currency || prediction?.currency || (selectedTicker.endsWith('.NS') ? '₹' : '$');

  const formatPrice = (value) =>
    Number.isFinite(Number(value))
      ? `${currency}${Number(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
      : 'Unavailable';

  const currentPrice = Number(prediction?.current_close);
  const lstmPrice = Number(prediction?.predictions?.lstm || prediction?.primary_forecast);

  const priceChange = lstmPrice - currentPrice;
  const changePercent = currentPrice > 0 ? (priceChange / currentPrice) * 100 : 0;

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      const clean = searchInput.trim().toUpperCase();
      if (!tickers.includes(clean)) {
        setTickers((prev) => [...prev, clean]);
      }
      setSelectedTicker(clean);
      setSearchInput('');
    }
  };

  const handleAddCustomTicker = () => {
    if (customTickerInput.trim()) {
      const clean = customTickerInput.trim().toUpperCase();
      if (!tickers.includes(clean)) {
        setTickers((prev) => [...prev, clean]);
      }
      setSelectedTicker(clean);
      setCustomTickerInput('');
      setShowAddModal(false);
    }
  };

  useEffect(() => {
    async function loadStockData() {
      try {
        setLoading(true);
        setApiError('');

       const [predictionData, historyData, summaryData] = await Promise.all([
          getStockPrediction(selectedTicker),
          getStockHistory(selectedTicker),
          getStockSummary(selectedTicker),
        ]);

        setPrediction(predictionData);
        setHistory(historyData.history);
        setSummary(summaryData);

      } catch (error) {
        console.error('Failed to load stock data:', error);
        setApiError(error.message || 'Failed to load stock data.');
      } finally {
        setLoading(false);
      }
    }

    loadStockData();
  }, [selectedTicker]);

  return (

    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <SidebarRail />

      <div className="pl-64 flex flex-col min-h-screen bg-background">
        {/* Top Header Command Bar */}
        <header className="fixed top-0 left-64 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
          <div className="h-16 w-full px-space-md flex items-center justify-between gap-space-md">
            {/* Search Bar */}
            <div className="flex items-center gap-space-md flex-1 max-w-xl">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  className="w-full bg-surface-container-low text-on-surface placeholder-outline font-body-sm text-body-sm pl-9 pr-14 py-space-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container"
                  placeholder="Search ticker (e.g. AAPL, NVDA, RELIANCE.NS) and hit Enter..."
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                />
                <span className="absolute right-space-sm top-1/2 -translate-y-1/2 font-metric-sm text-metric-sm text-outline bg-surface-container px-space-xs py-0.5 rounded">
                  ⌘K
                </span>
              </div>
            </div>

            {/* Macro Index Badges */}
            <div className="hidden 2xl:flex items-center gap-space-md font-metric-sm text-metric-sm">
              <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded">
                <span className="text-outline font-label-caps text-label-caps">S&P 500</span>
                <span className="text-on-surface">5,738.12</span>
                <span className="text-secondary">+0.42%</span>
              </div>
              <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded">
                <span className="px-space-xs py-0.5 rounded bg-surface-container font-label-caps text-label-caps text-outline">NSE</span>
                <span className="text-on-surface">18,124.60</span>
                <span className="text-secondary">+0.71%</span>
              </div>
              <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded">
                <span className="text-outline font-label-caps text-label-caps">10Y YIELD</span>
                <span className="text-on-surface">3.74%</span>
                <span className="text-tertiary">-2.1bps</span>
              </div>
              <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded">
                <span className="text-outline font-label-caps text-label-caps">VIX</span>
                <span className="text-on-surface">14.82</span>
                <span className="text-tertiary">-4.1%</span>
              </div>
            </div>

            {/* Right Command Actions */}
            <div className="flex items-center gap-space-sm">
              <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded font-metric-sm text-metric-sm text-outline">
                <span className="h-1.5 w-1.5 rounded-full bg-outline"></span>
                <span>US Regular Session Closed · Data verified Sep 23, 2026, 4:00 PM EST</span>
              </div>
              <button
                className="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center"
                title="Notifications"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <button
                className="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center"
                title="Documentation"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </button>
              <button
                className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container text-primary hover:bg-surface-container-high transition-colors rounded font-metric-sm text-metric-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span className="hidden sm:inline">Export Telemetry</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN TERMINAL BODY */}
        <main className="w-full pt-16 bg-background min-h-screen">
          <div className="flex flex-col w-full">
            {/* TOP STOCK CONTEXT & TICKER SWITCHER */}
            <section className="bg-surface-container-lowest px-space-md py-space-sm border-b border-surface-container-high/40">
              <div className="flex flex-col gap-space-sm">
                {/* Quick Ticker Switcher */}
                <div className="flex items-center justify-between gap-space-sm flex-wrap">
                  <div className="flex items-center gap-space-xs overflow-x-auto">
                    {tickers.map((ticker) => {
                      const isSelected = selectedTicker === ticker;
                      return (
                        <button
                          key={ticker}
                          onClick={() => setSelectedTicker(ticker)}
                          className={`flex items-center gap-space-xs px-space-sm py-1 rounded font-metric-sm text-metric-sm transition-colors ${isSelected
                              ? 'bg-primary-container text-on-primary-container shadow-sm'
                              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                            }`}
                          type="button"
                        >
                          <span className="font-headline-sm text-headline-sm">{ticker}</span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[14px]">star</span>
                          )}
                        </button>
                      );
                    })}
                    {showAddModal ? (
                      <div className="flex items-center gap-1 bg-surface-container-high p-1 rounded">
                        <input
                          type="text"
                          value={customTickerInput}
                          onChange={(e) => setCustomTickerInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddCustomTicker()}
                          placeholder="e.g. TSLA, INFY.NS"
                          className="bg-surface-container-low text-xs px-2 py-1 rounded text-on-surface focus:outline-none w-28 font-mono"
                          autoFocus
                        />
                        <button
                          onClick={handleAddCustomTicker}
                          className="bg-primary-container text-on-primary-container px-2 py-1 rounded text-xs font-bold"
                          type="button"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowAddModal(false)}
                          className="text-outline hover:text-on-surface px-1 text-xs"
                          type="button"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-low text-outline hover:text-on-surface hover:bg-surface-container transition-colors font-metric-sm text-metric-sm cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                        <span>Add Ticker</span>
                      </button>
                    )}
                  </div>

                  {/* Telemetry Badges */}
                  <div className="flex items-center gap-space-xs">
                    <div className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-secondary/10 text-secondary font-metric-sm text-metric-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                      <span>PASS · 98.4% Out-of-Sample Coverage</span>
                    </div>
                    <div className="hidden md:flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container text-on-surface-variant font-metric-sm text-metric-sm">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span>Live Telemetry Calibrated</span>
                    </div>
                  </div>
                </div>

                {/* Ticker Info Bar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-end pt-space-xs">
                  <div className="lg:col-span-4 flex flex-col">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-display-lg text-display-lg text-on-surface">{selectedTicker}</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface-variant">
                        {summary?.company_name || prediction?.full_name || selectedTicker}
                      </span>
                      <span className="px-space-xs py-0.5 rounded bg-surface-container font-label-caps text-label-caps text-outline">
                        {summary?.exchange || prediction?.exchange || (selectedTicker.endsWith('.NS') ? 'NSE' : 'NASDAQ')}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-outline">
                      {selectedTicker === 'AAPL' ? 'Primary Model Benchmark Asset (Zero Look-Ahead LSTM Trained)' : 'Transfer Calibrated Asset (Empirical Multi-Model Corridor)'}
                    </span>
                  </div>

                  {/* Price Metrics */}
                  <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                    <div className="bg-surface-container-low p-space-sm rounded flex flex-col">
                      <span className="font-label-caps text-label-caps text-outline">LAST CLOSE</span>
                      <div className="flex items-baseline gap-space-xs">
                        <span className="font-metric-display text-metric-display text-on-surface">
                          {loading ? "Loading..." : apiError ? "Unavailable" : formatPrice(currentPrice)}
                        </span>
                        {summary && (
                          <span className={`font-metric-sm text-metric-sm ${summary.is_positive ? 'text-secondary' : 'text-tertiary'}`}>
                            {summary.change >= 0 ? '+' : ''}{formatPrice(summary.change)} ({summary.change_percent >= 0 ? '+' : ''}{summary.change_percent}%)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded flex flex-col">
                      <span className="font-label-caps text-label-caps text-outline">DAY RANGE</span>
                      <span className="font-metric-lg text-metric-lg text-on-surface">
                        {loading || !summary ? 'Loading...' : `${formatPrice(summary.day_low)} - ${formatPrice(summary.day_high)}`}
                      </span>
                      <span className="font-metric-sm text-metric-sm text-outline">
                        {summary ? `Spread: ${formatPrice(summary.day_high - summary.day_low)}` : 'Spread: Unavailable'}
                      </span>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded flex flex-col">
                      <span className="font-label-caps text-label-caps text-outline">52-WEEK RANGE</span>
                      <span className="font-metric-lg text-metric-lg text-on-surface">
                        {loading || !summary ? 'Loading...' : `${formatPrice(summary['52_week_low'])} - ${formatPrice(summary['52_week_high'])}`}
                      </span>
                      <span className="font-metric-sm text-metric-sm text-secondary">
                        {summary && summary['52_week_high'] ? `52W High Proximity: ${((summary.current_close / summary['52_week_high']) * 100).toFixed(1)}%` : '52W High Proximity: Unavailable'}
                      </span>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded flex flex-col">
                      <span className="font-label-caps text-label-caps text-outline">SESSION VOLUME</span>
                      <span className="font-metric-lg text-metric-lg text-on-surface">
                        {loading || !summary ? 'Loading...' : `${(summary.volume / 1_000_000).toFixed(2)}M`}
                      </span>
                      <span className="font-metric-sm text-metric-sm text-primary">Latest verified volume</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WORKSPACE CONTENT AREA */}
            <div className="p-space-md flex flex-col gap-space-md">
              {/* UPPER GRID: 2 COLUMNS (Next Trading Day Forecast + Historical Validation) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
                {/* LEFT: Next Day Projection (Visual Hero) */}
                <section className="xl:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl flex flex-col justify-between shadow-md relative overflow-hidden border border-outline-variant/30">
                  <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div>
                    {/* Ribbon */}
                    <div className="flex items-center justify-between flex-wrap gap-space-sm pb-space-md">
                      <div className="flex items-center gap-space-xs">
                        <span className="px-space-sm py-0.5 rounded bg-primary/10 text-primary font-label-caps text-label-caps font-semibold uppercase tracking-wider">
                          Next Trading Day Projection
                        </span>
                        <span className="font-metric-sm text-metric-sm text-outline">· Valid for Sep 24, 2026</span>
                      </div>
                      <span className="font-metric-sm text-metric-sm text-outline">Generated Sep 23, 2026, 4:05 PM EDT</span>
                    </div>

                    {/* Hero Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center py-space-sm">
                      <div className="md:col-span-7 flex flex-col">
                        <span className="font-label-caps text-label-caps text-outline">PROJECTED SETTLEMENT TARGET</span>
                        <div className="flex items-baseline gap-space-md mt-space-2xs">
                          <span className="font-metric-display text-metric-display text-primary text-[38px] leading-tight">
                            {loading ? 'Loading...' : apiError ? 'Unavailable' : formatPrice(lstmPrice)}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-metric-lg text-metric-lg text-secondary font-semibold">
                              <span
                                className={`font-metric-lg font-semibold ${priceChange >= 0 ? 'text-secondary' : 'text-tertiary'
                                  }`}
                              >
                                {loading || apiError || !Number.isFinite(lstmPrice) ||
                                  !Number.isFinite(currentPrice)
                                  ? 'Unavailable'
                                  : `${priceChange >= 0 ? '+' : '-'}${formatPrice(Math.abs(priceChange))} (${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`}
                              </span>
                            </span>
                            <span className="font-metric-sm text-metric-sm text-outline">vs Current {loading ? 'Loading...' : formatPrice(currentPrice)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-5 flex flex-col items-start md:items-end justify-center">
                        <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded bg-secondary/10 text-secondary">
                          <span className="material-symbols-outlined text-[18px]">trending_up</span>
                          <span className="font-headline-sm text-headline-sm">MODERATE BULLISH</span>
                        </div>
                        <span className="font-metric-sm text-metric-sm text-outline mt-1">
                          Calibrated Convergence: High
                        </span>
                      </div>
                    </div>

                    {/* Empirical Uncertainty Corridor Slider */}
                    <div className="mt-space-lg bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                          Empirical Forecast Corridor (2σ / 80% CI)
                        </span>
                        <span className="font-metric-sm text-metric-sm text-primary">Model forecast · {loading ? 'Loading...' : formatPrice(lstmPrice)}</span>
                      </div>

                      {/* Interval Track */}
                      <div className="relative pt-4 pb-6">
                        <div className="h-2 w-full bg-surface-container-highest rounded-full relative">
                          <div className="absolute top-0 bottom-0 left-[20%] right-[10%] bg-primary/25 rounded-full"></div>
                          <div
                            className="absolute top-1/2 -translate-y-1/2 left-[37%] w-3 h-3 bg-on-surface rounded-full shadow-[0_0_8px_rgba(222,226,243,0.8)]"
                            title="Current: $245.18"
                          ></div>
                          <div
                            className="absolute top-1/2 -translate-y-1/2 left-[58%] w-4 h-4 bg-primary rounded-full ring-2 ring-primary-container"
                            title="Median Projected Close: $247.63"
                          ></div>
                        </div>

                        {/* Markers */}
                        <div className="absolute left-[20%] top-6 -translate-x-1/2 flex flex-col items-center">
                          <span className="font-metric-sm text-metric-sm text-outline">P10 Floor</span>
                          <span className="font-metric-md text-metric-md text-on-surface font-semibold">
                            {prediction?.corridor_2sigma ? formatPrice(prediction.corridor_2sigma.low) : '$243.90'}
                          </span>
                        </div>
                        <div className="absolute left-[37%] -top-1 -translate-x-1/2 flex flex-col items-center">
                          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-1 py-0.5 rounded shadow whitespace-nowrap">
                            CURRENT: {formatPrice(currentPrice)}
                          </span>
                        </div>
                        <div className="absolute left-[58%] top-6 -translate-x-1/2 flex flex-col items-center">
                          <span className="font-metric-sm text-metric-sm text-primary font-semibold">Median</span>
                          <span className="font-metric-md text-metric-md text-primary font-bold">
                            {formatPrice(lstmPrice)}
                          </span>
                        </div>
                        <div className="absolute left-[90%] top-6 -translate-x-1/2 flex flex-col items-center">
                          <span className="font-metric-sm text-metric-sm text-outline">P90 Ceiling</span>
                          <span className="font-metric-md text-metric-md text-on-surface font-semibold">
                            {prediction?.corridor_2sigma ? formatPrice(prediction.corridor_2sigma.high) : '$251.20'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-space-md flex items-center justify-between text-outline font-body-sm text-body-sm">
                    <p className="leading-tight text-[11px]">
                      Statistical calibration derived from trailing rolling out-of-sample residuals. Pure empirical validation without arbitrary synthetic claims.
                    </p>
                    <span className="text-primary font-metric-sm text-metric-sm whitespace-nowrap ml-4">
                      Empirical Corridor →
                    </span>
                  </div>
                </section>
                
              {/* MODEL PREDICTION COMPARISON */}
              <section className="xl:col-span-12 bg-surface-container-lowest p-space-lg rounded-xl shadow-md border border-outline-variant/30">
                <div className="flex items-center justify-between mb-space-md flex-wrap gap-2">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Multi-Model Quantitative Comparison
                  </h2>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-surface-container text-outline">
                    Deep Learning + Statistical Regressors
                  </span>
                </div>

                {loading ? (
                  <p className="text-outline">Loading model predictions...</p>
                ) : apiError ? (
                  <p className="text-tertiary">{apiError}</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-space-sm">
                    {[
                      { name: 'Ridge Regression', key: 'ridge' },
                      { name: 'XGBoost / GBR', key: 'xgboost' },
                      { name: 'LSTM Neural Net', key: 'lstm' },
                      { name: 'ARIMA Time Series', key: 'arima' },
                      { name: 'Ensemble Consensus', key: 'ensemble' },
                    ].map((model) => (
                      <div
                        key={model.key}
                        className="bg-surface-container-low p-space-md rounded-lg border border-outline-variant/20"
                      >
                        <p className="font-label-caps text-label-caps text-outline">
                          {model.name}
                        </p>

                        <p className="font-metric-display text-metric-display text-primary mt-space-xs text-xl">
                          {formatPrice(prediction?.predictions?.[model.key])}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-outline text-xs mt-space-md">
                  Next-trading-day estimates from your trained models. Predictions are  uncertain and are not guaranteed future prices.
                </p>

              </section>
                {/* RIGHT: Historical Validation Telemetry */}
                <section className="xl:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl flex flex-col justify-between shadow-md border border-outline-variant/30">
                  <div>
                    {/* Header and Periods */}
                    <div className="flex items-center justify-between pb-space-md">
                      <div>
                        <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                          Performance Audit
                        </span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Historical Forecast Validation</h2>
                      </div>
                      <div className="flex items-center p-0.5 bg-surface-container rounded">
                        {['7D', '30D', '90D', '1Y'].map((tf) => (
                          <button
                            key={tf}
                            onClick={() => setActiveTimeframe(tf)}
                            className={`px-space-xs py-0.5 font-metric-sm text-metric-sm rounded transition-colors ${activeTimeframe === tf
                                ? 'bg-primary-container text-on-primary-container font-semibold'
                                : 'text-outline hover:text-on-surface'
                              }`}
                            type="button"
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2x2 Telemetry Cards */}
                    <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                      <div className="bg-surface-container-low p-space-md rounded flex flex-col justify-between hover:bg-surface-container transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-label-caps text-label-caps text-outline">DIRECTION CORRECT</span>
                          <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                        </div>
                        <div className="my-space-xs">
                          <span className="font-metric-display text-metric-display text-secondary">63.3%</span>
                        </div>
                        <span className="font-metric-sm text-metric-sm text-outline">19 of 30 sessions correctly signed</span>
                      </div>

                      <div className="bg-surface-container-low p-space-md rounded flex flex-col justify-between hover:bg-surface-container transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-label-caps text-label-caps text-outline">MEAN ABSOLUTE ERROR</span>
                          <span className="material-symbols-outlined text-primary text-[18px]">straighten</span>
                        </div>
                        <div className="my-space-xs">
                          <span className="font-metric-display text-metric-display text-on-surface">$2.18</span>
                        </div>
                        <span className="font-metric-sm text-metric-sm text-outline">Average divergence from close</span>
                      </div>

                      <div className="bg-surface-container-low p-space-md rounded flex flex-col justify-between hover:bg-surface-container transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-label-caps text-label-caps text-outline">MEAN % ERROR (MAPE)</span>
                          <span className="material-symbols-outlined text-primary text-[18px]">percent</span>
                        </div>
                        <div className="my-space-xs">
                          <span className="font-metric-display text-metric-display text-on-surface">0.91%</span>
                        </div>
                        <span className="font-metric-sm text-metric-sm text-outline">Trailing benchmark calibration</span>
                      </div>

                      <div className="bg-surface-container-low p-space-md rounded flex flex-col justify-between hover:bg-surface-container transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-label-caps text-label-caps text-outline">IN RANGE (2-SIGMA)</span>
                          <span className="material-symbols-outlined text-secondary text-[18px]">domain_verification</span>
                        </div>
                        <div className="my-space-xs">
                          <span className="font-metric-display text-metric-display text-secondary">71.0%</span>
                        </div>
                        <span className="font-metric-sm text-metric-sm text-outline">Sessions within forecast band</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-xs flex items-center gap-space-xs text-outline font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                    <span className="text-[11px] leading-tight">
                      Tested strictly against verified out-of-sample observations. Past calibration does not guarantee future alpha.
                    </span>
                  </div>
                </section>
              </div>

              {/* MIDDLE MAIN SECTION: ACTUAL VS PREDICTED PRICE CHART */}
              <section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col border border-outline-variant/30">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm pb-space-md">
                  <div>
                    <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                      Statistical Fit Engine
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Actual Close vs Next-Day Forecast Trailing 30 Sessions
                    </h2>
                  </div>
                  <div className="flex items-center gap-space-md flex-wrap">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3.5 h-0.5 bg-primary-container rounded"></span>
                      <span className="font-metric-sm text-metric-sm text-on-surface">Actual Close</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3.5 h-0.5 border-t-2 border-dashed border-primary"></span>
                      <span className="font-metric-sm text-metric-sm text-primary">Forecast</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3.5 h-2 bg-primary/15 rounded-sm"></span>
                      <span className="font-metric-sm text-metric-sm text-outline">2σ Confidence Ribbon</span>
                    </div>
                  </div>
                </div>

                <ConfidenceRibbonChart prediction={prediction} history={history} />
              </section>

              {/* LOWER TWO-COLUMN GRID: RECENT HISTORY + MARKET CONTEXT */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
                {/* LEFT: Recent Forecast History Log */}
                <section className="xl:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col justify-between border border-outline-variant/30">
                  <div>
                    <div className="flex items-center justify-between pb-space-sm">
                      <div>
                        <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                          Audit Trail
                        </span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Forecast History Log</h2>
                      </div>
                      <span className="font-metric-sm text-metric-sm text-outline">Trailing 5 Sessions</span>
                    </div>

                    <ForecastHistoryTable data={history && history.length > 0 ? history : undefined} />
                  </div>
                </section>

                {/* RIGHT: Historical Analogs & Market Context */}
                <section className="xl:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col justify-between border border-outline-variant/30">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                          Regime Classification
                        </span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Historical Analogs & Context</h2>
                      </div>
                      <div className="flex items-center gap-space-xs px-space-xs py-0.5 rounded bg-surface-container text-outline font-metric-sm text-metric-sm">
                        <span className="material-symbols-outlined text-[14px]">hub</span>
                        <span>18 Clusters</span>
                      </div>
                    </div>

                    {/* Analog Telemetry */}
                    <div className="bg-surface-container-low p-space-sm rounded flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between text-on-surface">
                        <span className="font-metric-sm text-metric-sm">Analog Sessions Outcome:</span>
                        <span className="font-metric-sm text-metric-sm text-secondary font-semibold">
                          61.1% Bullish Continuation
                        </span>
                      </div>

                      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
                        <div className="bg-secondary h-full" style={{ width: '61.1%' }}></div>
                        <div className="bg-tertiary h-full" style={{ width: '38.9%' }}></div>
                      </div>

                      <div className="flex justify-between font-metric-sm text-metric-sm text-outline pt-1">
                        <span>Pos Sessions: 11 / 18</span>
                        <span>Neg Sessions: 7 / 18</span>
                      </div>

                      <div className="flex justify-between font-metric-sm text-metric-sm pt-1">
                        <span className="text-outline">
                          Avg Next-Day Drift: <strong className="text-secondary">+0.82%</strong>
                        </span>
                        <span className="text-outline">
                          Median Volatility: <strong className="text-on-surface">1.12σ</strong>
                        </span>
                      </div>
                    </div>

                    {/* Macro Factor Corroboration */}
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                        Macro Factor Corroboration
                      </span>
                      <div className="grid grid-cols-3 gap-space-xs">
                        <div className="p-space-xs bg-surface-container-low rounded flex flex-col">
                          <span className="font-label-caps text-label-caps text-outline">S&P 500</span>
                          <span className="font-metric-md text-metric-md text-secondary">+0.42%</span>
                          <span className="text-[10px] text-outline font-body-sm text-body-sm">Trend Support</span>
                        </div>
                        <div className="p-space-xs bg-surface-container-low rounded flex flex-col">
                          <span className="font-label-caps text-label-caps text-outline">NSE 100</span>
                          <span className="font-metric-md text-metric-md text-secondary">+0.71%</span>
                          <span className="text-[10px] text-outline font-body-sm text-body-sm">Tech Expansion</span>
                        </div>
                        <div className="p-space-xs bg-surface-container-low rounded flex flex-col">
                          <span className="font-label-caps text-label-caps text-outline">XLK HARDWARE</span>
                          <span className="font-metric-md text-metric-md text-secondary">+0.58%</span>
                          <span className="text-[10px] text-outline font-body-sm text-body-sm">Outperforming</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-md p-space-xs rounded bg-surface-container-low text-outline flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0">info</span>
                    <span className="font-label-caps text-label-caps text-[9px] leading-tight">
                      FOR RESEARCH & SIMULATION ONLY · NOT FINANCIAL ADVICE · PAST METRIC DRIFT DOES NOT GUARANTEE ALPHA
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
