// Central mapping of domain status/severity values to visual treatments.
// Keeping this in one place means badges, borders and charts never drift apart.

export const severityMeta = {
  critical: { label: 'Critical', text: 'text-crit', bg: 'bg-crit/10', ring: 'ring-crit/30', dot: 'bg-crit', hex: '#f04438' },
  warning: { label: 'Warning', text: 'text-warn', bg: 'bg-warn/10', ring: 'ring-warn/30', dot: 'bg-warn', hex: '#f5a524' },
  info: { label: 'Info', text: 'text-info', bg: 'bg-info/10', ring: 'ring-info/25', dot: 'bg-info', hex: '#3b9ef7' },
  resolved: { label: 'Resolved', text: 'text-ok', bg: 'bg-ok/10', ring: 'ring-ok/25', dot: 'bg-ok', hex: '#31c48d' }
};

export const healthMeta = {
  healthy: { label: 'Healthy', text: 'text-ok', bg: 'bg-ok/10', ring: 'ring-ok/25', dot: 'bg-ok', hex: '#31c48d' },
  degraded: { label: 'Degraded', text: 'text-warn', bg: 'bg-warn/10', ring: 'ring-warn/30', dot: 'bg-warn', hex: '#f5a524' },
  critical: { label: 'Critical', text: 'text-crit', bg: 'bg-crit/10', ring: 'ring-crit/30', dot: 'bg-crit', hex: '#f04438' }
};

export const incidentStatusMeta = {
  investigating: { label: 'Investigating', text: 'text-ai', bg: 'bg-ai/10', ring: 'ring-ai/30', dot: 'bg-ai' },
  awaiting_approval: { label: 'Awaiting approval', text: 'text-warn', bg: 'bg-warn/10', ring: 'ring-warn/30', dot: 'bg-warn' },
  monitoring: { label: 'Monitoring', text: 'text-info', bg: 'bg-info/10', ring: 'ring-info/25', dot: 'bg-info' },
  resolved: { label: 'Resolved', text: 'text-ok', bg: 'bg-ok/10', ring: 'ring-ok/25', dot: 'bg-ok' }
};

export const agentStatusMeta = {
  active: { label: 'Active', text: 'text-ok', bg: 'bg-ok/10', ring: 'ring-ok/25', dot: 'bg-ok' },
  waiting: { label: 'Waiting', text: 'text-warn', bg: 'bg-warn/10', ring: 'ring-warn/30', dot: 'bg-warn' },
  idle: { label: 'Idle', text: 'text-fg2', bg: 'bg-white/5', ring: 'ring-line2', dot: 'bg-fg3' }
};

export const actionStatusMeta = {
  completed: { label: 'Completed', text: 'text-ok', bg: 'bg-ok/10', ring: 'ring-ok/25', dot: 'bg-ok' },
  executing: { label: 'Executing', text: 'text-ai', bg: 'bg-ai/10', ring: 'ring-ai/30', dot: 'bg-ai' },
  pending: { label: 'Pending approval', text: 'text-warn', bg: 'bg-warn/10', ring: 'ring-warn/30', dot: 'bg-warn' },
  rejected: { label: 'Rejected', text: 'text-crit', bg: 'bg-crit/10', ring: 'ring-crit/30', dot: 'bg-crit' }
};

export function trendTone(direction, inverse) {
  // For error rate / latency, "up" is bad. For throughput, "up" is neutral-good.
  if (direction === 'flat') return 'text-fg3';
  const bad = inverse ? direction === 'down' : direction === 'up';
  return bad ? 'text-crit' : 'text-ok';
}