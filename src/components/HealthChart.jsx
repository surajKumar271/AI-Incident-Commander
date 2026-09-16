import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-md border border-line2 bg-panel2 px-2.5 py-1.5 shadow-lg">
      <p className="font-mono text-2xs text-fg3">{label}</p>
      <p className="tabular text-xs font-semibold text-fg">
        {payload[0].value}
        {unit}
      </p>
    </div>);

}

export function HealthChart({
  data,
  color = '#f04438',
  unit = '',
  height = 180,
  markerLabel,
  markerX,
  domain,
  gradientId = 'hc'
}) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#20242c" vertical={false} />
          <XAxis dataKey="t" tick={{ fill: '#6a7381', fontSize: 11 }} stroke="#20242c" tickLine={false} interval="preserveStartEnd" />
          <YAxis
            tick={{ fill: '#6a7381', fontSize: 11 }}
            stroke="#20242c"
            tickLine={false}
            axisLine={false}
            domain={domain || ['auto', 'auto']}
            width={44} />
          
          <Tooltip content={<ChartTooltip unit={unit} />} cursor={{ stroke: '#2b313b' }} />
          {markerX &&
          <ReferenceLine
            x={markerX}
            stroke="#6366f1"
            strokeDasharray="3 3"
            label={{ value: markerLabel, fill: '#8b8ff5', fontSize: 10, position: 'insideTopLeft' }} />

          }
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#${gradientId})`} dot={false} activeDot={{ r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>);

}

export function Sparkline({ data, color = '#31c48d', height = 36, gradientId = 'sp' }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#${gradientId})`} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>);

}