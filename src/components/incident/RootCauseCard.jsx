import React from 'react';
import { CheckIcon, TargetIcon } from 'lucide-react';
import { ConfidenceBar } from '../ConfidenceBar';

export function RootCauseCard({ rootCause }) {
  return (
    <section className="rounded-lg border border-ai/35 bg-panel">
      <header className="flex items-center justify-between gap-4 border-b border-ai/20 bg-ai/[0.06] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <TargetIcon className="h-4 w-4 text-ai" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight text-fg">Root Cause Analysis</h2>
        </div>
        <span className="rounded-md bg-ai/10 px-2 py-0.5 text-2xs font-semibold text-ai ring-1 ring-inset ring-ai/25">
          Primary hypothesis
        </span>
      </header>

      <div className="p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h3 className="text-xl font-semibold tracking-tight text-fg">{rootCause.hypothesis}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg2">{rootCause.summary}</p>
          </div>
          <div className="w-full shrink-0 rounded-lg border border-line bg-panel2 p-4 lg:w-56">
            <p className="tabular text-3xl font-semibold leading-none tracking-tight text-fg">{rootCause.confidence}%</p>
            <p className="mt-1 text-2xs uppercase tracking-wide text-fg3">AI confidence</p>
            <div className="mt-3">
              <ConfidenceBar value={rootCause.confidence} tone="ai" label={null} showValue={false} />
            </div>
            <p className="mt-2 text-2xs text-fg3">Next best hypothesis: 32%</p>
          </div>
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-2xs font-semibold uppercase tracking-wide text-fg3">Supporting evidence</p>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {rootCause.evidence.map((e) =>
            <li key={e.text} className="flex items-start gap-2.5 rounded-md border border-line bg-panel2/60 px-3 py-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ok/10 ring-1 ring-inset ring-ok/30">
                  <CheckIcon className="h-2.5 w-2.5 text-ok" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 text-xs leading-relaxed text-fg">{e.text}</span>
                <span className="shrink-0 rounded border border-line2 px-1.5 py-0.5 text-2xs text-fg3">{e.source}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}