import React from 'react';

const tones = {
  ai: 'bg-ai',
  ok: 'bg-ok',
  warn: 'bg-warn',
  crit: 'bg-crit',
  neutral: 'bg-fg3'
};

export function ConfidenceBar({ value, tone = 'ai', label = 'Confidence', showValue = true, size = 'md' }) {
  const height = size === 'sm' ? 'h-1' : 'h-1.5';
  return (
    <div>
      {(label || showValue) &&
      <div className="mb-1.5 flex items-baseline justify-between">
          {label && <span className="text-2xs font-medium uppercase tracking-wide text-fg3">{label}</span>}
          {showValue && <span className="tabular text-sm font-semibold text-fg">{value}%</span>}
        </div>
      }
      <div
        className={`w-full overflow-hidden rounded-full bg-white/[0.06] ${height}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} ${value}%`}>
        
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease-smooth ${tones[tone] || tones.ai}`}
          style={{ width: `${value}%` }} />
        
      </div>
    </div>);

}