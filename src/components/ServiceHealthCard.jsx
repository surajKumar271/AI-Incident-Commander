import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, ServerIcon, GitBranchIcon, ClockIcon } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Sparkline } from './HealthChart';
import { healthMeta } from '../utils/status';

function fmtLatency(ms) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

// Compact row used in the dashboard service-health panel.
export function ServiceHealthRow({ service }) {
  const meta = healthMeta[service.status];
  const unhealthy = service.status !== 'healthy';
  return (
    <Link
      to={`/services/${service.id}`}
      className="group grid grid-cols-[1.4fr_auto] items-center gap-3 px-5 py-3 transition-colors duration-150 ease-smooth hover:bg-white/[0.025] sm:grid-cols-[1.6fr_110px_100px_100px_20px]">
      
      <div className="flex min-w-0 items-center gap-2.5">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot} ${unhealthy ? 'animate-breathe' : ''}`} aria-hidden="true" />
        <span className="truncate text-sm font-medium text-fg">{service.name}</span>
      </div>
      <div className="justify-self-end sm:justify-self-start">
        <StatusBadge status={service.status} kind="health" />
      </div>
      <div className="hidden sm:block">
        <p className="text-2xs text-fg3">Error rate</p>
        <p className={`tabular text-sm font-medium ${unhealthy ? meta.text : 'text-fg'}`}>{service.errorRate}%</p>
      </div>
      <div className="hidden sm:block">
        <p className="text-2xs text-fg3">Latency</p>
        <p className={`tabular text-sm font-medium ${unhealthy ? meta.text : 'text-fg'}`}>{fmtLatency(service.latency)}</p>
      </div>
      <ChevronRightIcon className="hidden h-4 w-4 text-fg3 transition-colors duration-150 ease-smooth group-hover:text-fg2 sm:block" aria-hidden="true" />
    </Link>);

}

// Full card used on the Services page.
export function ServiceHealthCard({ service }) {
  const meta = healthMeta[service.status];
  return (
    <Link
      to={`/services/${service.id}`}
      className={`group flex flex-col rounded-lg border bg-panel p-4 transition-colors duration-150 ease-smooth ${
      service.status === 'critical' ? 'border-crit/40 hover:border-crit/60' : 'border-line hover:border-line2'}`
      }>
      
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-panel2">
            <ServerIcon className={`h-4 w-4 ${meta.text}`} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-fg">{service.name}</p>
            <p className="truncate text-2xs text-fg3">{service.owner}</p>
          </div>
        </div>
        <StatusBadge status={service.status} kind="health" pulse={service.status !== 'healthy'} />
      </div>

      <div className="mt-4">
        <Sparkline data={service.history} color={meta.hex} gradientId={`spark-${service.id}`} />
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-3 border-t border-line pt-3">
        <div>
          <dt className="text-2xs text-fg3">Error rate</dt>
          <dd className={`tabular mt-0.5 text-sm font-medium ${service.status === 'healthy' ? 'text-fg' : meta.text}`}>{service.errorRate}%</dd>
        </div>
        <div>
          <dt className="text-2xs text-fg3">Latency</dt>
          <dd className={`tabular mt-0.5 text-sm font-medium ${service.status === 'healthy' ? 'text-fg' : meta.text}`}>{fmtLatency(service.latency)}</dd>
        </div>
        <div>
          <dt className="text-2xs text-fg3">Requests</dt>
          <dd className="tabular mt-0.5 text-sm font-medium text-fg">{service.rpm}/min</dd>
        </div>
      </dl>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3 text-2xs text-fg3">
        <span className="inline-flex items-center gap-1.5">
          <GitBranchIcon className="h-3 w-3" aria-hidden="true" />
          <span className="font-mono text-fg2">{service.deployment}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="h-3 w-3" aria-hidden="true" />
          Last incident {service.lastIncident}
        </span>
      </div>
    </Link>);

}