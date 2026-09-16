import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SirenIcon } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';
import { AgentChip } from './AgentChip';
import { ConfidenceBar } from './ConfidenceBar';
import { EmptyState } from './PageHeader';

const columns = ['Incident', 'Severity', 'Service', 'Status', 'Started', 'AI Confidence', 'Assigned Agent', ''];

export function IncidentTable({ incidents, loading = false }) {
  if (loading) {
    return (
      <div className="divide-y divide-line" aria-busy="true" aria-label="Loading incidents">
        {[0, 1, 2, 3, 4].map((i) =>
        <div key={i} className="flex items-center gap-4 px-5 py-4">
            <div className="h-3 w-20 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-3 flex-1 animate-pulse rounded bg-white/[0.05]" />
            <div className="h-3 w-24 animate-pulse rounded bg-white/[0.05]" />
            <div className="h-3 w-16 animate-pulse rounded bg-white/[0.04]" />
          </div>
        )}
      </div>);

  }

  if (!incidents.length) {
    return (
      <EmptyState
        icon={SirenIcon}
        title="No incidents match these filters"
        description="Try clearing the search field or widening the severity, status and service filters." />);


  }

  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="w-full min-w-[1000px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {columns.map((c, i) =>
            <th
              key={c || i}
              scope="col"
              className="px-5 py-2.5 text-2xs font-semibold uppercase tracking-wide text-fg3">
              
                {c}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {incidents.map((inc) =>
          <tr key={inc.id} className="group transition-colors duration-150 ease-smooth hover:bg-white/[0.025]">
              <td className="px-5 py-3.5 align-middle">
                <Link to={`/incidents/${inc.id}`} className="block max-w-[280px]">
                  <span className="font-mono text-2xs text-fg3">{inc.id}</span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-fg group-hover:text-white">{inc.title}</span>
                </Link>
              </td>
              <td className="px-5 py-3.5 align-middle">
                <SeverityBadge severity={inc.severity} />
              </td>
              <td className="px-5 py-3.5 align-middle text-sm text-fg2">{inc.service}</td>
              <td className="px-5 py-3.5 align-middle">
                <StatusBadge status={inc.status} kind="incident" pulse={inc.status === 'investigating'} />
              </td>
              <td className="tabular px-5 py-3.5 align-middle text-sm text-fg2">{inc.startedShort}</td>
              <td className="px-5 py-3.5 align-middle">
                <div className="w-28">
                  <ConfidenceBar
                  value={inc.confidence}
                  label={null}
                  size="sm"
                  tone={inc.confidence >= 85 ? 'ok' : inc.confidence >= 70 ? 'ai' : 'warn'}
                  showValue={false} />
                
                  <span className="tabular mt-1 block text-2xs text-fg2">{inc.confidence}%</span>
                </div>
              </td>
              <td className="px-5 py-3.5 align-middle">
                <AgentChip name={inc.agent} />
              </td>
              <td className="px-5 py-3.5 text-right align-middle">
                <Link
                to={`/incidents/${inc.id}`}
                className="inline-flex items-center gap-1 rounded-md border border-line2 bg-panel2 px-2.5 py-1.5 text-2xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3"
                aria-label={`View ${inc.id}`}>
                
                  View
                  <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}