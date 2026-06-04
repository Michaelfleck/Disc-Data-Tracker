"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import { ratingPath } from "@/lib/data";

function RTip({ active, payload }: { active?: boolean; payload?: { payload: { label: string; r: number } }[] }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-card border border-line-2 bg-panel-hi px-2.5 py-1.5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      <div className="font-display text-lg font-extrabold text-accent">{p.r}</div>
      <div className="font-mono text-[9.5px] text-mute">{p.label}</div>
    </div>
  );
}

export function RatingProgression() {
  const P = ratingPath;
  const vals = P.history.map((h) => h.r);
  const lo = Math.min(...vals, P.targetThreshold) - 5;
  const hi = Math.max(...vals, P.targetThreshold) + 4;

  return (
    <div style={{ width: "100%", height: 168 }}>
      <ResponsiveContainer>
        <AreaChart data={P.history} margin={{ top: 16, right: 14, bottom: 4, left: -10 }}>
          <defs>
            <linearGradient id="ratingArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--mute)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--line)" }}
            minTickGap={18}
          />
          <YAxis
            domain={[lo, hi]}
            tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--mute)" }}
            tickLine={false}
            axisLine={false}
            width={42}
          />
          <Tooltip content={<RTip />} cursor={{ stroke: "var(--line-2)" }} />
          <ReferenceLine
            y={P.targetThreshold}
            stroke="var(--good-2)"
            strokeWidth={1.4}
            strokeDasharray="5 4"
            label={{
              value: `${P.targetDiv} threshold · ${P.targetThreshold}`,
              position: "insideTopRight",
              fill: "var(--good-2)",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
            }}
          />
          <Area
            type="monotone"
            dataKey="r"
            stroke="var(--accent)"
            strokeWidth={2.2}
            fill="url(#ratingArea)"
            dot={{ r: 2.4, fill: "var(--bg)", stroke: "var(--accent)", strokeWidth: 1.6 }}
            activeDot={{ r: 4, fill: "var(--accent)", stroke: "var(--bg)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
