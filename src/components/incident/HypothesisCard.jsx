import React from 'react';
import { ConfidenceBar } from '../ConfidenceBar';

export function HypothesisCard({ hypothesis }) {
  return (
    <div className="rounded-lg border border-line bg-panel p-4 transition-colors duration-150 ease-smooth hover:border-line2">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-fg">{hypothesis.name}</p>
        <span className="tabular shrink-0 text-sm font-semibold text-fg2">{hypothesis.confidence}%</span>
      </div>
      <div className="mt-2.5">
        <ConfidenceBar value={hypothesis.confidence} tone="neutral" label={null} showValue={false} size="sm" />
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-fg3">{hypothesis.note}</p>
    </div>);

}