import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSearchIcon, ScrollTextIcon, DatabaseIcon, GitCommitHorizontalIcon, RocketIcon, ActivityIcon, LayoutListIcon, TableIcon } from 'lucide-react';
import { PageHeader, EmptyState } from '../components/PageHeader';
import { SeverityBadge } from '../components/SeverityBadge';
import { evidenceItems, evidenceSources, incidents } from '../data/mockData';

const sourceIcons = {
  'Application Logs': ScrollTextIcon,
  'Database Logs': DatabaseIcon,
  'GitHub Commits': GitCommitHorizontalIcon,
  Deployments: RocketIcon,
  Metrics: ActivityIcon
};

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2.5 py-1.5 text-xs font-medium ring-1 ring-inset transition-colors duration-150 ease-smooth ${
      active ? 'bg-ai/10 text-ai ring-ai/30' : 'bg-panel text-fg2 ring-line hover:text-fg'}`
      }>
      
      {children}
    </button>);

}

export function Evidence() {
  const [incidentFilter, setIncidentFilter] = useState('all');
  const [source, setSource] = useState('all');
  const [range, setRange] = useState('1h');
  const [severity, setSeverity] = useState('all');
  const [view, setView] = useState('cards');

  const rows = useMemo(
    () =>
    evidenceItems.filter(
      (e) =>
      (incidentFilter === 'all' || e.incident === incidentFilter) && (
      source === 'all' || e.source === source) && (
      severity === 'all' || e.severity === severity)
    ),
    [incidentFilter, source, severity]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Evidence"
        subtitle="Every artifact the Investigation Agent collected, with its source and incident linkage.">
        
        <div className="flex items-center gap-1 rounded-md border border-line bg-panel p-0.5">
          <button
            type="button"
            onClick={() => setView('cards')}
            aria-pressed={view === 'cards'}
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 ease-smooth ${
            view === 'cards' ? 'bg-white/[0.07] text-fg' : 'text-fg3 hover:text-fg2'}`
            }>
            
            <LayoutListIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Cards
          </button>
          <button
            type="button"
            onClick={() => setView('table')}
            aria-pressed={view === 'table'}
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 ease-smooth ${
            view === 'table' ? 'bg-white/[0.07] text-fg' : 'text-fg3 hover:text-fg2'}`
            }>
            
            <TableIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Table
          </button>
        </div>
      </PageHeader>

      <div className="space-y-3 rounded-lg border border-line bg-panel p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-20 text-2xs font-semibold uppercase tracking-wide text-fg3">Incident</span>
          <Chip active={incidentFilter === 'all'} onClick={() => setIncidentFilter('all')}>
            All
          </Chip>
          {incidents.slice(0, 5).map((i) =>
          <Chip key={i.id} active={incidentFilter === i.id} onClick={() => setIncidentFilter(i.id)}>
              {i.id}
            </Chip>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-20 text-2xs font-semibold uppercase tracking-wide text-fg3">Source</span>
          <Chip active={source === 'all'} onClick={() => setSource('all')}>
            All
          </Chip>
          {evidenceSources.map((s) =>
          <Chip key={s} active={source === s} onClick={() => setSource(s)}>
              {s}
            </Chip>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-20 text-2xs font-semibold uppercase tracking-wide text-fg3">Time range</span>
            {['15m', '1h', '24h', '7d'].map((r) =>
            <Chip key={r} active={range === r} onClick={() => setRange(r)}>
                {r}
              </Chip>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xs font-semibold uppercase tracking-wide text-fg3">Severity</span>
            {['all', 'critical', 'warning', 'info', 'resolved'].map((s) =>
            <Chip key={s} active={severity === s} onClick={() => setSeverity(s)}>
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </Chip>
            )}
          </div>
        </div>
      </div>

      <p className="tabular text-2xs text-fg3">
        {rows.length} artifacts · window {range}
      </p>

      {rows.length === 0 ?
      <div className="rounded-lg border border-line bg-panel">
          <EmptyState
          icon={FileSearchIcon}
          title="No evidence matches these filters"
          description="Widen the time range or clear the source and severity filters to see collected artifacts." />
        
        </div> :
      view === 'cards' ?
      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {rows.map((e) => {
          const Icon = sourceIcons[e.source] || FileSearchIcon;
          return (
            <article key={e.id} className="rounded-lg border border-line bg-panel p-4 transition-colors duration-150 ease-smooth hover:border-line2">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-line2 bg-panel2 px-2 py-0.5 text-2xs font-medium text-fg2">
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    {e.source}
                  </span>
                  <SeverityBadge severity={e.severity} />
                </div>
                <p className="mt-3 text-sm font-medium leading-snug text-fg">{e.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-fg3">{e.detail}</p>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3 text-2xs text-fg3">
                  <Link
                  to={`/incidents/${e.incident}`}
                  className="font-mono underline decoration-line2 underline-offset-2 transition-colors duration-150 ease-smooth hover:text-fg2">
                  
                    {e.incident}
                  </Link>
                  <span className="tabular font-mono">{e.time}</span>
                </div>
              </article>);

        })}
        </div> :

      <div className="overflow-x-auto rounded-lg border border-line bg-panel scroll-thin">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-line">
                {['Artifact', 'Source', 'Incident', 'Severity', 'Collected by', 'Time'].map((c) =>
              <th key={c} scope="col" className="px-5 py-2.5 text-2xs font-semibold uppercase tracking-wide text-fg3">
                    {c}
                  </th>
              )}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((e) =>
            <tr key={e.id} className="transition-colors duration-150 ease-smooth hover:bg-white/[0.025]">
                  <td className="px-5 py-3">
                    <p className="max-w-md truncate text-sm text-fg">{e.title}</p>
                    <p className="mt-0.5 max-w-md truncate text-2xs text-fg3">{e.detail}</p>
                  </td>
                  <td className="px-5 py-3 text-xs text-fg2">{e.source}</td>
                  <td className="px-5 py-3">
                    <Link to={`/incidents/${e.incident}`} className="font-mono text-2xs text-fg2 hover:text-fg">
                      {e.incident}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <SeverityBadge severity={e.severity} />
                  </td>
                  <td className="px-5 py-3 text-xs text-fg2">{e.agent}</td>
                  <td className="tabular px-5 py-3 font-mono text-2xs text-fg3">{e.time}</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      }
    </div>);

}