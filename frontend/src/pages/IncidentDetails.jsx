
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  BotIcon,
  ClockIcon,
  FileSearchIcon,
  RefreshCwIcon,
  ServerIcon,
  SparklesIcon,
  SirenIcon,
  WrenchIcon,
} from 'lucide-react';

import { apiFetch } from '../utils/api';
import { SeverityBadge } from '../components/SeverityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/PageHeader';
import { Panel } from '../components/Panel';
import { LogViewer } from '../components/incident/LogViewer';

function formatDate(value) {
  if (!value) return 'Unknown';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown' : date.toLocaleString();
}

function formatConfidence(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'Unavailable';
  }

  // The AI service returns confidence on a 0–1 scale.
  return `${Math.round(value * 100)}%`;
}

function normalizeLog(log) {
  const level = String(log.level || 'INFO').toUpperCase();

  return {
    time: formatDate(log.timestamp),
    level,
    msg: log.message || '',
    src: log.metadata?.source || log.metadata?.host || '',
  };
}

export function IncidentDetails() {
  const { id } = useParams();

  console.log('Incident route ID:', id);
console.log('Parsed incident ID:', Number(id));

  const [incident, setIncident] = useState(null);
  const [logs, setLogs] = useState([]);
  const [serviceName, setServiceName] = useState('Unknown service');
  const [analysisResult, setAnalysisResult] = useState(null);

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [pageError, setPageError] = useState('');
  const [analysisError, setAnalysisError] = useState('');

  const loadIncident = useCallback(async () => {
    setLoading(true);
    setPageError('');

    try {
      const [incidentResponse, logsResponse,analysisResponse] = await Promise.all([
        apiFetch(`/api/incidents/${id}`),
        apiFetch(`/api/logs/incident/${id}`),
        apiFetch(`/api/incidents/${id}/analysis`),
      ]);

      const record = incidentResponse.data;
      const logRecords = logsResponse.data || [];

      if (!record) {
        throw new Error('Incident was not found.');
      }

      setIncident(record);
      setLogs(logRecords);
      setAnalysisResult(analysisResponse.data ?? null);

      // Resolve the service name using the existing services endpoint.
      if (record.serviceId) {
        try {
          const servicesResponse = await apiFetch('/api/services');

          const service = (servicesResponse.data || []).find(
            (item) => Number(item.id) === Number(record.serviceId)
          );

          setServiceName(service?.name || 'Unknown service');
        } catch {
          setServiceName('Unknown service');
        }
      } else {
        setServiceName('No service assigned');
      }
    } catch (error) {
      setPageError(error.message || 'Failed to load incident details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setIncident(null);
    setLogs([]);
    setAnalysisResult(null);
    setAnalysisError('');
    setServiceName('Unknown service');

    loadIncident();
  }, [loadIncident]);

  async function handleAnalyze() {
    setAnalyzing(true);
    setAnalysisError('');

    try {
      const response = await apiFetch(`/api/incidents/${id}/analyze`, {
        method: 'POST',
      });

      if (!response.data?.analysis) {
        throw new Error('The AI service returned no analysis.');
      }

      setAnalysisResult(response.data);
    } catch (error) {
      setAnalysisError(error.message || 'AI analysis failed.');
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-line bg-panel p-6 text-sm text-fg2">
        Loading incident details…
      </div>
    );
  }

  if (pageError || !incident) {
    return (
      <div className="space-y-4 rounded-lg border border-line bg-panel p-6">
        <p className="text-sm text-crit">
          {pageError || 'Incident not found.'}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={loadIncident}
            className="rounded-md border border-line2 px-3 py-2 text-xs font-semibold text-fg"
          >
            Retry
          </button>

          <Link
            to="/incidents"
            className="inline-flex items-center gap-2 rounded-md border border-line2 px-3 py-2 text-xs font-semibold text-fg"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to Incidents
          </Link>
        </div>
      </div>
    );
  }

  const analysis = analysisResult?.analysis;
  const confidence = analysis?.confidence;
  const isResolved =
    String(incident.status || '').toUpperCase() === 'RESOLVED';

  const normalizedLogs = logs.map(normalizeLog);

  return (
    <div className="space-y-6">
      {/* Incident header */}
      <section>
        <Link
          to="/incidents"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-fg3 hover:text-fg"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to Incidents
        </Link>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-fg3">
                INC-{incident.id}
              </span>

              <SeverityBadge severity={incident.severity} />

              <StatusBadge
                status={incident.status}
                kind="incident"
              />
            </div>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-fg">
              {incident.title}
            </h1>

            {incident.description && (
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fg2">
                {incident.description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-ai px-4 py-2.5 text-xs font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCwIcon
              className={`h-3.5 w-3.5 ${analyzing ? 'animate-spin' : ''}`}
            />
            {analyzing ? 'Analyzing…' : 'Analyze with AI'}
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-panel p-4">
            <p className="flex items-center gap-2 text-xs text-fg3">
              <ClockIcon className="h-3.5 w-3.5" />
              Created
            </p>
            <p className="mt-2 text-sm font-medium text-fg">
              {formatDate(incident.createdAt)}
            </p>
          </div>

          <div className="rounded-lg border border-line bg-panel p-4">
            <p className="flex items-center gap-2 text-xs text-fg3">
              <ServerIcon className="h-3.5 w-3.5" />
              Service
            </p>
            <p className="mt-2 text-sm font-medium text-fg">
              {serviceName}
            </p>
          </div>

          <div className="rounded-lg border border-line bg-panel p-4">
            <p className="flex items-center gap-2 text-xs text-fg3">
              <BotIcon className="h-3.5 w-3.5" />
              AI confidence
            </p>
            <p className="mt-2 text-sm font-medium text-fg">
              {formatConfidence(confidence)}
            </p>
            <p className="mt-1 text-2xs text-fg3">
              {analysis ? 'Latest analysis' : 'Run an analysis to populate'}
            </p>
          </div>
        </div>
      </section>

      {/* Errors */}
      {analysisError && (
        <div
          role="alert"
          className="rounded-lg border border-crit/30 bg-crit/10 p-4 text-sm text-crit"
        >
          <p className="font-semibold">AI analysis failed</p>
          <p className="mt-1">{analysisError}</p>
          <p className="mt-2 text-xs">
            Check that the backend and Python AI service are running.
          </p>
        </div>
      )}

      {/* AI analysis */}
      <Panel
        title="AI Investigation"
        subtitle="Investigation, root-cause reasoning and recovery recommendation"
        icon={SparklesIcon}
      >
        {!analysis && !analyzing && (
          <div className="py-6 text-center">
            <BotIcon className="mx-auto h-8 w-8 text-fg3" />

            <p className="mt-3 text-sm font-medium text-fg">
              No analysis run in this session yet
            </p>

            <p className="mt-1 text-xs text-fg3">
              Run the investigation to generate a root cause and recovery recommendation.
            </p>
          </div>
        )}

        {analyzing && (
          <div className="flex items-center gap-3 py-6 text-sm text-fg2">
            <RefreshCwIcon className="h-4 w-4 animate-spin text-ai" />
            The Investigation, Root Cause and Recovery workflow is running…
          </div>
        )}

        {analysis && (
          <div className="space-y-5">
            <section className="rounded-lg border border-ai/30 bg-ai/[0.04] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-fg">
                  Probable root cause
                </h3>

                <span className="rounded-md border border-line px-2 py-1 text-xs font-semibold text-fg">
                  Confidence: {formatConfidence(confidence)}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-fg">
                {analysis.probable_root_cause || 'Root cause not determined.'}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-fg3">
                Reasoning
              </h3>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-fg2">
                {analysis.reasoning || 'No reasoning was returned.'}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-fg3">
                Evidence used
              </h3>

              {analysis.evidence_used?.length > 0 ? (
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-fg2">
                  {analysis.evidence_used.map((item, index) => (
                    <li key={`${index}-${item}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-fg3">
                  No supporting evidence was returned.
                </p>
              )}
            </section>

            <section className="rounded-lg border border-warn/30 bg-warn/[0.04] p-4">
              <div className="flex items-center gap-2">
                <WrenchIcon className="h-4 w-4 text-warn" />
                <h3 className="text-sm font-semibold text-fg">
                  Recovery recommendation
                </h3>
              </div>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-fg2">
                {analysis.recovery_recommendation ||
                  'No recovery recommendation was returned.'}
              </p>

              <p className="mt-3 text-xs text-fg3">
                Recommendation only. No production recovery action has been executed.
              </p>
            </section>

            <p className="text-2xs text-fg3">
              Analysis run #{analysisResult.agentRun?.id ?? '—'} ·{' '}
              {analysisResult.agentRun?.completedAt
                ? formatDate(analysisResult.agentRun.completedAt)
                : 'Completion time unavailable'}
            </p>
          </div>
        )}
      </Panel>

      {/* Incident logs */}
      <Panel
        title="Evidence and Logs"
        subtitle={`${logs.length} log record${logs.length === 1 ? '' : 's'} associated with this incident`}
        icon={FileSearchIcon}
      >
        {logs.length > 0 ? (
          <LogViewer
            logs={normalizedLogs}
            title={`${serviceName} · incident logs`}
          />
        ) : (
          <EmptyState
            icon={SirenIcon}
            title="No logs available"
            description="Add logs to this incident and run the analysis again to give the AI more evidence."
          />
        )}
      </Panel>

      {/* Current status */}
      <div className="rounded-lg border border-line bg-panel p-4">
        <div className="flex items-start gap-3">
          <SirenIcon
            className={`mt-0.5 h-4 w-4 ${isResolved ? 'text-ok' : 'text-warn'}`}
          />

          <div>
            <p className="text-sm font-semibold text-fg">
              Incident status: {incident.status}
            </p>

            <p className="mt-1 text-xs leading-relaxed text-fg3">
              AI analysis does not change the incident status. Resolve the incident
              only after the underlying issue has been addressed and verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
