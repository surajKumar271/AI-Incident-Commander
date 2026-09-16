import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircleIcon, UserCheckIcon, BotIcon } from 'lucide-react';
import { PageHeader, EmptyState } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusBadge';
import { actionHistory } from '../data/mockData';

const filters = [
{ value: 'all', label: 'All' },
{ value: 'pending', label: 'Pending approval' },
{ value: 'executing', label: 'Executing' },
{ value: 'completed', label: 'Completed' },
{ value: 'rejected', label: 'Rejected' }];


const riskTone = {
  Low: 'text-ok',
  Medium: 'text-warn',
  High: 'text-crit'
};

export function Actions() {
  const [filter, setFilter] = useState('all');
  const rows = filter === 'all' ? actionHistory : actionHistory.filter((a) => a.status === filter);
  const pending = actionHistory.filter((a) => a.status === 'pending');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Actions"
        subtitle="Every recovery action requested by an agent, and who authorized it.">
        
        <span className="inline-flex items-center gap-2 rounded-md border border-warn/25 bg-warn/[0.06] px-3 py-2 text-xs font-semibold text-warn">
          <UserCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {pending.length} awaiting approval
        </span>
      </PageHeader>

      {pending.length > 0 &&
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-warn/35 bg-warn/[0.05] px-5 py-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-fg">{pending[0].action}</p>
            <p className="mt-1 text-xs text-fg2">
              Requested by {pending[0].requestedBy} for{' '}
              <Link to={`/incidents/${pending[0].incident}`} className="font-mono text-fg underline decoration-line2 underline-offset-2">
                {pending[0].incident}
              </Link>{' '}
              · {pending[0].risk} risk
            </p>
          </div>
          <Link
          to={`/incidents/${pending[0].incident}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-ai px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-150 ease-smooth hover:bg-ai/85">
          
            <PlayCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Review request
          </Link>
        </div>
      }

      <div className="rounded-lg border border-line bg-panel">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-line px-4 py-3">
          {filters.map((f) =>
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium ring-1 ring-inset transition-colors duration-150 ease-smooth ${
            filter === f.value ? 'bg-ai/10 text-ai ring-ai/30' : 'bg-panel text-fg2 ring-line hover:text-fg'}`
            }>
            
              {f.label}
            </button>
          )}
        </div>

        {rows.length === 0 ?
        <EmptyState icon={PlayCircleIcon} title="No actions in this state" description="Try a different filter to see the full action history." /> :

        <div className="overflow-x-auto scroll-thin">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-line">
                  {['Action', 'Incident', 'Requested By', 'Approved By', 'Status', 'Timestamp'].map((c) =>
                <th key={c} scope="col" className="px-5 py-2.5 text-2xs font-semibold uppercase tracking-wide text-fg3">
                      {c}
                    </th>
                )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((a) =>
              <tr key={a.id} className="transition-colors duration-150 ease-smooth hover:bg-white/[0.025]">
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-fg">{a.action}</p>
                      <p className="mt-0.5 text-2xs text-fg3">
                        {a.id} · <span className={riskTone[a.risk]}>{a.risk} risk</span>
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link to={`/incidents/${a.incident}`} className="font-mono text-xs text-fg2 transition-colors duration-150 ease-smooth hover:text-fg">
                        {a.incident}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-fg2">
                        <BotIcon className="h-3.5 w-3.5 text-ai" aria-hidden="true" />
                        {a.requestedBy}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-fg2">
                        {a.approvedBy !== '—' && <UserCheckIcon className="h-3.5 w-3.5 text-ok" aria-hidden="true" />}
                        {a.approvedBy}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={a.status} kind="action" pulse={a.status === 'executing'} />
                    </td>
                    <td className="tabular px-5 py-3.5 font-mono text-2xs text-fg3">{a.time}</td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>);

}