import React from 'react';

export function PageHeader({ title, subtitle, children, eyebrow }) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        {eyebrow}
        <h1 className="text-xl font-semibold tracking-tight text-fg">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-fg2">{subtitle}</p>}
      </div>
      {children && <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>}
    </div>);

}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {Icon &&
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-line bg-panel2">
          <Icon className="h-4 w-4 text-fg3" aria-hidden="true" />
        </div>
      }
      <p className="text-sm font-medium text-fg">{title}</p>
      {description && <p className="mt-1 max-w-sm text-xs text-fg3">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>);

}