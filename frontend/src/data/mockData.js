// Mock data layer. Every page reads from here so a real API client can be
// dropped in behind these same shapes later (see data/api.js).

export const environments = ['Production', 'Staging', 'Development'];

export const services = [
{
  id: 'api-gateway',
  name: 'API Gateway',
  status: 'healthy',
  errorRate: 0.8,
  latency: 182,
  rpm: '48.2K',
  deployment: 'v3.1',
  deployedAt: '06:12',
  lastIncident: '4 days ago',
  uptime: '99.98%',
  owner: 'Platform Team',
  history: [
  { t: '08:23', v: 0.6 }, { t: '08:24', v: 0.7 }, { t: '08:25', v: 0.6 },
  { t: '08:26', v: 0.9 }, { t: '08:27', v: 0.8 }, { t: '08:28', v: 1.0 },
  { t: '08:29', v: 0.9 }, { t: '08:30', v: 0.8 }, { t: '08:31', v: 0.8 }]

},
{
  id: 'authentication',
  name: 'Authentication',
  status: 'healthy',
  errorRate: 0.4,
  latency: 120,
  rpm: '22.7K',
  deployment: 'v1.9',
  deployedAt: 'Yesterday 18:40',
  lastIncident: '24 minutes ago',
  uptime: '99.99%',
  owner: 'Identity Team',
  history: [
  { t: '08:23', v: 0.3 }, { t: '08:24', v: 0.4 }, { t: '08:25', v: 0.5 },
  { t: '08:26', v: 0.6 }, { t: '08:27', v: 0.5 }, { t: '08:28', v: 0.4 },
  { t: '08:29', v: 0.4 }, { t: '08:30', v: 0.4 }, { t: '08:31', v: 0.4 }]

},
{
  id: 'payment-service',
  name: 'Payment Service',
  status: 'critical',
  errorRate: 18.4,
  latency: 4700,
  rpm: '12.4K',
  deployment: 'v2.4',
  deployedAt: '08:23',
  lastIncident: '8 minutes ago',
  uptime: '99.71%',
  owner: 'Payments Team',
  history: [
  { t: '08:23', v: 0.8 }, { t: '08:24', v: 0.9 }, { t: '08:25', v: 1.4 },
  { t: '08:26', v: 2.9 }, { t: '08:27', v: 5.1 }, { t: '08:28', v: 8.6 },
  { t: '08:29', v: 12.2 }, { t: '08:30', v: 15.1 }, { t: '08:31', v: 18.4 }]

},
{
  id: 'database',
  name: 'Database',
  status: 'degraded',
  errorRate: 6.2,
  latency: 890,
  rpm: '31.0K',
  deployment: 'pg-15.4',
  deployedAt: '3 weeks ago',
  lastIncident: '1 hour ago',
  uptime: '99.90%',
  owner: 'Data Platform',
  history: [
  { t: '08:23', v: 0.4 }, { t: '08:24', v: 0.5 }, { t: '08:25', v: 0.9 },
  { t: '08:26', v: 1.6 }, { t: '08:27', v: 2.4 }, { t: '08:28', v: 3.6 },
  { t: '08:29', v: 4.8 }, { t: '08:30', v: 5.6 }, { t: '08:31', v: 6.2 }]

},
{
  id: 'notification-service',
  name: 'Notification Service',
  status: 'healthy',
  errorRate: 1.1,
  latency: 240,
  rpm: '8.9K',
  deployment: 'v0.14',
  deployedAt: '05:02',
  lastIncident: '3 hours ago',
  uptime: '99.94%',
  owner: 'Growth Team',
  history: [
  { t: '08:23', v: 1.4 }, { t: '08:24', v: 1.2 }, { t: '08:25', v: 1.3 },
  { t: '08:26', v: 1.1 }, { t: '08:27', v: 1.0 }, { t: '08:28', v: 1.2 },
  { t: '08:29', v: 1.1 }, { t: '08:30', v: 1.0 }, { t: '08:31', v: 1.1 }]

}];


