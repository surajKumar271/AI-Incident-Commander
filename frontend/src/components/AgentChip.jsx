import React from 'react';
import { BotIcon, SearchCodeIcon, GitCompareIcon, WrenchIcon } from 'lucide-react';

const icons = {
  'Investigation Agent': SearchCodeIcon,
  'Root Cause Agent': GitCompareIcon,
  'Recovery Agent': WrenchIcon
};

export function AgentChip({ name, tone = 'ai' }) {
  const Icon = icons[name] || BotIcon;
  const isSystem = name === 'System';
  const skin = isSystem || tone === 'neutral' ? 'bg-white/5 text-fg2 ring-line2' : 'bg-ai/10 text-ai/90 ring-ai/25';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-2xs font-medium ring-1 ring-inset ${skin}`}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {name}
    </span>);

}

export function ToolChip({ name }) {
  return (
    <span className="inline-flex items-center rounded border border-line2 bg-panel2 px-1.5 py-0.5 font-mono text-2xs text-fg2">
      {name}
    </span>);

}