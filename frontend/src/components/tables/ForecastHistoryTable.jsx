import React from 'react';

const defaultHistoryData = [
  {
    date: 'Sep 23',
    forecast: '$247.63',
    actual: '$245.18',
    residual: '-$2.45 (-1.00%)',
    residualPositive: false,
    direction: 'CORRECT',
    inBand: 'YES',
  },
  {
    date: 'Sep 22',
    forecast: '$242.10',
    actual: '$241.76',
    residual: '+$0.34 (+0.14%)',
    residualPositive: true,
    direction: 'CORRECT',
    inBand: 'YES',
  },
  {
    date: 'Sep 21',
    forecast: '$244.50',
    actual: '$240.25',
    residual: '+$4.25 (+1.77%)',
    residualPositive: false,
    direction: 'DIVERGED',
    inBand: 'NO',
  },
  {
    date: 'Sep 20',
    forecast: '$239.80',
    actual: '$238.90',
    residual: '+$0.90 (+0.38%)',
    residualPositive: true,
    direction: 'CORRECT',
    inBand: 'YES',
  },
  {
    date: 'Sep 19',
    forecast: '$236.40',
    actual: '$237.15',
    residual: '-$0.75 (-0.32%)',
    residualPositive: false,
    direction: 'CORRECT',
    inBand: 'YES',
  },
];

export default function ForecastHistoryTable({ data = defaultHistoryData }) {
  return (
    <div className="overflow-x-auto mt-space-xs">
      <table className="w-full text-left font-metric-sm text-metric-sm">
        <thead>
          <tr className="bg-surface-container text-outline font-label-caps text-label-caps uppercase">
            <th className="py-space-xs px-space-sm">Date</th>
            <th className="py-space-xs px-space-sm text-right">Forecast</th>
            <th className="py-space-xs px-space-sm text-right">Actual</th>
            <th className="py-space-xs px-space-sm text-right">Residual Error</th>
            <th className="py-space-xs px-space-sm text-center">Direction</th>
            <th className="py-space-xs px-space-sm text-center">In 2σ Band</th>
          </tr>
        </thead>
        <tbody className="divide-y-0">
          {data.map((row, idx) => (
            <tr
              key={row.date}
              className={`${
                idx % 2 === 0 ? 'bg-surface-container-low' : 'bg-surface-container-lowest'
              } hover:bg-surface-container transition-colors`}
            >
              <td className="py-2.5 px-space-sm text-on-surface font-semibold">{row.date}</td>
              <td className="py-2.5 px-space-sm text-right text-primary">{row.forecast}</td>
              <td className="py-2.5 px-space-sm text-right text-on-surface font-semibold">{row.actual}</td>
              <td
                className={`py-2.5 px-space-sm text-right ${
                  row.residualPositive ? 'text-secondary' : 'text-tertiary'
                }`}
              >
                {row.residual}
              </td>
              <td className="py-2.5 px-space-sm text-center">
                <span
                  className={`px-space-xs py-0.5 rounded text-[10px] font-semibold ${
                    row.direction === 'CORRECT'
                      ? 'bg-secondary/15 text-secondary'
                      : 'bg-tertiary/15 text-tertiary'
                  }`}
                >
                  {row.direction}
                </span>
              </td>
              <td className="py-2.5 px-space-sm text-center">
                <span
                  className={`px-space-xs py-0.5 rounded text-[10px] font-semibold ${
                    row.inBand === 'YES'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-tertiary/15 text-tertiary'
                  }`}
                >
                  {row.inBand}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
