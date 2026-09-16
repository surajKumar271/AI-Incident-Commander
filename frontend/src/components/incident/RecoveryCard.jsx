import React from 'react';
import { WrenchIcon, ArrowRightIcon, ShieldAlertIcon, CheckIcon, XIcon, RotateCcwIcon } from 'lucide-react';
import { ConfidenceBar } from '../ConfidenceBar';
import { RecoveryTimeline } from './RecoveryTimeline';

const riskTone = {
  Low: 'bg-ok/10 text-ok ring-ok/25',
  Medium: 'bg-warn/10 text-warn ring-warn/25',
  High: 'bg-crit/10 text-crit ring-crit/25'
};

export function RecoveryCard({ recovery, state, steps, completed, verification, onApprove, onReject, onReset }) {
  const executing = state === 'executing';
  const complete = state === 'complete';

  return (
    <section className={`rounded-lg border bg-panel ${complete ? 'border-ok/35' : 'border-warn/35'}`}>
      <header className={`flex items-center justify-between gap-4 border-b px-5 py-3.5 ${complete ? 'border-ok/20 bg-ok/[0.05]' : 'border-warn/20 bg-warn/[0.05]'}`}>
        <div className="flex items-center gap-2">
          <WrenchIcon className={`h-4 w-4 ${complete ? 'text-ok' : 'text-warn'}`} aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight text-fg">
            {complete ? 'Recovery Executed' : executing ? 'Recovery In Progress' : 'Recommended Recovery'}
          </h2>
        </div>
        <span className="text-2xs text-fg3">Recovery Agent</span>
      </header>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-panel2 px-4 py-3">
          <span className="text-2xs uppercase tracking-wide text-fg3">Action</span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-fg">Roll back deployment</span>
            <span className="rounded border border-line2 bg-panel px-1.5 py-0.5 font-mono text-xs text-crit">{recovery.from}</span>
            <ArrowRightIcon className="h-3.5 w-3.5 text-fg3" aria-hidden="true" />
            <span className="rounded border border-line2 bg-panel px-1.5 py-0.5 font-mono text-xs text-ok">{recovery.to}</span>
          </div>
          <span className={`ml-auto rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${riskTone[recovery.risk]}`}>
            {recovery.risk} risk
          </span>
        </div>

        {state === 'pending' || state === 'rejected' ?
        <>
            <dl className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wide text-fg3">Expected impact</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-fg">{recovery.impact}</dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wide text-fg3">Reason</dt>
                <dd className="mt-1.5 text-sm italic leading-relaxed text-fg2">“{recovery.reason}”</dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wide text-fg3">Blast radius</dt>
                <dd className="mt-1.5 text-sm text-fg">{recovery.blastRadius}</dd>
              </div>
              <div>
                <dt className="text-2xs font-semibold uppercase tracking-wide text-fg3">Estimated duration</dt>
                <dd className="tabular mt-1.5 text-sm text-fg">{recovery.eta}</dd>
              </div>
            </dl>

            <div className="mt-5 max-w-xs">
              <ConfidenceBar value={recovery.confidence} tone="ai" label="AI confidence" />
            </div>

            {state === 'rejected' ?
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-panel2 px-4 py-3">
                <p className="inline-flex items-center gap-2 text-xs text-fg2">
                  <XIcon className="h-3.5 w-3.5 text-crit" aria-hidden="true" />
                  Recommendation rejected. Recovery Agent is holding for new instructions.
                </p>
                <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-md border border-line2 bg-panel px-3 py-1.5 text-xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3">
              
                  <RotateCcwIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Reconsider
                </button>
              </div> :

          <div className="mt-5 flex flex-col gap-2.5 border-t border-line pt-4 sm:flex-row sm:items-center">
                <button
              type="button"
              onClick={onApprove}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-ai px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-smooth hover:bg-ai/85">
              
                  <CheckIcon className="h-4 w-4" aria-hidden="true" />
                  Approve Rollback
                </button>
                <button
              type="button"
              onClick={onReject}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-line2 bg-panel2 px-4 py-2.5 text-sm font-semibold text-fg2 transition-colors duration-150 ease-smooth hover:border-fg3 hover:text-fg">
              
                  <XIcon className="h-4 w-4" aria-hidden="true" />
                  Reject
                </button>
                <p className="inline-flex items-center gap-1.5 text-2xs text-fg3 sm:ml-auto">
                  <ShieldAlertIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Human approval required before execution
                </p>
              </div>
          }
          </> :

        <div className="mt-5 border-t border-line pt-4">
            <RecoveryTimeline steps={steps} completed={completed} verification={verification} done={complete} />
          </div>
        }
      </div>
    </section>);

}