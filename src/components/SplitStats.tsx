import type { ReactNode } from "react";
import { playWindows, restPerf } from "@/lib/data";
import { fmtPar } from "@/lib/format";
import type { SplitStat } from "@/lib/types";
import { IconClock, IconMoon } from "./icons";

function SplitStatView({ data, icon }: { data: SplitStat; icon: ReactNode }) {
  const maxAvg = Math.max(...data.slots.map((s) => s.avg));
  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-3 gap-2.5">
        {data.slots.map((s) => {
          const isBest = s.key === data.best;
          const isWorst = s.key === data.worst;
          const accent = isBest ? "var(--good-2)" : isWorst ? "var(--bad-2)" : "var(--neutral-2)";
          const barCol = isBest ? "var(--good)" : isWorst ? "var(--bad)" : "var(--neutral)";
          return (
            <div
              key={s.key}
              className="rounded-card px-3 pb-3.5 pt-[13px]"
              style={{
                background: isBest ? "var(--good-soft)" : isWorst ? "var(--bad-soft)" : "var(--panel-2)",
                border: `1px solid ${
                  isBest
                    ? "color-mix(in srgb, var(--good) 36%, transparent)"
                    : isWorst
                      ? "color-mix(in srgb, var(--bad) 36%, transparent)"
                      : "var(--line)"
                }`,
              }}
            >
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.04em] text-dim">{s.label}</div>
              <div className="mt-px font-mono text-[9.5px] text-mute">{s.sub}</div>
              <div className="mt-2 font-display text-[26px] font-extrabold leading-none" style={{ color: accent, fontStretch: "125%" }}>
                {fmtPar(s.avg)}
              </div>
              <div className="mt-2.5 h-1 overflow-hidden rounded bg-panel-hi">
                <div
                  className="h-full rounded"
                  style={{ width: `${(s.avg / maxAvg) * 100}%`, background: barCol, opacity: isBest || isWorst ? 1 : 0.6 }}
                />
              </div>
              <div className="mt-[7px] font-mono text-[9px] text-mute">{s.rounds} rds</div>
            </div>
          );
        })}
      </div>
      <p className="m-0 text-[12.5px] leading-snug text-dim">
        <span className="mr-1.5 inline-flex translate-y-[3px] text-accent">{icon}</span>
        {data.insight}
      </p>
    </div>
  );
}

export function PlayWindows() {
  return <SplitStatView data={playWindows} icon={<IconClock size={15} />} />;
}
export function RestPerf() {
  return <SplitStatView data={restPerf} icon={<IconMoon size={15} />} />;
}
