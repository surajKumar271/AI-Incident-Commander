import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ActivityIcon,
  TimerIcon,
  GaugeIcon,
  DatabaseIcon,
  ClockIcon,
  ServerIcon,
  GitBranchIcon,
  GlobeIcon,
  SparklesIcon,
  BotIcon,
  FileSearchIcon,
  LayersIcon,
  SirenIcon } from
'lucide-react';
import { Panel } from '../components/Panel';
import { MetricCard } from '../components/MetricCard';
import { SeverityBadge } from '../components/SeverityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { HealthChart } from '../components/HealthChart';
import { EmptyState } from '../components/PageHeader';
import { AgentTimeline } from '../components/incident/AgentTimeline';
import { LifecycleRail } from '../components/incident/LifecycleRail';
import { RootCauseCard } from '../components/incident/RootCauseCard';
import { HypothesisCard } from '../components/incident/HypothesisCard';
import { EvidenceTabs } from '../components/incident/EvidenceTabs';
import { RecoveryCard } from '../components/incident/RecoveryCard';
import { ApprovalModal } from '../components/incident/ApprovalModal';
import {
  getIncident,
  investigationTimeline,
  rootCause,
  alternativeHypotheses,
  appLogs,
  dbLogs,
  metricEvidence,
  commits,
  deployments,
  recovery,
  recoverySteps,
  recoveryVerification,
  errorRateSeries,
  latencySeries,
  connectionsSeries } from
'../data/mockData';

