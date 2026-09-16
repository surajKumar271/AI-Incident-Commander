import React from 'react';
import { ArrowUpRightIcon, ArrowDownRightIcon, MinusIcon } from 'lucide-react';
import { trendTone } from '../utils/status';

const toneRing = {
  crit: 'text-crit',
  warn: 'text-warn',
  ok: 'text-ok',
  ai: 'text-ai',
  neutral: 'text-fg3'
};

export function MetricCard({ label, value, sub, icon: Icon, trend = 'flat', delta, tone = 'neutral', inverse = false, emphasis = false }) {
  const TrendIcon = trend === 'up' ? ArrowUpRightIcon : trend === 'down' ? ArrowDownRightIcon : MinusIcon;
  return (
    <div
      className={`rounded-lg border bg-panel p-4 transition-colors duration-150 ease-smooth ${
      emphasis ? 'border-crit/40' : 'border-line hover:border-line2'}`
      }>
      
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-fg2">{label}</span>
        {Icon && <Icon className={`h-4 w-4 ${toneRing[tone] || toneRing.neutral}`} aria-hidden="true" />}
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="tabular text-3xl font-semibold leading-none tracking-tight text-fg">{value}</span>
        {sub && <span className="tabular pb-0.5 text-xs text-fg3">{sub}</span>}
      </div>
      {delta &&
      <div className={`mt-2.5 flex items-center gap-1 text-xs font-medium ${trendTone(trend, inverse)}`}>
          <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="tabular">{delta}</span>
        </div>
      }
    </div>);

}