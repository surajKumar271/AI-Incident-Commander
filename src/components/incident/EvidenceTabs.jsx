import React, { useState } from 'react';
import { ScrollTextIcon, ActivityIcon, GitCommitHorizontalIcon, RocketIcon, AlertTriangleIcon, CheckCircle2Icon, FileCodeIcon } from 'lucide-react';
import { LogViewer } from './LogViewer';
import { healthMeta } from '../../utils/status';

const tabs = [
{ id: 'logs', label: 'Logs', icon: ScrollTextIcon },
{ id: 'metrics', label: 'Metrics', icon: ActivityIcon },
{ id: 'github', label: 'GitHub', icon: GitCommitHorizontalIcon },
{ id: 'deployments', label: 'Deployments', icon: RocketIcon }];


function MetricsTab({ metrics }) {
  return (
    <ul className="divide-y divide-line rounded-lg border border-line">
      {metrics.map((m) => {
        const meta = healthMeta[m.tone] || healthMeta.healthy;
        return (
          <li key={m.name} className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-mono text-xs text-fg">{m.name}</p>
              <p className="mt-0.5 text-2xs text-fg3">{m.note}</p>
            </div>
            <span className={`tabular shrink-0 text-sm font-semibold ${m.tone === 'healthy' ? 'text-fg' : meta.text}`}>{m.value}</span>
          </li>);

      })}
    </ul>);

}

function GithubTab({ commits }) {
  return (
    <div className="space-y-3">
      {commits.map((c) =>
      <div key={c.sha} className={`rounded-lg border bg-panel2/50 ${c.flagged ? 'border-warn/40' : 'border-line'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <GitCommitHorizontalIcon className="h-4 w-4 shrink-0 text-fg3" aria-hidden="true" />
              <span className="rounded border border-line2 bg-panel px-1.5 py-0.5 font-mono text-2xs text-fg">{c.sha}</span>
              <span className="truncate text-xs text-fg2">{c.author}</span>
              <span className="tabular font-mono text-2xs text-fg3">{c.time}</span>
            </div>
            {c.flagged &&
          <span className="inline-flex items-center gap-1.5 rounded-md bg-warn/10 px-2 py-0.5 text-2xs font-semibold text-warn ring-1 ring-inset ring-warn/25">
                <AlertTriangleIcon className="h-3 w-3" aria-hidden="true" />
                Correlated with incident
              </span>
          }
          </div>
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-fg">“{c.message}”</p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-2xs text-fg3">
              <FileCodeIcon className="h-3 w-3" aria-hidden="true" />
              {c.file}
            </p>
            <div className="mt-3 overflow-hidden rounded-md border border-line bg-[#060709] font-mono text-xs">
              {c.diff.map((line, i) =>
            <div
              key={i}
              className={`flex gap-2 px-3 py-1 ${
              line.type === 'add' ? 'bg-ok/[0.07] text-ok' : line.type === 'del' ? 'bg-crit/[0.07] text-crit' : 'text-fg3'}`
              }>
              
                  <span className="w-3 shrink-0 select-none">{line.type === 'add' ? '+' : line.type === 'del' ? '−' : ' '}</span>
                  <span className="whitespace-pre">{line.text}</span>
                </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>);

}

function DeploymentsTab({ deployments }) {
  return (
    <ul className="space-y-2.5">
      {deployments.map((d) => {
        const active = d.status === 'active';
        return (
          <li
            key={d.version}
            className={`flex flex-wrap items-center justify-between gap-4 rounded-lg border px-4 py-3 ${
            active ? 'border-crit/35 bg-crit/[0.04]' : 'border-line bg-panel2/50'}`
            }>
            
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-fg">{d.version}</span>
                <span
                  className={`rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${
                  active ? 'bg-crit/10 text-crit ring-crit/25' : 'bg-white/5 text-fg2 ring-line2'}`
                  }>
                  
                  {active ? 'Active' : d.status === 'previous' ? 'Previous' : 'Superseded'}
                </span>
              </div>
              <p className="mt-1 text-xs text-fg2">{d.note}</p>
            </div>
            <dl className="flex items-center gap-6 text-2xs text-fg3">
              <div>
                <dt>Deployed</dt>
                <dd className="tabular mt-0.5 text-xs text-fg">{d.time}</dd>
              </div>
              <div>
                <dt>Commits</dt>
                <dd className="tabular mt-0.5 text-xs text-fg">{d.commits}</dd>
              </div>
              <div>
                <dt>By</dt>
                <dd className="mt-0.5 font-mono text-xs text-fg">{d.author}</dd>
              </div>
            </dl>
          </li>);

      })}
    </ul>);

}

export function EvidenceTabs({ appLogs, dbLogs, metrics, commits, deployments }) {
  const [active, setActive] = useState('logs');

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-line px-2" role="tablist" aria-label="Evidence sources">
        {tabs.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={`-mb-px inline-flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors duration-150 ease-smooth ${
              isActive ? 'border-ai text-fg' : 'border-transparent text-fg3 hover:text-fg2'}`
              }>
              
              <t.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {t.label}
            </button>);

        })}
      </div>

      <div className="p-5" role="tabpanel">
        {active === 'logs' &&
        <div className="space-y-4">
            <LogViewer logs={appLogs} title="payment-api · application logs" />
            <LogViewer logs={dbLogs} title="pg-primary · database logs" filterable={false} />
            <p className="inline-flex items-center gap-1.5 text-2xs text-fg3">
              <CheckCircle2Icon className="h-3 w-3 text-ok" aria-hidden="true" />
              Collected by Investigation Agent via <span className="font-mono text-fg2">get_logs()</span> at 08:31:04
            </p>
          </div>
        }
        {active === 'metrics' && <MetricsTab metrics={metrics} />}
        {active === 'github' && <GithubTab commits={commits} />}
        {active === 'deployments' && <DeploymentsTab deployments={deployments} />}
      </div>
    </div>);

}