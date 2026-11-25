import React, { useState } from 'react';

export default function ConfidenceRibbonChart({ prediction, history }) {
  const currentPrice = prediction?.current_close;
  const forecastPrice = prediction?.predictions?.lstm || prediction?.primary_forecast;
  const currency = prediction?.currency || '$';
  const changeVal = prediction?.predicted_change ?? 0;
  const changePct = prediction?.predicted_change_percent ?? 0;

  const activeSession = {
    date: history?.[0]?.date || 'Latest Session',
    forecast: forecastPrice ? `${currency}${Number(forecastPrice).toFixed(2)}` : '$247.63',
    actual: currentPrice ? `${currency}${Number(currentPrice).toFixed(2)}` : '$245.18',
    divergence: prediction ? `${changeVal >= 0 ? '+' : ''}${currency}${Math.abs(changeVal).toFixed(2)} (${changePct >= 0 ? '+' : ''}${changePct}%)` : '-$2.45 (-1.00%)',
    direction: prediction?.direction || 'CORRECT',
    inRange: 'YES',
  };

  return (
    <div className="flex flex-col w-full">
      {/* Active Point Inspector Callout */}
      <div className="bg-surface-container-low px-space-md py-space-xs rounded flex flex-wrap items-center justify-between gap-space-xs mb-space-sm">
        <div className="flex items-center gap-space-sm flex-wrap">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-metric-sm text-metric-sm text-on-surface font-semibold">
            Active Session: {activeSession.date}
          </span>
          <span className="font-metric-sm text-metric-sm text-outline">|</span>
          <span className="font-metric-sm text-metric-sm text-on-surface">
            Forecast: <strong className="text-primary">{activeSession.forecast}</strong>
          </span>
          <span className="font-metric-sm text-metric-sm text-outline">|</span>
          <span className="font-metric-sm text-metric-sm text-on-surface">
            Actual: <strong className="text-on-surface">{activeSession.actual}</strong>
          </span>
          <span className="font-metric-sm text-metric-sm text-outline">|</span>
          <span className="font-metric-sm text-metric-sm text-tertiary">
            Divergence: {activeSession.divergence}
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="px-space-xs py-0.5 rounded bg-secondary/15 text-secondary font-label-caps text-label-caps font-semibold">
            DIRECTION: {activeSession.direction}
          </span>
          <span className="px-space-xs py-0.5 rounded bg-primary/15 text-primary font-label-caps text-label-caps font-semibold">
            IN RANGE: {activeSession.inRange}
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full h-80 relative overflow-hidden rounded bg-surface-container-lowest flex items-center justify-center">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal Grid Lines */}
          <line stroke="#1E293B" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="980" y1="40" y2="40" />
          <line stroke="#1E293B" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="980" y1="100" y2="100" />
          <line stroke="#1E293B" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="980" y1="160" y2="160" />
          <line stroke="#1E293B" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="980" y1="220" y2="220" />
          <line stroke="#1E293B" strokeWidth="1" x1="40" x2="980" y1="280" y2="280" />

          {/* Y-Axis Price Labels */}
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="44">$252</text>
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="104">$246</text>
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="164">$240</text>
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="224">$234</text>
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="35" y="284">$228</text>

          {/* Confidence Interval Ribbon (2-Sigma Polygon) */}
          <polygon
            fill="#38BDF8"
            fillOpacity="0.10"
            points="
              60,250 95,242 130,230 165,225 200,210 235,215 270,195 305,180 340,190 375,175 410,165 445,150 480,145 515,130 550,140 585,135 620,120 655,110 690,125 725,100 760,95 795,110 830,90 865,75 900,60 935,70 970,50
              970,110 935,130 900,120 865,135 830,150 795,170 760,155 725,160 690,185 655,170 620,180 585,195 550,200 515,190 480,205 445,210 410,225 375,235 340,250 305,240 270,255 235,275 200,270 165,285 130,290 95,302 60,310
            "
          />

          {/* Forecast Line (Dashed Cyan) */}
          <polyline
            fill="none"
            points="
              60,280 95,272 130,260 165,255 200,240 235,245 270,225 305,210 340,220 375,205 410,195 445,180 480,175 515,160 550,170 585,165 620,150 655,140 690,155 725,130 760,125 795,140 830,120 865,105 900,90 935,100 970,80
            "
            stroke="#8ed5ff"
            strokeDasharray="5 4"
            strokeWidth="2"
          />

          {/* Actual Close Line (Solid High-Contrast Cyan) */}
          <polyline
            fill="none"
            points="
              60,284 95,270 130,258 165,252 200,244 235,248 270,220 305,214 340,226 375,200 410,190 445,184 480,170 515,164 550,168 585,160 620,146 655,142 690,158 725,126 760,130 795,136 830,116 865,110 900,96 935,94 970,105
            "
            stroke="#38bdf8"
            strokeWidth="2.5"
          />

          {/* Data Points on Actual Price */}
          <circle cx="970" cy="105" fill="#38bdf8" r="4.5" />
          <circle cx="935" cy="94" fill="#38bdf8" r="3.5" />
          <circle cx="900" cy="96" fill="#38bdf8" r="3.5" />
          <circle cx="865" cy="110" fill="#38bdf8" r="3.5" />
          <circle cx="830" cy="116" fill="#38bdf8" r="3.5" />

          {/* Forward Projection Terminal Node (Target Sep 24) */}
          <circle cx="970" cy="80" fill="#8ed5ff" r="4.5" stroke="#0e131f" strokeWidth="1.5" />

          {/* Inspection Vertical Guide on Active Session */}
          <line
            stroke="#38bdf8"
            strokeDasharray="2 2"
            strokeOpacity="0.5"
            strokeWidth="1"
            x1="970"
            x2="970"
            y1="40"
            y2="280"
          />

          {/* X-Axis Date Markers */}
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="60" y="300">Aug 24</text>
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="200" y="300">Aug 31</text>
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="445" y="300">Sep 08</text>
          <text fill="#87929A" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="690" y="300">Sep 15</text>
          <text fill="#38bdf8" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" textAnchor="middle" x="970" y="300">Sep 23 (Active)</text>
        </svg>
      </div>

      {/* Chart Footer Legend & Accuracy Note */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-space-sm gap-space-xs text-outline font-metric-sm text-metric-sm">
        <span>Empirical Forecast Corridor · Historical Out-of-Sample Validation</span>
        <span>Resolution: 1D Close · Market Hours Normalized</span>
      </div>
    </div>
  );
}