export const incidents = [
{
  id: 'INC-1042',
  title: 'Payment API experiencing high error rate',
  detailTitle: 'Payment API Degradation',
  severity: 'critical',
  status: 'investigating',
  serviceId: 'payment-service',
  service: 'Payment Service',
  startedAgo: '8 minutes ago',
  startedAt: '08:23',
  startedShort: '8m ago',
  confidence: 91,
  agent: 'Root Cause Agent',
  deployment: 'v2.4',
  errorRate: '18.4%',
  errorTrend: 'up',
  latency: '4.7s',
  latencyTrend: 'up',
  aiStatus: 'Root cause investigation in progress',
  phase: 'investigating',
  environment: 'Production'
},
{
  id: 'INC-1041',
  title: 'Elevated token validation latency on Auth API',
  detailTitle: 'Auth API Latency Regression',
  severity: 'warning',
  status: 'monitoring',
  serviceId: 'authentication',
  service: 'Authentication',
  startedAgo: '24 minutes ago',
  startedAt: '08:07',
  startedShort: '24m ago',
  confidence: 76,
  agent: 'Investigation Agent',
  deployment: 'v1.9',
  errorRate: '0.4%',
  errorTrend: 'flat',
  latency: '640ms',
  latencyTrend: 'up',
  aiStatus: 'Monitoring after cache warm-up',
  phase: 'investigating',
  environment: 'Production'
},
{
  id: 'INC-1040',
  title: 'Database replica lag exceeded threshold',
  detailTitle: 'Database Replica Lag',
  severity: 'resolved',
  status: 'resolved',
  serviceId: 'database',
  service: 'Database',
  startedAgo: '1 hour ago',
  startedAt: '07:28',
  startedShort: '1h ago',
  confidence: 96,
  agent: 'Recovery Agent',
  deployment: 'pg-15.4',
  errorRate: '0.9%',
  errorTrend: 'down',
  latency: '210ms',
  latencyTrend: 'down',
  aiStatus: 'Resolved by replica failover',
  phase: 'resolved',
  environment: 'Production'
},
{
  id: 'INC-1039',
  title: 'Notification webhook delivery failures',
  detailTitle: 'Webhook Delivery Failures',
  severity: 'warning',
  status: 'investigating',
  serviceId: 'notification-service',
  service: 'Notification Service',
  startedAgo: '3 hours ago',
  startedAt: '05:30',
  startedShort: '3h ago',
  confidence: 68,
  agent: 'Investigation Agent',
  deployment: 'v0.14',
  errorRate: '4.2%',
  errorTrend: 'up',
  latency: '310ms',
  latencyTrend: 'flat',
  aiStatus: 'Collecting upstream provider evidence',
  phase: 'investigating',
  environment: 'Production'
},
{
  id: 'INC-1038',
  title: 'Payment Service memory saturation',
  detailTitle: 'Payment Service Memory Saturation',
  severity: 'resolved',
  status: 'resolved',
  serviceId: 'payment-service',
  service: 'Payment Service',
  startedAgo: '6 hours ago',
  startedAt: '02:41',
  startedShort: '6h ago',
  confidence: 93,
  agent: 'Recovery Agent',
  deployment: 'v2.3',
  errorRate: '1.2%',
  errorTrend: 'down',
  latency: '190ms',
  latencyTrend: 'down',
  aiStatus: 'Resolved by service restart',
  phase: 'resolved',
  environment: 'Production'
},
{
  id: 'INC-1037',
  title: '5xx spike on /v1/search through API Gateway',
  detailTitle: 'API Gateway 5xx Spike',
  severity: 'info',
  status: 'resolved',
  serviceId: 'api-gateway',
  service: 'API Gateway',
  startedAgo: '1 day ago',
  startedAt: 'Yesterday 21:14',
  startedShort: '1d ago',
  confidence: 88,
  agent: 'Root Cause Agent',
  deployment: 'v3.1',
  errorRate: '0.8%',
  errorTrend: 'flat',
  latency: '182ms',
  latencyTrend: 'flat',
  aiStatus: 'Resolved — upstream rate limit corrected',
  phase: 'resolved',
  environment: 'Production'
}];


export const kpis = [
{ key: 'active', label: 'Active Incidents', value: '04', icon: 'activity', trend: 'up', delta: '+2 vs. yesterday', tone: 'warn', inverse: false },
{ key: 'critical', label: 'Critical Incidents', value: '01', icon: 'alert', trend: 'up', delta: '+1 in last hour', tone: 'crit', inverse: false },
{ key: 'assisted', label: 'AI-Assisted Resolution', value: '87%', icon: 'sparkles', trend: 'up', delta: '+6% this week', tone: 'ai', inverse: true },
{ key: 'mttr', label: 'Avg. Response Time', value: '4m 32s', icon: 'timer', trend: 'down', delta: '−48s this week', tone: 'ok', inverse: false }];


