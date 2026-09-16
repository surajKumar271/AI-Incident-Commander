import React from 'react';
import { CheckIcon, LoaderIcon, ShieldCheckIcon } from 'lucide-react';

export function RecoveryTimeline({ steps, completed, verification, done }) {
  return (
    <div>
      <ol className="relative" aria-label="Recovery execution progress">
        <span className="absolute left-[11px] top-2 bottom-4 w-px bg-line" aria-hidden="true" />
        {steps.map((step, i) => {
          const isDone = i < completed;
          const isRunning = i === completed && !done;
          const pending = i > completed;
          return (
            <li key={step.label} className="relative flex gap-3 pb-4 pl-8 last:pb-0">
              <span
                className={`absolute left-0 flex h-[23px] w-[23px] items-center justify-center rounded-full ring-1 ring-inset ${
                isDone ? 'bg-ok/10 ring-ok/30' : isRunning ? 'bg-ai/10 ring-ai/40' : 'bg-panel2 ring-line2'}`
                }>
                
                {isDone ?
                <CheckIcon className="h-3 w-3 text-ok" aria-hidden="true" /> :
                isRunning ?
                <LoaderIcon className="h-3 w-3 animate-spin text-ai" aria-hidden="true" /> :

                <span className="h-1.5 w-1.5 rounded-full bg-fg3" aria-hidden="true" />
                }
              </span>
              <div className="min-w-0">
                <p className={`text-sm font-medium ${pending ? 'text-fg3' : 'text-fg'}`}>
                  {step.label}
                  {isRunning && <span className="text-fg3">…</span>}
                </p>
                <p className="mt-0.5 text-xs text-fg3">{step.detail}</p>
              </div>
            </li>);

        })}
      </ol>

      {done &&
      <div className="mt-5 rounded-lg border border-ok/35 bg-ok/[0.05] p-4">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-4 w-4 text-ok" aria-hidden="true" />
            <p className="text-sm font-semibold text-ok">Recovery Successful</p>
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {verification.map((v) =>
          <li key={v} className="flex items-center gap-2 text-xs text-fg">
                <CheckIcon className="h-3.5 w-3.5 shrink-0 text-ok" aria-hidden="true" />
                {v}
              </li>
          )}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-ok/20 pt-3">
            <span className="text-2xs uppercase tracking-wide text-fg3">Status</span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-ok/10 px-2 py-0.5 text-2xs font-semibold text-ok ring-1 ring-inset ring-ok/25">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
              Incident Resolved
            </span>
          </div>
        </div>
      }
    </div>);

}