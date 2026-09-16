import React, { useState } from 'react';
import { TerminalIcon, FilterIcon } from 'lucide-react';

const levelStyle = {
  ERROR: 'text-crit',
  WARN: 'text-warn',
  INFO: 'text-info',
  DEBUG: 'text-fg3'
};

export function LogViewer({ logs, title = 'payment-api · stdout', filterable = true }) {
  const [level, setLevel] = useState('ALL');
  const levels = ['ALL', 'ERROR', 'WARN', 'INFO'];
  const visible = level === 'ALL' ? logs : logs.filter((l) => l.level === level);

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-[#060709]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel px-4 py-2.5">
        <span className="inline-flex items-center gap-2 font-mono text-2xs text-fg2">
          <TerminalIcon className="h-3.5 w-3.5 text-fg3" aria-hidden="true" />
          {title}
        </span>
        {filterable &&
        <div className="flex items-center gap-1">
            <FilterIcon className="mr-1 h-3 w-3 text-fg3" aria-hidden="true" />
            {levels.map((l) =>
          <button
            key={l}
            type="button"
            onClick={() => setLevel(l)}
            className={`rounded px-1.5 py-0.5 font-mono text-2xs transition-colors duration-150 ease-smooth ${
            level === l ? 'bg-white/[0.08] text-fg' : 'text-fg3 hover:text-fg2'}`
            }>
            
                {l}
              </button>
          )}
          </div>
        }
      </div>
      <div className="max-h-80 overflow-y-auto scroll-thin p-3 font-mono text-xs leading-relaxed">
        {visible.length === 0 ?
        <p className="px-1 py-6 text-center text-fg3">No {level.toLowerCase()} lines in this window.</p> :

        visible.map((l, i) =>
        <div key={`${l.time}-${i}`} className="flex gap-3 rounded px-1 py-0.5 hover:bg-white/[0.03]">
              <span className="tabular shrink-0 text-fg3">{l.time}</span>
              <span className={`w-12 shrink-0 font-medium ${levelStyle[l.level] || 'text-fg3'}`}>{l.level}</span>
              <span className="min-w-0 flex-1 text-fg2">{l.msg}</span>
              <span className="hidden shrink-0 text-fg3 sm:block">{l.src}</span>
            </div>
        )
        }
      </div>
    </div>);

}