export const dashboardActivity = [
{ id: 'a1', time: '08:31:29', agent: 'Recovery Agent', action: 'Preparing recovery recommendation', status: 'running', incident: 'INC-1042' },
{ id: 'a2', time: '08:31:21', agent: 'Root Cause Agent', action: 'Comparing hypotheses', status: 'running', incident: 'INC-1042' },
{ id: 'a3', time: '08:31:12', agent: 'Investigation Agent', action: 'Analyzed GitHub commits', status: 'done', incident: 'INC-1042' },
{ id: 'a4', time: '08:31:08', agent: 'Investigation Agent', action: 'Retrieved deployment history', status: 'done', incident: 'INC-1042' },
{ id: 'a5', time: '08:31:04', agent: 'Investigation Agent', action: 'Retrieved application logs', status: 'done', incident: 'INC-1042' },
{ id: 'a6', time: '08:08:52', agent: 'Investigation Agent', action: 'Retrieved auth latency metrics', status: 'done', incident: 'INC-1041' },
{ id: 'a7', time: '07:31:10', agent: 'Recovery Agent', action: 'Executed replica failover', status: 'done', incident: 'INC-1040' }];


export const errorRateSeries = [
{ t: '08:23', v: 0.8 }, { t: '08:24', v: 0.9 }, { t: '08:25', v: 1.4 },
{ t: '08:26', v: 2.9 }, { t: '08:27', v: 5.1 }, { t: '08:28', v: 8.6 },
{ t: '08:29', v: 12.2 }, { t: '08:30', v: 15.1 }, { t: '08:31', v: 18.4 }];


export const latencySeries = [
{ t: '08:23', v: 180 }, { t: '08:24', v: 195 }, { t: '08:25', v: 240 },
{ t: '08:26', v: 520 }, { t: '08:27', v: 1100 }, { t: '08:28', v: 1900 },
{ t: '08:29', v: 2800 }, { t: '08:30', v: 3900 }, { t: '08:31', v: 4700 }];


export const connectionsSeries = [
{ t: '08:23', v: 42 }, { t: '08:24', v: 48 }, { t: '08:25', v: 61 },
{ t: '08:26', v: 74 }, { t: '08:27', v: 88 }, { t: '08:28', v: 96 },
{ t: '08:29', v: 100 }, { t: '08:30', v: 100 }, { t: '08:31', v: 100 }];


export const investigationTimeline = [
{ time: '08:31:02', agent: 'System', action: 'Incident detected', detail: 'Error-rate SLO burn on payment-api exceeded 5% for 60s.', status: 'done', kind: 'detect', tools: ['alert_webhook()'] },
{ time: '08:31:04', agent: 'Investigation Agent', action: 'Retrieved application logs', detail: '2,481 log lines scanned, 318 matched connection-timeout patterns.', status: 'done', kind: 'evidence', tools: ['get_logs()'] },
{ time: '08:31:08', agent: 'Investigation Agent', action: 'Retrieved deployment history', detail: 'v2.4 deployed to production at 08:23, 8 minutes before first error.', status: 'done', kind: 'evidence', tools: ['get_deployments()'] },
{ time: '08:31:12', agent: 'Investigation Agent', action: 'Retrieved GitHub commits', detail: '3 commits in v2.4; one touches src/database/connection.js.', status: 'done', kind: 'evidence', tools: ['get_github_commits()'] },
{ time: '08:31:17', agent: 'Investigation Agent', action: 'Retrieved database metrics', detail: 'Active connections pinned at 100/100 since 08:29.', status: 'done', kind: 'evidence', tools: ['get_metrics()'] },
{ time: '08:31:21', agent: 'Root Cause Agent', action: 'Comparing possible hypotheses', detail: 'Correlating 4 evidence sources against 4 candidate causes.', status: 'done', kind: 'reason', tools: ['correlate_evidence()'] },
{ time: '08:31:27', agent: 'Root Cause Agent', action: 'Identified likely database connection exhaustion', detail: 'Primary hypothesis scored 91% confidence; next best 32%.', status: 'done', kind: 'reason', tools: ['score_hypotheses()'] },
{ time: '08:31:29', agent: 'Recovery Agent', action: 'Generating recovery recommendation', detail: 'Evaluating rollback vs. pool-size hotfix vs. service restart.', status: 'running', kind: 'recover', tools: ['plan_recovery()'] }];


