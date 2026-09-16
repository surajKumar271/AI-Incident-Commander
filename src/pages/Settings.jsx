import React, { useState } from 'react';
import {
  SparklesIcon,
  BellIcon,
  PlugIcon,
  ShieldCheckIcon,
  GlobeIcon,
  GithubIcon,
  BarChart3Icon,
  ScrollTextIcon,
  RocketIcon,
  MessageSquareIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  CircleSlashIcon } from
'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Panel } from '../components/Panel';
import { integrations } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const integrationIcons = {
  github: GithubIcon,
  chart: BarChart3Icon,
  logs: ScrollTextIcon,
  rocket: RocketIcon,
  slack: MessageSquareIcon,
  bell: BellIcon
};

const connectionMeta = {
  connected: { label: 'Connected', text: 'text-ok', icon: CheckCircle2Icon },
  degraded: { label: 'Degraded', text: 'text-warn', icon: AlertTriangleIcon },
  disconnected: { label: 'Not connected', text: 'text-fg3', icon: CircleSlashIcon }
};

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-150 ease-smooth ${checked ? 'bg-ai' : 'bg-white/[0.12]'}`}>
      
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-150 ease-smooth ${
        checked ? 'translate-x-[18px]' : 'translate-x-0.5'}`
        } />
      
    </button>);

}

function SettingRow({ title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-line py-3.5 last:border-b-0 last:pb-0 first:pt-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg">{title}</p>
        {description && <p className="mt-1 text-xs leading-relaxed text-fg3">{description}</p>}
      </div>
      <div className="shrink-0 pt-0.5">{children}</div>
    </div>);

}

