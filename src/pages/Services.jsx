import React from 'react';
import { ServerIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ServiceHealthCard } from '../components/ServiceHealthCard';
import { services } from '../data/mockData';

export function Services({ environment }) {
  const unhealthy = services.filter((s) => s.status !== 'healthy').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        subtitle={`${services.length} monitored services in ${environment.toLowerCase()} · ${unhealthy} need attention`}>
        
        <span className="inline-flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-2 text-xs font-medium text-fg2">
          <ServerIcon className="h-3.5 w-3.5 text-fg3" aria-hidden="true" />
          prod-us-east
        </span>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) =>
        <ServiceHealthCard key={s.id} service={s} />
        )}
      </div>
    </div>);

}