export const rootCause = {
  hypothesis: 'Database Connection Pool Exhaustion',
  confidence: 91,
  summary:
  'Deployment v2.4 raised the application-side connection ceiling above what the database instance can serve, so the pool saturates and payment requests fail while waiting for a free connection.',
  evidence: [
  { text: 'Database connections reached 100/100', source: 'Metrics' },
  { text: 'Error rate increased immediately after deployment v2.4', source: 'Deployments' },
  { text: 'New database configuration was introduced in v2.4', source: 'GitHub' },
  { text: 'Logs contain repeated database connection timeout errors', source: 'Logs' },
  { text: 'GitHub commit modified database connection configuration', source: 'GitHub' }]

};

export const alternativeHypotheses = [
{ name: 'Increased Traffic', confidence: 32, note: 'Requests up only 4% vs. 7-day baseline — insufficient to explain 18.4% errors.' },
{ name: 'Database Hardware Issue', confidence: 14, note: 'CPU, IOPS and disk latency all within normal range on the primary.' },
{ name: 'Network Failure', confidence: 8, note: 'No packet loss or DNS anomalies between service subnet and database.' }];


export const appLogs = [
{ time: '08:31:22', level: 'ERROR', msg: 'Database connection timeout after 5000ms', src: 'payment-api' },
{ time: '08:31:23', level: 'ERROR', msg: 'Pool exhausted: maximum connections reached (100/100)', src: 'payment-api' },
{ time: '08:31:24', level: 'ERROR', msg: 'Request failed /api/payment — 503 Service Unavailable', src: 'payment-api' },
{ time: '08:31:25', level: 'ERROR', msg: 'Unable to acquire database connection for tx=8f21c', src: 'payment-api' },
{ time: '08:31:25', level: 'WARN', msg: 'Retry 2/3 for /api/payment/authorize', src: 'payment-api' },
{ time: '08:31:26', level: 'ERROR', msg: 'Transaction rolled back: connection acquisition timeout', src: 'payment-api' },
{ time: '08:31:27', level: 'WARN', msg: 'Circuit breaker half-open for db.primary', src: 'payment-api' },
{ time: '08:31:28', level: 'INFO', msg: 'Health probe /healthz degraded (db dependency)', src: 'payment-api' }];


export const dbLogs = [
{ time: '08:29:41', level: 'WARN', msg: 'too many clients already (max_connections=100)', src: 'pg-primary' },
{ time: '08:30:02', level: 'ERROR', msg: 'FATAL: remaining connection slots are reserved', src: 'pg-primary' },
{ time: '08:30:44', level: 'WARN', msg: 'checkpoint occurring too frequently (12s apart)', src: 'pg-primary' }];


export const metricEvidence = [
{ name: 'db.connections.active', value: '100 / 100', note: 'Saturated since 08:29', tone: 'critical' },
{ name: 'payment.error_rate', value: '18.4%', note: 'Baseline 0.8%', tone: 'critical' },
{ name: 'payment.p95_latency', value: '4.7s', note: 'Baseline 182ms', tone: 'critical' },
{ name: 'payment.requests', value: '12.4K/min', note: '+4% vs. 7-day baseline', tone: 'healthy' },
{ name: 'db.cpu', value: '46%', note: 'Within normal range', tone: 'healthy' }];


export const commits = [
{
  sha: '8f3a92c',
  author: 'Developer',
  time: '08:14',
  message: 'Update database connection configuration',
  file: 'src/database/connection.js',
  diff: [
  { type: 'ctx', text: 'const pool = new Pool({' },
  { type: 'del', text: '  maxConnections: 50,' },
  { type: 'add', text: '  maxConnections: 100,' },
  { type: 'ctx', text: '  idleTimeoutMillis: 30000,' },
  { type: 'ctx', text: '})' }],

  flagged: true
},
{
  sha: '2b71de4',
  author: 'Developer',
  time: '07:58',
  message: 'Add retry wrapper around payment authorization',
  file: 'src/payments/authorize.js',
  diff: [
  { type: 'ctx', text: 'export async function authorize(req) {' },
  { type: 'add', text: '  return withRetry(() => provider.charge(req), 3)' },
  { type: 'ctx', text: '}' }],

  flagged: false
}];