function Field({ value, options }) {
  return (
    <select
      defaultValue={value}
      className="h-8 rounded-md border border-line bg-canvas px-2.5 text-xs font-medium text-fg transition-colors duration-150 ease-smooth hover:border-line2 focus:border-ai/50 focus:outline-none">
      
      {options.map((o) =>
      <option key={o} value={o} className="bg-panel">
          {o}
        </option>
      )}
    </select>);

}

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [autoInvestigate, setAutoInvestigate] = useState(true);
  const [autoLowRisk, setAutoLowRisk] = useState(false);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [pageOnCritical, setPageOnCritical] = useState(true);
  const [requireTwo, setRequireTwo] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Configure agent autonomy, approvals, notifications and connected systems." />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Appearance" subtitle="Customize the command center display" icon={SparklesIcon}>
          <SettingRow title="Theme" description="Choose the interface color scheme. Your choice is saved automatically.">
            <div className="flex rounded-md border border-line bg-canvas p-0.5 text-xs font-medium"><button onClick={() => setTheme('dark')} className={`rounded px-3 py-1.5 ${theme === 'dark' ? 'bg-ai text-white' : 'text-fg2'}`}>Dark</button><button onClick={() => setTheme('light')} className={`rounded px-3 py-1.5 ${theme === 'light' ? 'bg-ai text-white' : 'text-fg2'}`}>Light</button></div>
          </SettingRow>
        </Panel>
        <Panel title="AI Configuration" subtitle="How much the agents may do on their own" icon={SparklesIcon}>
          <SettingRow
            title="Auto-start investigations"
            description="Investigation Agent begins collecting evidence as soon as an incident is detected.">
            
            <Toggle checked={autoInvestigate} onChange={setAutoInvestigate} label="Auto-start investigations" />
          </SettingRow>
          <SettingRow
            title="Auto-execute low-risk recovery"
            description="Skip human approval for actions classified as low risk, such as service restarts.">
            
            <Toggle checked={autoLowRisk} onChange={setAutoLowRisk} label="Auto-execute low-risk recovery" />
          </SettingRow>
          <SettingRow title="Minimum confidence to recommend" description="Recovery Agent stays silent below this confidence score.">
            <Field value="85%" options={['70%', '80%', '85%', '90%', '95%']} />
          </SettingRow>
          <SettingRow title="Reasoning model" description="Used for hypothesis generation and confidence scoring.">
            <Field value="commander-reasoning-v3" options={['commander-reasoning-v3', 'commander-reasoning-v2', 'commander-fast']} />
          </SettingRow>
        </Panel>

        <Panel title="Notification Settings" subtitle="Who hears about what, and how fast" icon={BellIcon}>
          <SettingRow title="Slack alerts" description="Post incident lifecycle updates to #incident-response.">
            <Toggle checked={slackAlerts} onChange={setSlackAlerts} label="Slack alerts" />
          </SettingRow>
          <SettingRow title="Page on-call for critical" description="Trigger a phone page when a critical incident is detected.">
            <Toggle checked={pageOnCritical} onChange={setPageOnCritical} label="Page on-call for critical" />
          </SettingRow>
          <SettingRow title="Daily email digest" description="Summary of incidents, actions and AI accuracy sent at 08:00.">
            <Toggle checked={emailDigest} onChange={setEmailDigest} label="Daily email digest" />
          </SettingRow>
          <SettingRow title="Notify on severity" description="Lowest severity that produces a notification.">
            <Field value="Warning" options={['Critical', 'Warning', 'Info']} />
          </SettingRow>
        </Panel>

        <Panel title="Approval Policies" subtitle="Guardrails around agent-executed actions" icon={ShieldCheckIcon}>
          <SettingRow title="Require two approvers for high risk" description="High-risk actions need a second on-call engineer to confirm.">
            <Toggle checked={requireTwo} onChange={setRequireTwo} label="Require two approvers for high risk" />
          </SettingRow>
          <SettingRow title="Approval window" description="Requests expire if no human responds within this window.">
            <Field value="10 minutes" options={['5 minutes', '10 minutes', '30 minutes', '1 hour']} />
          </SettingRow>
          <SettingRow title="Allowed action scope" description="Which recovery tools the Recovery Agent may request.">
            <Field value="Rollback, restart, scale" options={['Rollback, restart, scale', 'Rollback only', 'Read-only (recommend only)']} />
          </SettingRow>
        </Panel>

        <Panel title="Environment Settings" subtitle="Scope of monitoring and execution" icon={GlobeIcon}>
          <SettingRow title="Default environment" description="Environment loaded when you open the command center.">
            <Field value="Production" options={['Production', 'Staging', 'Development']} />
          </SettingRow>
          <SettingRow title="Cluster" description="Kubernetes cluster targeted by recovery actions.">
            <Field value="prod-us-east" options={['prod-us-east', 'prod-eu-west', 'staging-us-east']} />
          </SettingRow>
          <SettingRow title="Metric retention" description="How long evidence and metric snapshots are kept.">
            <Field value="30 days" options={['7 days', '30 days', '90 days']} />
          </SettingRow>
        </Panel>
      </div>

      <Panel title="Integrations" subtitle="Systems the agents read evidence from and act upon" icon={PlugIcon} bodyClassName="">
        <ul className="divide-y divide-line">
          {integrations.map((i) => {
            const Icon = integrationIcons[i.icon] || PlugIcon;
            const meta = connectionMeta[i.status];
            const StatusIcon = meta.icon;
            return (
              <li key={i.name} className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-panel2">
                    <Icon className="h-4 w-4 text-fg2" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-fg">{i.name}</p>
                    <p className="truncate text-xs text-fg3">{i.detail}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${meta.text}`}>
                    <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {meta.label}
                  </span>
                  <button
                    type="button"
                    className="rounded-md border border-line2 bg-panel2 px-3 py-1.5 text-xs font-semibold text-fg transition-colors duration-150 ease-smooth hover:border-fg3">
                    
                    {i.status === 'disconnected' ? 'Connect' : 'Manage'}
                  </button>
                </div>
              </li>);

          })}
        </ul>
      </Panel>
    </div>);

}
