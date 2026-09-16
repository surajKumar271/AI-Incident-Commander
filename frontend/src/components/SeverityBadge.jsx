import React from 'react';
import { severityMeta } from '../utils/status';

export function SeverityBadge({ severity, size = 'sm', uppercase = false }) {
  const meta = severityMeta[severity] || severityMeta.info;
  const pad = size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-2xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md ring-1 ring-inset font-semibold ${pad} ${meta.bg} ${meta.text} ${meta.ring} ${
      uppercase ? 'uppercase tracking-wide' : ''}`
      }>
      
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
      {meta.label}
    </span>);

}