export const deployments = [
{ version: 'v2.4', time: '08:23', status: 'active', author: 'ci-bot', commits: 3, note: 'Includes database connection configuration change.' },
{ version: 'v2.3', time: 'Yesterday 19:40', status: 'previous', author: 'ci-bot', commits: 7, note: 'Last known-good release for payment-api.' },
{ version: 'v2.2', time: '2 days ago', status: 'superseded', author: 'ci-bot', commits: 4, note: 'Routine dependency upgrades.' }];


export const recovery = {
  action: 'Roll back deployment v2.4 → v2.3',
  risk: 'Medium',
  impact: 'Restore previous database configuration and reduce connection exhaustion.',
  reason: 'The current evidence strongly correlates the incident with deployment v2.4.',
  confidence: 91,
  from: 'v2.4',
  to: 'v2.3',
  eta: '~90 seconds',
  blastRadius: 'payment-api (3 pods, rolling)'
};

export const recoverySteps = [
{ label: 'Human approval received', detail: 'Approved by Priya Raman (on-call)' },
{ label: 'Recovery action authorized', detail: 'Recovery Agent granted rollback scope' },
{ label: 'Rolling back deployment v2.4', detail: 'Rolling 3/3 pods to v2.3' },
{ label: 'Waiting for deployment health check', detail: 'Probing /healthz across all pods' }];


export const recoveryVerification = [
'Deployment v2.3 active',
'Error rate decreasing',
'Database connections recovering',
'Latency returning to normal'];


export const agents = [
{
  id: 'investigation',
  name: 'Investigation Agent',
  status: 'active',
  purpose: 'Collects evidence from logs, metrics, GitHub and deployment systems.',
  tools: ['get_logs()', 'get_metrics()', 'get_github_commits()', 'get_deployments()'],
  capabilities: ['Log pattern extraction', 'Metric anomaly detection', 'Change correlation'],
  tasksCompleted: 1284,
  successRate: '98.2%',
  avgRun: '3.4s',
  activity: [
  { time: '08:31:17', text: 'Retrieved database metrics for INC-1042', status: 'done' },
  { time: '08:31:12', text: 'Retrieved GitHub commits for INC-1042', status: 'done' },
  { time: '08:08:52', text: 'Retrieved auth latency metrics for INC-1041', status: 'done' }]

},
{
  id: 'root-cause',
  name: 'Root Cause Agent',
  status: 'active',
  purpose: 'Correlates evidence, generates hypotheses and determines the most likely root cause.',
  tools: ['correlate_evidence()', 'score_hypotheses()', 'explain_cause()'],
  capabilities: ['Evidence correlation', 'Hypothesis generation', 'Confidence scoring', 'Root cause reasoning'],
  tasksCompleted: 612,
  successRate: '94.6%',
  avgRun: '6.1s',
  activity: [
  { time: '08:31:27', text: 'Identified database connection exhaustion (91%)', status: 'done' },
  { time: '08:31:21', text: 'Comparing hypotheses for INC-1042', status: 'running' },
  { time: '07:29:44', text: 'Identified replica lag root cause for INC-1040', status: 'done' }]

},
{
  id: 'recovery',
  name: 'Recovery Agent',
  status: 'waiting',
  purpose: 'Recommends and executes recovery actions after human approval.',
  tools: ['rollback_deployment()', 'restart_service()', 'verify_health()'],
  capabilities: ['Recovery planning', 'Risk assessment', 'Guarded execution', 'Post-action verification'],
  tasksCompleted: 208,
  successRate: '99.1%',
  avgRun: '82s',
  activity: [
  { time: '08:31:29', text: 'Preparing rollback recommendation for INC-1042', status: 'running' },
  { time: '07:31:10', text: 'Executed replica failover for INC-1040', status: 'done' },
  { time: '02:52:19', text: 'Restarted payment-service for INC-1038', status: 'done' }]

}];


