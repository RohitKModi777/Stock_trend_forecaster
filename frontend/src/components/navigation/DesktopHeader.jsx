import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DesktopHeader() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [headerSearch, setHeaderSearch] = useState('');
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const isHome = location.pathname === '/';

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (!isHome) return;
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white/95 dark:bg-[#090E1A]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-gray-200 dark:border-[#1E293B] select-none text-gray-900 dark:text-[#DEE2F3] transition-colors duration-200 shadow-xs">
      {/* Left: Groww Logo & Primary Dropdowns */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* Groww Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D09C] via-teal-400 to-sky-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-[#0C1222] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 18L10 12L14 16L20 8" stroke="#00D09C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 8H20V14" stroke="#00D09C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="8" r="2.2" fill="#38BDF8" />
              </svg>
            </div>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white flex items-center">
            StockTrend<span className="text-[#00D09C]">.AI</span>
          </span>
        </Link>

        {/* Desktop Navigation with Hover Dropdowns */}
        <nav className="hidden xl:flex items-center gap-1 ml-2 text-sm font-semibold">
          {/* Predictions Page Link */}
          <Link
            to="/predictions"
            className="px-3 py-2 rounded-lg text-gray-800 dark:text-slate-200 hover:text-[#008761] dark:hover:text-[#00D09C] hover:bg-emerald-50 dark:hover:bg-[#131B2E] transition-colors flex items-center gap-1.5 cursor-pointer font-extrabold text-sm border border-transparent hover:border-emerald-200"
          >
            <span className="material-symbols-outlined text-lg text-[#00D09C]">psychology</span>
            <span>Predictions</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-[#00D09C]/20 text-[#008761] dark:text-[#00D09C] font-bold">
              AI
            </span>
          </Link>

          {/* Stocks Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('stocks')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => scrollToSection('stocks-section')}
              className="px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>Stocks</span>
              <span className={`material-symbols-outlined text-base transition-transform ${activeDropdown === 'stocks' ? 'rotate-180 text-[#00D09C]' : 'text-gray-400 dark:text-slate-500'}`}>
                keyboard_arrow_down
              </span>
            </button>

            {activeDropdown === 'stocks' && (
              <div className="absolute top-full left-0 w-80 bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-[#22314E] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => scrollToSection('stocks-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-[#00D09C]/10 text-[#00D09C] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">trending_up</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#00D09C]">Invest in Stocks</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Zero brokerage delivery & real-time P&L</div>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection('stocks-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">pie_chart</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-sky-500">ETF Screener</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Gold, Silver, Index & Global ETFs</div>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection('trading-features')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">bolt</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-indigo-500">Intraday Trading</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Top momentum movers & 4x MTF leverage</div>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection('stocks-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">rocket_launch</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-amber-500">IPO Applications</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">1-click instant UPI pre-apply</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* F&O Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('fo')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => scrollToSection('fo-section')}
              className="px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>F&O</span>
              <span className={`material-symbols-outlined text-base transition-transform ${activeDropdown === 'fo' ? 'rotate-180 text-[#00D09C]' : 'text-gray-400 dark:text-slate-500'}`}>
                keyboard_arrow_down
              </span>
            </button>

            {activeDropdown === 'fo' && (
              <div className="absolute top-full left-0 w-80 bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-[#22314E] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => scrollToSection('fo-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-[#00D09C]/10 text-[#00D09C] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">terminal</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#00D09C]">Trading Terminal</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Custom charts, positions, and live P&L</div>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection('fo-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">table_chart</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-sky-500">Option Chain</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Greeks, OI build-up, and strategy payoffs</div>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection('fo-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">touch_app</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-purple-500">Scalper Mode</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">1-tap lightning rapid trade execution</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mutual Funds Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('mf')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => scrollToSection('mf-section')}
              className="px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>Mutual Funds</span>
              <span className={`material-symbols-outlined text-base transition-transform ${activeDropdown === 'mf' ? 'rotate-180 text-[#00D09C]' : 'text-gray-400 dark:text-slate-500'}`}>
                keyboard_arrow_down
              </span>
            </button>

            {activeDropdown === 'mf' && (
              <div className="absolute top-full left-0 w-80 bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-[#22314E] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => scrollToSection('mf-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-[#00D09C]/10 text-[#00D09C] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">event_repeat</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#00D09C]">Direct Mutual Funds</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Zero commission SIP & Lumpsum</div>
                  </div>
                </button>
                <button
                  onClick={() => scrollToSection('calculator-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">calculate</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-emerald-500">SIP Calculator</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">Simulate wealth compounding returns</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* More Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('more')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="px-3 py-2 rounded-lg text-gray-700 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>More</span>
              <span className={`material-symbols-outlined text-base transition-transform ${activeDropdown === 'more' ? 'rotate-180 text-[#00D09C]' : 'text-gray-400 dark:text-slate-500'}`}>
                keyboard_arrow_down
              </span>
            </button>

            {activeDropdown === 'more' && (
              <div className="absolute top-full left-0 w-72 bg-white dark:bg-[#131B2E] border border-gray-200 dark:border-[#22314E] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => scrollToSection('calculator-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-gray-500 text-lg">calculate</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">Calculators</span>
                </button>
                <button
                  onClick={() => scrollToSection('faq-section')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-gray-500 text-lg">help_outline</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">Help & FAQ</span>
                </button>
                <button
                  onClick={() => scrollToSection('about-groww')}
                  className="w-full p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1A253D] flex items-center gap-3 text-left transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-gray-500 text-lg">info</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">About StockTrend</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Center: Search input in header */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="w-full relative flex items-center bg-gray-100 dark:bg-[#131B2E] border border-gray-300 dark:border-[#22314E] focus-within:border-[#00D09C] focus-within:bg-white dark:focus-within:bg-[#131B2E] rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
          <span className="material-symbols-outlined text-gray-500 dark:text-slate-400 text-lg mr-2">search</span>
          <input
            type="text"
            placeholder="Search StockTrend (e.g. Reliance, Nifty, Apple)..."
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            className="bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 text-sm focus:outline-none w-full font-medium"
          />
          {headerSearch && (
            <button onClick={() => setHeaderSearch('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right: Theme Toggle & Actions */}
      <div className="flex items-center gap-3">
        {/* Crisp Light/Dark Theme Switcher Pill */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Groww Clean Light Theme" : "Switch to Pro Dark Mode"}
          className="p-2 rounded-xl border border-gray-300 dark:border-[#22314E] bg-gray-100 dark:bg-[#131B2E] text-gray-700 dark:text-amber-300 hover:bg-gray-200 dark:hover:bg-[#1A253D] transition-colors cursor-pointer flex items-center justify-center shadow-xs"
          aria-label="Toggle Theme"
        >
          <span className="material-symbols-outlined text-xl">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {user ? (
          <>
            <Link
              to="/overview"
              className="text-xs sm:text-sm text-white bg-[#00D09C] hover:bg-[#00b386] px-4 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 shadow-md shadow-[#00D09C]/20"
            >
              <span>Terminal</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="hidden sm:inline-flex text-xs text-gray-500 dark:text-slate-400 hover:text-rose-600 transition-colors px-2 py-1 cursor-pointer font-bold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/sign-in"
              className="hidden sm:inline-block text-xs sm:text-sm text-gray-700 dark:text-slate-200 hover:text-gray-950 dark:hover:text-white transition-colors px-3 py-1.5 font-bold"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="text-xs sm:text-sm text-white bg-[#00D09C] hover:bg-[#00b386] px-4 py-2 rounded-xl transition-all font-extrabold shadow-md shadow-[#00D09C]/25 flex items-center gap-1"
            >
              <span>Get started</span>
              <span className="material-symbols-outlined text-base hidden sm:inline">arrow_forward</span>
            </Link>
          </>
        )}

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#131B2E] transition-colors"
          aria-label="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-16 left-0 right-0 bg-white dark:bg-[#090E1A] border-b border-gray-200 dark:border-[#1E293B] p-5 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top-2">
          <button
            onClick={() => scrollToSection('stocks-section')}
            className="flex items-center justify-between p-2.5 rounded-xl text-left font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E]"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#00D09C]">trending_up</span>
              <span>Stocks & ETFs</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
          </button>

          <button
            onClick={() => scrollToSection('fo-section')}
            className="flex items-center justify-between p-2.5 rounded-xl text-left font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E]"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-sky-500">terminal</span>
              <span>Futures & Options</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
          </button>

          <button
            onClick={() => scrollToSection('mf-section')}
            className="flex items-center justify-between p-2.5 rounded-xl text-left font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E]"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-500">event_repeat</span>
              <span>Direct Mutual Funds</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
          </button>

          <button
            onClick={() => scrollToSection('calculator-section')}
            className="flex items-center justify-between p-2.5 rounded-xl text-left font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E]"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-purple-500">calculate</span>
              <span>SIP Calculator</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
          </button>

          <Link
            to="/predictions"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl text-left font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#131B2E]"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#00D09C]">psychology</span>
              <span>Predictive Intelligence (T+1)</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-sm">chevron_right</span>
          </Link>

          <div className="pt-3 border-t border-gray-200 dark:border-[#1E293B] flex flex-col gap-2">
            {!user ? (
              <>
                <Link
                  to="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl bg-gray-100 dark:bg-[#131B2E] text-gray-900 dark:text-white font-bold text-sm border border-gray-300 dark:border-[#22314E]"
                >
                  Login to StockTrend
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl bg-[#00D09C] text-white font-extrabold text-sm shadow-md"
                >
                  Open Free Demat Account
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
                className="w-full py-2 text-center text-gray-500 dark:text-slate-400 hover:text-rose-600 text-xs font-bold"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
