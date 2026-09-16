import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, ArrowDownRightIcon, MinusIcon, ClockIcon, ServerIcon, GitBranchIcon, SparklesIcon, ArrowRightIcon } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';
import { severityMeta, trendTone } from '../utils/status';

function Trend({ direction, inverse }) {
  const Icon = direction === 'up' ? ArrowUpRightIcon : direction === 'down' ? ArrowDownRightIcon : MinusIcon;
  return <Icon className={`h-3.5 w-3.5 ${trendTone(direction, inverse)}`} aria-hidden="true" />;
}

export function IncidentCard({ incident, dominant = false }) {
  const meta = severityMeta[incident.severity];
  const isOpen = incident.status !== 'resolved';

  return (
    <article
      className={`rounded-lg border bg-panel transition-colors duration-150 ease-smooth ${
      dominant ? 'border-crit/40' : 'border-line hover:border-line2'}`
      }>
      
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-2xs text-fg3">{incident.id}</span>
            <SeverityBadge severity={incident.severity} uppercase={dominant} />
            <StatusBadge status={incident.status} kind="incident" pulse={isOpen} />
          </div>
          <h3 className={`mt-2 font-semibold tracking-tight text-fg ${dominant ? 'text-lg' : 'text-sm'}`}>{incident.title}</h3>
        </div>
        <Link
          to={`/incidents/${incident.id}`}
          className={`hidden shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors duration-150 ease-smooth sm:inline-flex ${
          dominant ? 'bg-ai text-white hover:bg-ai/85' : 'border border-line2 bg-panel2 text-fg hover:border-fg3'}`
          }>
          
          View Investigation
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <dl className="grid grid-cols-2 divide-line border-b border-line sm:grid-cols-4 sm:divide-x">
        <div className="border-b border-line px-5 py-3 sm:border-b-0">
          <dt className="text-2xs text-fg3">Error rate</dt>
          <dd className="mt-1 flex items-center gap-1.5">
            <span className={`tabular text-sm font-semibold ${isOpen ? meta.text : 'text-fg'}`}>{incident.errorRate}</span>
            <Trend direction={incident.errorTrend} />
          </dd>
        </div>
        <div className="border-b border-line px-5 py-3 sm:border-b-0">
          <dt className="text-2xs text-fg3">Latency</dt>
          <dd className="mt-1 flex items-center gap-1.5">
            <span className={`tabular text-sm font-semibold ${isOpen ? meta.text : 'text-fg'}`}>{incident.latency}</span>
            <Trend direction={incident.latencyTrend} />
          </dd>
        </div>
        <div className="px-5 py-3">
          <dt className="text-2xs text-fg3">Started</dt>
          <dd className="mt-1 flex items-center gap-1.5 text-sm text-fg">
            <ClockIcon className="h-3.5 w-3.5 text-fg3" aria-hidden="true" />
            {incident.startedAgo}
          </dd>
        </div>
        <div className="px-5 py-3">
          <dt className="text-2xs text-fg3">Affected service</dt>
          <dd className="mt-1 flex items-center gap-1.5 truncate text-sm text-fg">
            <ServerIcon className="h-3.5 w-3.5 shrink-0 text-fg3" aria-hidden="true" />
            <span className="truncate">{incident.service}</span>
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-2xs text-fg3">
            <GitBranchIcon className="h-3 w-3" aria-hidden="true" />
            Deployment <span className="font-mono text-fg2">{incident.deployment}</span>
          </span>
          <span className={`inline-flex items-center gap-1.5 text-xs ${isOpen ? 'text-ai' : 'text-ok'}`}>
            <SparklesIcon className={`h-3.5 w-3.5 ${isOpen ? 'animate-breathe' : ''}`} aria-hidden="true" />
            {incident.aiStatus}
          </span>
        </div>
        <Link
          to={`/incidents/${incident.id}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-line2 bg-panel2 px-3 py-1.5 text-xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3 sm:hidden">
          
          View Investigation
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>);

}