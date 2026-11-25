import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileDock() {
  const location = useLocation();

  const tabs = [
    { label: 'Overview', path: '/m/overview', icon: 'candlestick_chart' },
    { label: 'Forecast', path: '/m/forecast', icon: 'insights' },
    { label: 'Analysis', path: '/overview', icon: 'query_stats' },
    { label: 'Backtest', path: '/overview', icon: 'history_edu' },
    { label: 'Watchlist', path: '/overview', icon: 'star' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-1px_12px_rgba(0,0,0,0.4)] md:hidden select-none">
      <div className="flex justify-around items-center h-16 px-space-2xs">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.label}
              to={tab.path}
              className={`flex flex-col items-center justify-center gap-space-2xs min-h-[44px] min-w-[44px] transition-colors ${
                isActive
                  ? 'text-primary-container font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
              <span className="font-label-caps text-label-caps uppercase">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
