import React from 'react';
import { Link } from 'react-router-dom';
import {
  ActivityIcon,
  AlertTriangleIcon,
  SparklesIcon,
  TimerIcon,
  ServerIcon,
  SirenIcon,
  BotIcon,
  ArrowRightIcon,
  CircleCheckIcon } from
'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { MetricCard } from '../components/MetricCard';
import { Panel } from '../components/Panel';
import { ServiceHealthRow } from '../components/ServiceHealthCard';
import { IncidentCard } from '../components/IncidentCard';
import { ActivityFeed } from '../components/ActivityFeed';
import { HealthChart } from '../components/HealthChart';
import { services, incidents, kpis, dashboardActivity, errorRateSeries } from '../data/mockData';

const kpiIcons = {
  activity: ActivityIcon,
  alert: AlertTriangleIcon,
  sparkles: SparklesIcon,
  timer: TimerIcon
};

export function Dashboard({ environment }) {
  const open = incidents.filter((i) => i.status !== 'resolved');
  const primary = open[0];
  const rest = open.slice(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Incident Command Center"
        subtitle="Monitor production health and investigate incidents with AI.">
        
        <span className="inline-flex items-center gap-2 rounded-md border border-ok/25 bg-ok/[0.06] px-3 py-2 text-xs font-semibold text-ok">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-breathe rounded-full bg-ok/60" aria-hidden="true" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
          </span>
          {environment} — Operational
        </span>
        <Link
          to="/incidents"
          className="inline-flex items-center gap-1.5 rounded-md border border-line2 bg-panel2 px-3 py-2 text-xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3">
          
          <SirenIcon className="h-3.5 w-3.5" aria-hidden="true" />
          All incidents
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) =>
        <MetricCard
          key={k.key}
          label={k.label}
          value={k.value}
          icon={kpiIcons[k.icon]}
          trend={k.trend}
          delta={k.delta}
          tone={k.tone}
          inverse={k.inverse}
          emphasis={k.key === 'critical'} />

        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section>
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-fg">Active Incidents</h2>
                <p className="mt-0.5 text-xs text-fg3">{open.length} open · 1 requires attention now</p>
              </div>
              <Link
                to="/incidents"
                className="inline-flex items-center gap-1 text-xs font-medium text-fg2 transition-colors duration-150 ease-smooth hover:text-fg">
                
                View all
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="space-y-4">
              {primary && <IncidentCard incident={primary} dominant />}
              <div className="grid gap-4 lg:grid-cols-2">
                {rest.map((inc) =>
                <IncidentCard key={inc.id} incident={inc} />
                )}
              </div>
            </div>
          </section>

          <Panel
            title="Service Health"
            subtitle="Live error rate and p95 latency across production services"
            icon={ServerIcon}
            bodyClassName=""
            action={
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-xs font-medium text-fg2 transition-colors duration-150 ease-smooth hover:text-fg">
              
                All services
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }>
            
            <div className="divide-y divide-line">
              {services.slice(0, 4).map((s) =>
              <ServiceHealthRow key={s.id} service={s} />
              )}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Payment Service Error Rate" subtitle="Last 9 minutes · %" icon={ActivityIcon}>
            <HealthChart
              data={errorRateSeries}
              color="#f04438"
              unit="%"
              height={168}
              markerX="08:23"
              markerLabel="v2.4"
              gradientId="dash-err" />
            
          </Panel>

          <Panel
            title="AI Activity"
            subtitle="Live agent execution stream"
            icon={BotIcon}
            bodyClassName=""
            action={
            <Link
              to="/agents"
              className="inline-flex items-center gap-1 text-xs font-medium text-fg2 transition-colors duration-150 ease-smooth hover:text-fg">
              
                Agents
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }>
            
            <ActivityFeed items={dashboardActivity} />
            <div className="flex items-center gap-2 border-t border-line px-5 py-3 text-2xs text-fg3">
              <CircleCheckIcon className="h-3.5 w-3.5 text-ok" aria-hidden="true" />
              3 agents connected · 2,104 tasks completed today
            </div>
          </Panel>
        </div>
      </div>
    </div>);

}