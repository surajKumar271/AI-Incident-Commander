import React from 'react';
import { CheckIcon } from 'lucide-react';

const stages = ['Detect', 'Investigate', 'Evidence', 'Reason', 'Root cause', 'Recommend', 'Approval', 'Execute', 'Verify'];

// Makes the end-to-end incident lifecycle legible at a glance at the top of the page.
export function LifecycleRail({ current }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-2" aria-label="Incident lifecycle progress">
      {stages.map((stage, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={stage} className="flex items-center gap-1">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-2xs font-medium ring-1 ring-inset transition-colors duration-150 ease-smooth ${
              done ?
              'bg-ok/[0.08] text-ok ring-ok/20' :
              active ?
              'bg-ai/[0.12] text-ai ring-ai/35' :
              'bg-white/[0.02] text-fg3 ring-line'}`
              }>
              
              {done ?
              <CheckIcon className="h-3 w-3" aria-hidden="true" /> :

              <span className={`h-1.5 w-1.5 rounded-full ${active ? 'animate-breathe bg-ai' : 'bg-fg3'}`} aria-hidden="true" />
              }
              {stage}
            </span>
            {i < stages.length - 1 && <span className={`h-px w-3 ${done ? 'bg-ok/30' : 'bg-line'}`} aria-hidden="true" />}
          </li>);

      })}
    </ol>);

}