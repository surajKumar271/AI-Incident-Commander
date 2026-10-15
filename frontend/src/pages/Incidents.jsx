
import React, { useEffect, useMemo, useState } from 'react';
import { SearchIcon, XIcon, RefreshCwIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { IncidentTable } from '../components/IncidentTable';
import { apiFetch } from '../utils/api';

const severityOptions = [
  { value: 'all', label: 'All severities' },
  { value: 'critical', label: 'Critical' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'resolved', label: 'Resolved' },
];

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'investigating', label: 'Investigating' },
  { value: 'monitoring', label: 'Monitoring' },
  { value: 'resolved', label: 'Resolved' },
];

const sortOptions = [
  { value: 'newest', label: 'Sort: Newest' },
  { value: 'oldest', label: 'Sort: Oldest' },
  { value: 'severity', label: 'Sort: Severity' },
  { value: 'confidence', label: 'Sort: AI confidence' },
];

const severityRank = {
  critical: 0,
  warning: 1,
  info: 2,
  resolved: 3,
};

function normalizeSeverity(severity, status) {
  if (String(status).toUpperCase() === 'RESOLVED') {
    return 'resolved';
  }

  const value = String(severity || '').toUpperCase();

  if (value === 'CRITICAL' || value === 'HIGH') return 'critical';
  if (value === 'MEDIUM' || value === 'WARNING') return 'warning';

  return 'info';
}

function normalizeStatus(status) {
  const value = String(status || 'OPEN').toUpperCase();

  if (value === 'RESOLVED' || value === 'CLOSED') return 'resolved';
  if (value === 'MONITORING') return 'monitoring';

  return 'investigating';
}

function formatStarted(date) {
  if (!date) return '—';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return '—';

  return parsed.toLocaleString();
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 appearance-none rounded-md border border-line bg-panel pl-2.5 pr-7 text-xs font-medium text-fg transition-colors duration-150 ease-smooth hover:border-line2 focus:border-ai/50 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-panel">
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-fg3"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </label>
  );
}

export function Incidents() {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');
  const [status, setStatus] = useState('all');
  const [service, setService] = useState('all');
  const [sort, setSort] = useState('newest');

  const [incidents, setIncidents] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  async function loadIncidents(isRefresh = false) {
    setError('');

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [incidentResponse, serviceResponse] = await Promise.all([
        apiFetch('/api/incidents'),
        apiFetch('/api/services'),
      ]);

      const serviceRecords = serviceResponse.data || [];
      const serviceNames = new Map(
        serviceRecords.map((item) => [Number(item.id), item.name])
      );

      const rows = (incidentResponse.data || []).map((item) => ({
        ...item,
        routeId: item.id,
        displayId: `INC-${item.id}`,
        severity: normalizeSeverity(item.severity, item.status),
        status: normalizeStatus(item.status),
        service: serviceNames.get(Number(item.serviceId)) || 'Unknown service',
        startedShort: formatStarted(item.createdAt),
        confidence: null,
        agent: 'Not assigned',
      }));

      setServices(serviceRecords);
      setIncidents(rows);
    } catch (err) {
      setError(err.message || 'Unable to load incidents.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  const serviceOptions = useMemo(
    () => [
      { value: 'all', label: 'All services' },
      ...services.map((item) => ({
        value: item.name,
        label: item.name,
      })),
    ],
    [services]
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = incidents.filter((item) => {
      const matchesQuery =
        !q ||
        item.displayId.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.service.toLowerCase().includes(q);

      const matchesSeverity =
        severity === 'all' || item.severity === severity;

      const matchesStatus =
        status === 'all' || item.status === status;

      const matchesService =
        service === 'all' || item.service === service;

      return (
        matchesQuery &&
        matchesSeverity &&
        matchesStatus &&
        matchesService
      );
    });

    result = [...result];

    if (sort === 'newest') {
      result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (sort === 'oldest') {
      result.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    if (sort === 'severity') {
      result.sort(
        (a, b) => severityRank[a.severity] - severityRank[b.severity]
      );
    }

    if (sort === 'confidence') {
      result.sort(
        (a, b) => (b.confidence ?? -1) - (a.confidence ?? -1)
      );
    }

    return result;
  }, [incidents, query, severity, status, service, sort]);

  const filtersActive =
    query ||
    severity !== 'all' ||
    status !== 'all' ||
    service !== 'all';

  function clearFilters() {
    setQuery('');
    setSeverity('all');
    setStatus('all');
    setService('all');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Incidents"
        subtitle="Every detected incident, its AI investigation state and assigned agent."
      >
        <button
          type="button"
          onClick={() => loadIncidents(true)}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-1.5 rounded-md border border-line2 bg-panel2 px-3 py-2 text-xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3 disabled:opacity-60"
        >
          <RefreshCwIcon
            className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          Refresh
        </button>
      </PageHeader>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-crit/30 bg-crit/10 px-4 py-3 text-sm text-crit"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => loadIncidents()}
            className="mt-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="rounded-lg border border-line bg-panel">
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
          <div className="relative min-w-[220px] flex-1">
            <SearchIcon
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fg3"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search incidents by ID, title or service…"
              aria-label="Search incidents"
              className="h-8 w-full rounded-md border border-line bg-canvas pl-8 pr-3 text-xs text-fg placeholder:text-fg3 transition-colors duration-150 ease-smooth hover:border-line2 focus:border-ai/50 focus:outline-none"
            />
          </div>

          <Select
            label="Filter by severity"
            value={severity}
            onChange={setSeverity}
            options={severityOptions}
          />
          <Select
            label="Filter by status"
            value={status}
            onChange={setStatus}
            options={statusOptions}
          />
          <Select
            label="Filter by service"
            value={service}
            onChange={setService}
            options={serviceOptions}
          />
          <Select
            label="Sort incidents"
            value={sort}
            onChange={setSort}
            options={sortOptions}
          />

          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-2xs font-medium text-fg3 transition-colors duration-150 ease-smooth hover:text-fg"
            >
              <XIcon className="h-3 w-3" aria-hidden="true" />
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-2.5 text-2xs text-fg3">
          <span className="tabular">
            {loading ? 'Loading incidents…' : `${rows.length} of ${incidents.length} incidents`}
          </span>
          <span>Live database data</span>
        </div>

        {loading ? (
          <IncidentTable incidents={[]} loading />
        ) : (
          <IncidentTable incidents={rows} />
        )}
      </div>
    </div>
  );
}
