import React from 'react';

// Shared panel shell: one border treatment, one header rhythm across the app.
export function Panel({ title, subtitle, icon: Icon, action, children, bodyClassName = '', className = '' }) {
  return (
    <section className={`rounded-lg border border-line bg-panel ${className}`}>
      {(title || action) &&
      <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-3.5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4 shrink-0 text-fg3" aria-hidden="true" />}
              <h2 className="truncate text-sm font-semibold tracking-tight text-fg">{title}</h2>
            </div>
            {subtitle && <p className="mt-1 text-xs text-fg3">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      }
      <div className={bodyClassName || 'p-5'}>{children}</div>
    </section>);

}