export const evidenceItems = [
{ id: 'ev-1', source: 'Application Logs', incident: 'INC-1042', time: '08:31:22', severity: 'critical', title: 'Database connection timeout after 5000ms', detail: '318 matching lines across 3 pods of payment-api.', agent: 'Investigation Agent' },
{ id: 'ev-2', source: 'Metrics', incident: 'INC-1042', time: '08:31:17', severity: 'critical', title: 'db.connections.active saturated at 100/100', detail: 'Connection pool has had zero headroom since 08:29.', agent: 'Investigation Agent' },
{ id: 'ev-3', source: 'GitHub Commits', incident: 'INC-1042', time: '08:31:12', severity: 'warning', title: 'Commit 8f3a92c modified src/database/connection.js', detail: 'maxConnections raised from 50 to 100.', agent: 'Investigation Agent' },
{ id: 'ev-4', source: 'Deployments', incident: 'INC-1042', time: '08:31:08', severity: 'warning', title: 'Deployment v2.4 shipped at 08:23', detail: 'First elevated error rate observed 08:25.', agent: 'Investigation Agent' },
{ id: 'ev-5', source: 'Database Logs', incident: 'INC-1042', time: '08:30:02', severity: 'critical', title: 'FATAL: remaining connection slots are reserved', detail: 'pg-primary rejecting new clients.', agent: 'Investigation Agent' },
{ id: 'ev-6', source: 'Metrics', incident: 'INC-1041', time: '08:08:52', severity: 'warning', title: 'auth.p95_latency rose to 640ms', detail: 'Token cache hit rate dropped to 61%.', agent: 'Investigation Agent' },
{ id: 'ev-7', source: 'Application Logs', incident: 'INC-1039', time: '05:34:11', severity: 'warning', title: 'Webhook delivery failed: upstream 429', detail: 'Provider throttling 4.2% of deliveries.', agent: 'Investigation Agent' },
{ id: 'ev-8', source: 'Deployments', incident: 'INC-1040', time: '07:31:10', severity: 'resolved', title: 'Replica failover completed', detail: 'Replica lag returned below 500ms threshold.', agent: 'Recovery Agent' },
{ id: 'ev-9', source: 'GitHub Commits', incident: 'INC-1037', time: 'Yesterday 21:20', severity: 'info', title: 'Commit 4c19aa0 tightened gateway rate limits', detail: 'Search endpoint quota reduced by 30%.', agent: 'Investigation Agent' }];


export const evidenceSources = ['Application Logs', 'Database Logs', 'GitHub Commits', 'Deployments', 'Metrics'];

export const actionHistory = [
{ id: 'ACT-318', action: 'Rollback v2.4 → v2.3', incident: 'INC-1042', requestedBy: 'Recovery Agent', approvedBy: 'Human Approved', status: 'pending', time: '08:31:34', risk: 'Medium' },
{ id: 'ACT-317', action: 'Restart Payment Service', incident: 'INC-1038', requestedBy: 'Recovery Agent', approvedBy: 'Human Approved', status: 'completed', time: '02:52:19', risk: 'Low' },
{ id: 'ACT-316', action: 'Failover database replica', incident: 'INC-1040', requestedBy: 'Recovery Agent', approvedBy: 'Human Approved', status: 'completed', time: '07:31:10', risk: 'Medium' },
{ id: 'ACT-315', action: 'Scale API Gateway to 8 pods', incident: 'INC-1037', requestedBy: 'Recovery Agent', approvedBy: 'Auto-approved (policy)', status: 'completed', time: 'Yesterday 21:26', risk: 'Low' },
{ id: 'ACT-314', action: 'Purge notification retry queue', incident: 'INC-1039', requestedBy: 'Recovery Agent', approvedBy: '—', status: 'rejected', time: '05:41:03', risk: 'High' },
{ id: 'ACT-313', action: 'Rotate auth signing key', incident: 'INC-1041', requestedBy: 'Recovery Agent', approvedBy: 'Human Approved', status: 'executing', time: '08:12:47', risk: 'Medium' }];


export const integrations = [
{ name: 'GitHub', detail: 'acme-corp/payments-platform · 3 repositories', status: 'connected', icon: 'github' },
{ name: 'Monitoring', detail: 'Prometheus + Grafana · 412 metric streams', status: 'connected', icon: 'chart' },
{ name: 'Logging', detail: 'Loki · 18 services indexed', status: 'connected', icon: 'logs' },
{ name: 'Deployment Platform', detail: 'ArgoCD · production cluster', status: 'connected', icon: 'rocket' },
{ name: 'Slack', detail: '#incident-response', status: 'degraded', icon: 'slack' },
{ name: 'PagerDuty', detail: 'Not configured', status: 'disconnected', icon: 'bell' }];


export function getIncident(id) {
  return incidents.find((i) => i.id === id);
}

export function getService(id) {
  return services.find((s) => s.id === id);
}