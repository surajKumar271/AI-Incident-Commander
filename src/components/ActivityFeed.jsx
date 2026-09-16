import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, LoaderIcon } from 'lucide-react';
import { AgentChip } from './AgentChip';

export function ActivityFeed({ items, showIncident = true }) {
  return (
    <ul className="divide-y divide-line" aria-label="Recent AI agent activity">
      {items.map((item) => {
        const running = item.status === 'running';
        return (
          <li key={item.id || item.time} className="flex gap-3 px-5 py-3 transition-colors duration-150 ease-smooth hover:bg-white/[0.02]">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
              running ? 'bg-ai/10 ring-ai/30' : 'bg-ok/10 ring-ok/25'}`
              }>
              
              {running ?
              <LoaderIcon className="h-3 w-3 animate-spin text-ai" aria-hidden="true" /> :

              <CheckIcon className="h-3 w-3 text-ok" aria-hidden="true" />
              }
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <AgentChip name={item.agent} />
                <span className="tabular font-mono text-2xs text-fg3">{item.time}</span>
                {showIncident && item.incident &&
                <Link
                  to={`/incidents/${item.incident}`}
                  className="font-mono text-2xs text-fg3 underline decoration-line2 underline-offset-2 transition-colors duration-150 ease-smooth hover:text-fg2">
                  
                    {item.incident}
                  </Link>
                }
              </div>
              <p className={`mt-1 text-xs ${running ? 'text-fg' : 'text-fg2'}`}>
                {item.action}
                {running && <span className="text-fg3">…</span>}
              </p>
            </div>
          </li>);

      })}
    </ul>);

}