import React from 'react';
import { BotIcon, CheckIcon, LoaderIcon, SearchCodeIcon, GitCompareIcon, WrenchIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusBadge';
import { ToolChip } from '../components/AgentChip';
import { agents } from '../data/mockData';

const agentIcons = {
  investigation: SearchCodeIcon,
  'root-cause': GitCompareIcon,
  recovery: WrenchIcon
};

export function Agents() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Agents"
        subtitle="The three agents that detect, reason about and recover from production incidents.">
        
        <span className="inline-flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-2 text-xs font-medium text-fg2">
          <BotIcon className="h-3.5 w-3.5 text-ai" aria-hidden="true" />
          2 active · 1 waiting
        </span>
      </PageHeader>

      <div className="grid gap-4 xl:grid-cols-3">
        {agents.map((agent) => {
          const Icon = agentIcons[agent.id] || BotIcon;
          return (
            <article key={agent.id} className="flex flex-col rounded-lg border border-line bg-panel">
              <header className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ai/10 ring-1 ring-inset ring-ai/25">
                    <Icon className="h-4 w-4 text-ai" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold tracking-tight text-fg">{agent.name}</h2>
                    <p className="text-2xs text-fg3">Autonomous · human-gated writes</p>
                  </div>
                </div>
                <StatusBadge status={agent.status} kind="agent" pulse={agent.status === 'active'} />
              </header>

              <div className="flex-1 px-5 py-4">
                <p className="text-sm leading-relaxed text-fg2">{agent.purpose}</p>

                <dl className="mt-4 grid grid-cols-3 gap-3 rounded-lg border border-line bg-panel2/50 px-3 py-2.5">
                  <div>
                    <dt className="text-2xs text-fg3">Tasks</dt>
                    <dd className="tabular mt-0.5 text-sm font-semibold text-fg">{agent.tasksCompleted.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs text-fg3">Success</dt>
                    <dd className="tabular mt-0.5 text-sm font-semibold text-ok">{agent.successRate}</dd>
                  </div>
                  <div>
                    <dt className="text-2xs text-fg3">Avg. run</dt>
                    <dd className="tabular mt-0.5 text-sm font-semibold text-fg">{agent.avgRun}</dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <p className="text-2xs font-semibold uppercase tracking-wide text-fg3">Tools</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {agent.tools.map((t) =>
                    <ToolChip key={t} name={t} />
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-2xs font-semibold uppercase tracking-wide text-fg3">Capabilities</p>
                  <ul className="mt-2 space-y-1.5">
                    {agent.capabilities.map((c) =>
                    <li key={c} className="flex items-center gap-2 text-xs text-fg2">
                        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-ok" aria-hidden="true" />
                        {c}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="border-t border-line px-5 py-4">
                <p className="text-2xs font-semibold uppercase tracking-wide text-fg3">Recent activity</p>
                <ul className="mt-2.5 space-y-2.5">
                  {agent.activity.map((a) =>
                  <li key={a.time} className="flex gap-2.5">
                      {a.status === 'running' ?
                    <LoaderIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-ai" aria-hidden="true" /> :

                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok" aria-hidden="true" />
                    }
                      <div className="min-w-0">
                        <p className={`text-xs ${a.status === 'running' ? 'text-fg' : 'text-fg2'}`}>{a.text}</p>
                        <p className="tabular mt-0.5 font-mono text-2xs text-fg3">{a.time}</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </article>);

        })}
      </div>
    </div>);

}