import React from 'react';
import { healthMeta, incidentStatusMeta, agentStatusMeta, actionStatusMeta } from '../utils/status';

const maps = {
  health: healthMeta,
  incident: incidentStatusMeta,
  agent: agentStatusMeta,
  action: actionStatusMeta
};

export function StatusBadge({ status, kind = 'health', pulse = false, label }) {
  const map = maps[kind] || healthMeta;
  const meta = map[status] || { label: status, text: 'text-fg2', bg: 'bg-white/5', ring: 'ring-line2', dot: 'bg-fg3' };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-2xs font-semibold ring-1 ring-inset ${meta.bg} ${meta.text} ${meta.ring}`}>
      
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot} ${pulse ? 'animate-breathe' : ''}`} aria-hidden="true" />
      {label || meta.label}
    </span>);

}