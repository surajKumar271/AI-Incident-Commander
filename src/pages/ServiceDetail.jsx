import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ActivityIcon, TimerIcon, GaugeIcon, GitBranchIcon, ServerIcon } from 'lucide-react';
import { Panel } from '../components/Panel';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { SeverityBadge } from '../components/SeverityBadge';
import { HealthChart } from '../components/HealthChart';
import { EmptyState } from '../components/PageHeader';
import { getService, incidents } from '../data/mockData';
import { healthMeta } from '../utils/status';

export function ServiceDetail() {
  const { id } = useParams();
  const service = getService(id);

  if (!service) {
    return (
      <div className="rounded-lg border border-line bg-panel">
        <EmptyState
          icon={ServerIcon}
          title="Service not found"
          description="This service is not registered in the current environment."
          action={
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 rounded-md border border-line2 bg-panel2 px-3 py-2 text-xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3">
            
              <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Back to Services
            </Link>
          } />
        
      </div>);

  }

  const meta = healthMeta[service.status];
  const related = incidents.filter((i) => i.serviceId === service.id);
  const unhealthy = service.status !== 'healthy';
  const latency = service.latency >= 1000 ? `${(service.latency / 1000).toFixed(1)}s` : `${service.latency}ms`;

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-fg3 transition-colors duration-150 ease-smooth hover:text-fg">
          
          <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Services
        </Link>
        <div className="mt-3 flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-fg">{service.name}</h1>
              <StatusBadge status={service.status} kind="health" pulse={unhealthy} />
            </div>
            <p className="mt-1 text-sm text-fg2">
              Owned by {service.owner} · uptime {service.uptime} · last incident {service.lastIncident}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-2 text-xs text-fg2">
            <GitBranchIcon className="h-3.5 w-3.5 text-fg3" aria-hidden="true" />
            <span className="font-mono text-fg">{service.deployment}</span>
            <span className="text-fg3">deployed {service.deployedAt}</span>
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Error rate"
          value={`${service.errorRate}%`}
          icon={ActivityIcon}
          trend={unhealthy ? 'up' : 'flat'}
          delta={unhealthy ? 'Above SLO threshold' : 'Within SLO'}
          tone={unhealthy ? 'crit' : 'ok'}
          emphasis={service.status === 'critical'} />
        
        <MetricCard label="Latency (p95)" value={latency} icon={TimerIcon} trend={unhealthy ? 'up' : 'flat'} delta={unhealthy ? 'Degraded' : 'Nominal'} tone={unhealthy ? 'warn' : 'ok'} />
        <MetricCard label="Requests" value={service.rpm} sub="/min" icon={GaugeIcon} trend="flat" delta="Stable" tone="neutral" />
        <MetricCard label="Open incidents" value={String(related.filter((i) => i.status !== 'resolved').length).padStart(2, '0')} icon={ServerIcon} trend="flat" delta={`${related.length} total logged`} tone="neutral" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Error rate" subtitle="Last 9 minutes · %" icon={ActivityIcon}>
          <HealthChart data={service.history} color={meta.hex} unit="%" gradientId={`svc-${service.id}`} />
        </Panel>
        <Panel title="Incident history" subtitle="All incidents recorded for this service" icon={ServerIcon} bodyClassName="">
          {related.length === 0 ?
          <EmptyState icon={ServerIcon} title="No incidents recorded" description="This service has been stable for the retention window." /> :

          <ul className="divide-y divide-line">
              {related.map((i) =>
            <li key={i.id}>
                  <Link
                to={`/incidents/${i.id}`}
                className="flex items-center justify-between gap-4 px-5 py-3 transition-colors duration-150 ease-smooth hover:bg-white/[0.025]">
                
                    <div className="min-w-0">
                      <span className="font-mono text-2xs text-fg3">{i.id}</span>
                      <p className="mt-0.5 truncate text-sm text-fg">{i.title}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <SeverityBadge severity={i.severity} />
                      <span className="tabular text-2xs text-fg3">{i.startedShort}</span>
                    </div>
                  </Link>
                </li>
            )}
            </ul>
          }
        </Panel>
      </div>
    </div>);

}