export function IncidentDetails() {
  const { id } = useParams();
  const incident = getIncident(id);
  const resolved = incident && incident.phase === 'resolved';

  const [state, setState] = useState(resolved ? 'complete' : 'pending');
  const [completed, setCompleted] = useState(resolved ? recoverySteps.length : 0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setState(resolved ? 'complete' : 'pending');
    setCompleted(resolved ? recoverySteps.length : 0);
    setModalOpen(false);
  }, [id, resolved]);

  useEffect(() => {
    if (state !== 'executing') return undefined;
    if (completed >= recoverySteps.length) {
      const done = setTimeout(() => setState('complete'), 900);
      return () => clearTimeout(done);
    }
    const t = setTimeout(() => setCompleted((c) => c + 1), 1400);
    return () => clearTimeout(t);
  }, [state, completed]);

  const timeline = useMemo(() => {
    if (state === 'pending' || state === 'rejected') return investigationTimeline;
    return investigationTimeline.map((item, i) =>
    i === investigationTimeline.length - 1 ?
    { ...item, status: 'done', action: 'Recommended rollback v2.4 → v2.3', detail: 'Recommendation approved by on-call engineer.' } :
    item
    );
  }, [state]);

  if (!incident) {
    return (
      <div className="rounded-lg border border-line bg-panel">
        <EmptyState
          icon={SirenIcon}
          title="Incident not found"
          description="This incident may have been merged into another investigation or archived."
          action={
          <Link
            to="/incidents"
            className="inline-flex items-center gap-1.5 rounded-md border border-line2 bg-panel2 px-3 py-2 text-xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3">
            
              <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Back to Incidents
            </Link>
          } />
        
      </div>);

  }

  const lifecycleStage = state === 'complete' ? 8 : state === 'executing' ? 7 : 5;
  const statusLabel =
  state === 'complete' ? 'Incident Resolved' : state === 'executing' ? 'Executing Recovery' : 'AI Investigation in Progress';

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/incidents"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-fg3 transition-colors duration-150 ease-smooth hover:text-fg">
          
          <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Incidents
        </Link>

        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-fg3">{incident.id}</span>
              <SeverityBadge severity={incident.severity} size="md" uppercase />
              <StatusBadge status={state === 'complete' ? 'resolved' : incident.status} kind="incident" pulse={state !== 'complete'} />
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-fg">{incident.detailTitle}</h1>
            <p
              className={`mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium ${
              state === 'complete' ? 'text-ok' : 'text-ai'}`
              }>
              
              <SparklesIcon className={`h-4 w-4 ${state === 'complete' ? '' : 'animate-breathe'}`} aria-hidden="true" />
              {statusLabel}
            </p>
          </div>

          <dl className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-3 rounded-lg border border-line bg-panel px-4 py-3.5 sm:grid-cols-4 lg:w-auto">
            <div>
              <dt className="flex items-center gap-1.5 text-2xs text-fg3">
                <ClockIcon className="h-3 w-3" aria-hidden="true" />
                Started
              </dt>
              <dd className="mt-1 whitespace-nowrap text-xs font-medium text-fg">{incident.startedAgo}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-2xs text-fg3">
                <ServerIcon className="h-3 w-3" aria-hidden="true" />
                Service
              </dt>
              <dd className="mt-1 whitespace-nowrap text-xs font-medium text-fg">{incident.service}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-2xs text-fg3">
                <GitBranchIcon className="h-3 w-3" aria-hidden="true" />
                Deployment
              </dt>
              <dd className="mt-1 whitespace-nowrap font-mono text-xs font-medium text-fg">
                {state === 'complete' ? recovery.to : incident.deployment}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-2xs text-fg3">
                <GlobeIcon className="h-3 w-3" aria-hidden="true" />
                Environment
              </dt>
              <dd className="mt-1 whitespace-nowrap text-xs font-medium text-fg">{incident.environment}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-4 overflow-x-auto scroll-thin pb-1">
          <LifecycleRail current={lifecycleStage} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Error Rate" value="18.4%" icon={ActivityIcon} trend="up" delta="↑ 17.6% vs. baseline" tone="crit" emphasis />
        <MetricCard label="Latency (p95)" value="4.7s" icon={TimerIcon} trend="up" delta="↑ 4.2s vs. baseline" tone="crit" emphasis />
        <MetricCard label="Requests" value="12.4K" sub="/min" icon={GaugeIcon} trend="flat" delta="+4% vs. 7-day" tone="neutral" />
        <MetricCard label="Database Connections" value="100" sub="/ 100" icon={DatabaseIcon} trend="up" delta="Pool saturated" tone="crit" emphasis />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Error Rate" subtitle="payment-api · % of requests failing" icon={ActivityIcon}>
          <HealthChart data={errorRateSeries} color="#f04438" unit="%" markerX="08:23" markerLabel="v2.4 deploy" gradientId="err" />
        </Panel>
        <Panel title="Latency" subtitle="payment-api · p95 response time (ms)" icon={TimerIcon}>
          <HealthChart data={latencySeries} color="#f5a524" unit="ms" markerX="08:23" markerLabel="v2.4 deploy" gradientId="lat" />
        </Panel>
        <Panel title="Database Connections" subtitle="pg-primary · active connections of 100" icon={DatabaseIcon}>
          <HealthChart data={connectionsSeries} color="#6366f1" unit=" conns" domain={[0, 110]} gradientId="conn" />
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <Panel
          title="AI Investigation"
          subtitle="Agent execution trace with tool calls"
          icon={BotIcon}
          action={<StatusBadge status={state === 'pending' || state === 'rejected' ? 'investigating' : 'resolved'} kind="incident" pulse={state === 'pending'} />}>
          
          <AgentTimeline items={timeline} />
        </Panel>

        <div className="space-y-6">
          <RootCauseCard rootCause={rootCause} />

          <section>
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-fg">Alternative Hypotheses</h2>
                <p className="mt-0.5 text-xs text-fg3">Ranked and scored against the same evidence set</p>
              </div>
              <span className="text-2xs text-fg3">Root Cause Agent</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {alternativeHypotheses.map((h) =>
              <HypothesisCard key={h.name} hypothesis={h} />
              )}
            </div>
          </section>

          <RecoveryCard
            recovery={recovery}
            state={state}
            steps={recoverySteps}
            completed={completed}
            verification={recoveryVerification}
            onApprove={() => setModalOpen(true)}
            onReject={() => setState('rejected')}
            onReset={() => setState('pending')} />
          
        </div>
      </div>

      <Panel title="Evidence" subtitle="Raw data collected by the Investigation Agent" icon={FileSearchIcon} bodyClassName="">
        <EvidenceTabs appLogs={appLogs} dbLogs={dbLogs} metrics={metricEvidence} commits={commits} deployments={deployments} />
      </Panel>

      <Panel title="Related Context" subtitle="Signals the agents considered outside this service" icon={LayersIcon}>
        <ul className="grid gap-3 md:grid-cols-3">
          <li className="rounded-lg border border-line bg-panel2/50 px-4 py-3">
            <p className="text-xs font-medium text-fg">Database degraded</p>
            <p className="mt-1 text-2xs text-fg3">Shared pg-primary is also serving the Database incident INC-1040.</p>
          </li>
          <li className="rounded-lg border border-line bg-panel2/50 px-4 py-3">
            <p className="text-xs font-medium text-fg">No traffic anomaly</p>
            <p className="mt-1 text-2xs text-fg3">Requests up only 4% versus 7-day baseline for this hour.</p>
          </li>
          <li className="rounded-lg border border-line bg-panel2/50 px-4 py-3">
            <p className="text-xs font-medium text-fg">Prior similar incident</p>
            <p className="mt-1 text-2xs text-fg3">INC-0894 resolved by pool-size rollback in 6 minutes.</p>
          </li>
        </ul>
      </Panel>

      <ApprovalModal
        open={modalOpen}
        recovery={recovery}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          setCompleted(1);
          setState('executing');
        }} />
      
    </div>);

}