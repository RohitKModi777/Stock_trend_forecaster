import React from 'react';

export default function Logo({ className = "h-8 w-8", showText = true }) {
  return (
    <div className="flex items-center gap-space-sm select-none">
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="22" fill="#0E1420" />
        <rect x="1" y="1" width="98" height="98" rx="21" stroke="#232F46" strokeWidth="2" />
        <path
          d="M22 68L42 48L56 58L78 30"
          stroke="#38BDF8"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 68L42 48L56 58L78 30V44M78 30H64"
          stroke="#38BDF8"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="78" cy="30" r="4.5" fill="#38BDF8" />
        <path
          d="M56 58L78 30"
          stroke="#60A5FA"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <rect x="22" y="76" width="56" height="3" rx="1.5" fill="#1E293B" />
        <rect x="22" y="76" width="36" height="3" rx="1.5" fill="#10B981" />
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            StockTrend<span className="text-primary-container">.AI</span>
          </span>
          <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
            QUANT INTELLIGENCE
          </span>
        </div>
      )}
    </div>
  );
}
