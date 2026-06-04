"use client";

import { useState } from "react";
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { trend } from "@/lib/data";
import { fmtPar } from "@/lib/format";
import type { TrendPoint } from "@/lib/types";

const RANGES = [10, 20, 30] as const;

function ChartTip({ active, payload }: { active?: boolean; payload?: { payload: TrendPoint }[] }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  const col = p.toPar <= 3 ? "var(--good-2)" : p.toPar >= 9 ? "var(--bad-2)" : "var(--text)";
  return (
    <div className="w-[170px] rounded-card border border-line-2 bg-panel-hi px-3 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-mute">
        {p.label} · {p.course}
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="font-display text-[26px] font-extrabold leading-none" style={{ color: col }}>
          {fmtPar(p.toPar)}
        </span>
        <span className="font-mono text-xs text-dim">{p.rating} rated</span>
      </div>
      <div className="mt-1 text-[11.5px] text-dim">5-rd avg {fmtPar(Number(p.rolling.toFixed(1)))}</div>
    </div>
  );
}

function Legend({ swatch, label, bold }: { swatch: string; label: string; bold?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="rounded-sm" style={{ width: 16, height: bold ? 3 : 2, background: swatch, opacity: bold ? 1 : 0.7 }} />
      <span className="font-mono text-[11px] tracking-[0.03em] text-dim">{label}</span>
    </span>
  );
}

export function TrendChart() {
  const [range, setRange] = useState<number>(30);
  const data = trend.slice(trend.length - range);
  const tickGap = Math.max(1, Math.floor(data.length / 6));

  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-[18px]">
          <Legend swatch="var(--accent)" label="Rolling 5-round avg" bold />
          <Legend swatch="var(--dim)" label="Round score" />
        </div>
        <div className="flex gap-1 rounded-card border border-line bg-panel-2 p-[3px]">
          {RANGES.map((n) => (
            <button
              key={n}
              onClick={() => setRange(n)}
              className="rounded-[4px] px-3 py-[5px] font-mono text-xs font-semibold tracking-[0.04em] transition-colors"
              style={{
                background: range === n ? "var(--accent)" : "transparent",
                color: range === n ? "#15140a" : "var(--dim)",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: -8 }}>
            <defs>
              <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--good)" stopOpacity={0.34} />
                <stop offset="100%" stopColor="var(--good)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--line)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontFamily: "var(--font-mono)", fontSize: 10.5, fill: "var(--mute)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--line)" }}
              interval={tickGap - 1}
              minTickGap={20}
            />
            <YAxis
              reversed
              tickFormatter={(v: number) => fmtPar(v)}
              tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--mute)" }}
              tickLine={false}
              axisLine={false}
              width={44}
            />
            <Tooltip content={<ChartTip />} cursor={{ stroke: "var(--line-2)" }} />
            <Area type="monotone" dataKey="rolling" stroke="none" fill="url(#trendArea)" />
            <Line type="linear" dataKey="toPar" stroke="var(--dim)" strokeWidth={1.5} strokeOpacity={0.7}
              dot={{ r: 2, fill: "var(--bg)", stroke: "var(--dim)", strokeWidth: 1.2 }} activeDot={{ r: 3.5 }} />
            <Line type="monotone" dataKey="rolling" stroke="var(--accent)" strokeWidth={3}
              dot={false} activeDot={{ r: 5, fill: "var(--accent)", stroke: "var(--bg)", strokeWidth: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
