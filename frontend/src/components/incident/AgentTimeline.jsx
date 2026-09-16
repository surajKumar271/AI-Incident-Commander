import React from 'react';
import { CheckIcon, LoaderIcon, SirenIcon, DatabaseIcon, GitCompareIcon, WrenchIcon } from 'lucide-react';
import { AgentChip, ToolChip } from '../AgentChip';

const kindMeta = {
  detect: { ring: 'ring-crit/30', bg: 'bg-crit/10', text: 'text-crit', stage: 'Detect' },
  evidence: { ring: 'ring-ok/25', bg: 'bg-ok/10', text: 'text-ok', stage: 'Collect evidence' },
  reason: { ring: 'ring-ai/30', bg: 'bg-ai/10', text: 'text-ai', stage: 'Reason' },
  recover: { ring: 'ring-warn/30', bg: 'bg-warn/10', text: 'text-warn', stage: 'Recommend recovery' }
};

const kindIcon = {
  detect: SirenIcon,
  evidence: DatabaseIcon,
  reason: GitCompareIcon,
  recover: WrenchIcon
};

export function AgentTimeline({ items }) {
  return (
    <ol className="relative" aria-label="AI investigation timeline">
      <span className="absolute left-[15px] top-3 bottom-4 w-px bg-line" aria-hidden="true" />
      {items.map((item, idx) => {
        const meta = kindMeta[item.kind] || kindMeta.evidence;
        const running = item.status === 'running';
        const Icon = running ? LoaderIcon : item.status === 'done' && item.kind !== 'detect' ? CheckIcon : kindIcon[item.kind] || CheckIcon;
        const prevStage = idx > 0 ? (kindMeta[items[idx - 1].kind] || {}).stage : null;
        const showStage = meta.stage !== prevStage;

        return (
          <li key={item.time} className="relative pl-11">
            {showStage &&
            <p className={`${idx === 0 ? '' : 'mt-1'} mb-2 text-2xs font-semibold uppercase tracking-wide ${meta.text}`}>{meta.stage}</p>
            }
            <div className="relative pb-5">
              <span
                className={`absolute -left-11 top-0 flex h-[31px] w-[31px] items-center justify-center rounded-full ring-1 ring-inset ${meta.bg} ${meta.ring} ${
                running ? 'ring-2' : ''}`
                }>
                
                <Icon className={`h-3.5 w-3.5 ${meta.text} ${running ? 'animate-spin' : ''}`} aria-hidden="true" />
              </span>

              <div className="rounded-lg border border-line bg-panel2/60 px-4 py-3 transition-colors duration-150 ease-smooth hover:border-line2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tabular font-mono text-2xs text-fg3">{item.time}</span>
                  <AgentChip name={item.agent} tone={item.agent === 'System' ? 'neutral' : 'ai'} />
                  {running &&
                  <span className="inline-flex items-center gap-1 text-2xs font-medium text-ai">
                      <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-ai" aria-hidden="true" />
                      Running
                    </span>
                  }
                </div>
                <p className="mt-1.5 text-sm font-medium text-fg">
                  {item.action}
                  {running && <span className="text-fg3">…</span>}
                </p>
                {item.detail && <p className="mt-1 text-xs leading-relaxed text-fg2">{item.detail}</p>}
                {item.tools && item.tools.length > 0 &&
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-2xs text-fg3">Tool</span>
                    {item.tools.map((t) =>
                  <ToolChip key={t} name={t} />
                  )}
                  </div>
                }
              </div>
            </div>
          </li>);

      })}
    </ol>);

}