import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../brand/Logo';
import { useAuth } from '../../context/AuthContext';

export default function SidebarRail() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { label: 'Overview', path: '/overview', icon: 'analytics' },
    { label: 'Stock Analysis', path: '/overview', icon: 'candlestick_chart' },
    { label: 'Forecast & Drivers', path: '/overview', icon: 'insights' },
    { label: 'Forecast History', path: '/overview', icon: 'history' },
    { label: 'Backtesting', path: '/overview', icon: 'query_stats' },
    { label: 'Watchlist', path: '/overview', icon: 'view_list' },
  ];

  const secondaryNav = [
    { label: 'Settings', path: '#settings', icon: 'tune' },
    { label: 'Help', path: '#help', icon: 'help' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.65)] border-r border-outline-variant/30 select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="px-space-md pt-space-md pb-space-sm">
          <Link to="/" className="flex items-center gap-space-sm">
            <Logo className="h-8 w-8" showText={false} />
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">
                StockTrend AI
              </span>
              <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase truncate">
                Quant Intelligence
              </span>
            </div>
          </Link>
          <p className="mt-space-xs font-body-sm text-body-sm text-outline leading-tight">
            Understand the forecast. Verify the history.
          </p>
        </div>

        <div className="h-px bg-surface-container-highest my-space-xs mx-space-md" />

        {/* Primary Navigation */}
        <nav className="flex flex-col gap-space-2xs px-space-sm pt-space-xs">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path && item.label === 'Overview';
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-colors rounded-lg ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-headline-sm text-headline-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-md text-body-md'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="h-px bg-surface-container-highest my-space-xs" />

          {secondaryNav.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-body-md text-body-md"
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* User / Session Card Footer */}
      <div className="p-space-sm m-space-sm rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface truncate">
                {user?.email ? user.email.split('@')[0] : 'Quant Desk'}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"></span>
            </div>
            <span className="font-metric-sm text-metric-sm text-secondary truncate">
              {user ? 'Verified Session' : 'Live Feed Connected'}
            </span>
          </div>
        </div>

        {user && (
          <button
            onClick={() => signOut()}
            className="mt-1 w-full text-left flex items-center justify-between px-2 py-1 rounded bg-surface-container text-outline hover:text-tertiary transition-colors text-[11px] font-label-caps uppercase"
          >
            <span>Sign Out Terminal</span>
            <span className="material-symbols-outlined text-[14px]">logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
