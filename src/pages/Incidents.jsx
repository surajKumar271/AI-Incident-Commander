import React, { useMemo, useState } from 'react';
import { SearchIcon, XIcon, RefreshCwIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { IncidentTable } from '../components/IncidentTable';
import { incidents, services } from '../data/mockData';

const severityOptions = [
{ value: 'all', label: 'All severities' },
{ value: 'critical', label: 'Critical' },
{ value: 'warning', label: 'Warning' },
{ value: 'info', label: 'Info' },
{ value: 'resolved', label: 'Resolved' }];


const statusOptions = [
{ value: 'all', label: 'All statuses' },
{ value: 'investigating', label: 'Investigating' },
{ value: 'monitoring', label: 'Monitoring' },
{ value: 'resolved', label: 'Resolved' }];


const sortOptions = [
{ value: 'newest', label: 'Sort: Newest' },
{ value: 'oldest', label: 'Sort: Oldest' },
{ value: 'severity', label: 'Sort: Severity' },
{ value: 'confidence', label: 'Sort: AI confidence' }];


const severityRank = { critical: 0, warning: 1, info: 2, resolved: 3 };

function Select({ label, value, onChange, options }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 appearance-none rounded-md border border-line bg-panel pl-2.5 pr-7 text-xs font-medium text-fg transition-colors duration-150 ease-smooth hover:border-line2 focus:border-ai/50 focus:outline-none">
        
        {options.map((o) =>
        <option key={o.value} value={o.value} className="bg-panel">
            {o.label}
          </option>
        )}
      </select>
      <svg className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-fg3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </label>);

}

export function Incidents() {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');
  const [status, setStatus] = useState('all');
  const [service, setService] = useState('all');
  const [sort, setSort] = useState('newest');
  const [refreshing, setRefreshing] = useState(false);

  const serviceOptions = useMemo(
    () => [{ value: 'all', label: 'All services' }].concat(services.map((s) => ({ value: s.name, label: s.name }))),
    []
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = incidents.filter((i) => {
      const matchQ = !q || i.id.toLowerCase().includes(q) || i.title.toLowerCase().includes(q) || i.service.toLowerCase().includes(q);
      const matchSev = severity === 'all' || i.severity === severity;
      const matchStatus = status === 'all' || i.status === status;
      const matchService = service === 'all' || i.service === service;
      return matchQ && matchSev && matchStatus && matchService;
    });
    out = out.slice();
    if (sort === 'oldest') out.reverse();
    if (sort === 'severity') out.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);
    if (sort === 'confidence') out.sort((a, b) => b.confidence - a.confidence);
    return out;
  }, [query, severity, status, service, sort]);

  const filtersActive = query || severity !== 'all' || status !== 'all' || service !== 'all';

  function refresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }

  function clearFilters() {
    setQuery('');
    setSeverity('all');
    setStatus('all');
    setService('all');
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Incidents" subtitle="Every detected incident, its AI investigation state and assigned agent.">
        <button
          type="button"
          onClick={refresh}
          className="inline-flex items-center gap-1.5 rounded-md border border-line2 bg-panel2 px-3 py-2 text-xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3">
          
          <RefreshCwIcon className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </button>
      </PageHeader>

      <div className="rounded-lg border border-line bg-panel">
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
          <div className="relative min-w-[220px] flex-1">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fg3" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search incidents by ID, title or service…"
              aria-label="Search incidents"
              className="h-8 w-full rounded-md border border-line bg-canvas pl-8 pr-3 text-xs text-fg placeholder:text-fg3 transition-colors duration-150 ease-smooth hover:border-line2 focus:border-ai/50 focus:outline-none" />
            
          </div>
          <Select label="Filter by severity" value={severity} onChange={setSeverity} options={severityOptions} />
          <Select label="Filter by status" value={status} onChange={setStatus} options={statusOptions} />
          <Select label="Filter by service" value={service} onChange={setService} options={serviceOptions} />
          <Select label="Sort incidents" value={sort} onChange={setSort} options={sortOptions} />
          {filtersActive &&
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-2xs font-medium text-fg3 transition-colors duration-150 ease-smooth hover:text-fg">
            
              <XIcon className="h-3 w-3" aria-hidden="true" />
              Clear
            </button>
          }
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-2.5 text-2xs text-fg3">
          <span className="tabular">
            {rows.length} of {incidents.length} incidents
          </span>
          <span>Auto-refresh every 30s</span>
        </div>

        <IncidentTable incidents={rows} loading={refreshing} />
      </div>
    </div>);

}