import type { ReactNode } from "react";
import { stats } from "@/lib/data";
import { fmtPar, formState } from "@/lib/format";
import { Delta } from "./ui";
import { IconBasket, IconTarget, IconTrophy, IconBolt, IconFlame } from "./icons";

function StatCard({ icon, label, children, tint }: { icon: ReactNode; label: string; children: ReactNode; tint?: boolean }) {
  return (
    <div
      className="dg-stat flex min-h-[138px] flex-col gap-3 rounded-panel p-4 shadow-panel"
      style={{
        background: tint ? "var(--accent-soft)" : "var(--panel)",
        border: `1px solid ${tint ? "color-mix(in srgb, var(--accent) 28%, transparent)" : "var(--line)"}`,
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px]"
          style={{
            background: tint ? "color-mix(in srgb, var(--accent) 18%, transparent)" : "var(--panel-2)",
            color: tint ? "var(--accent)" : "var(--dim)",
          }}
        >
          {icon}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.07em] text-mute">{label}</span>
      </div>
      {children}
    </div>
  );
}

const bigNum = "font-display text-[40px] font-black leading-[0.95] tracking-[-0.02em] text-fg";
const subNote = "font-mono text-[11px] text-mute";

export function HeroStats() {
  const S = stats;
  const state = formState(S.formIndex);

  return (
    <div className="grid grid-cols-5 gap-[13px]">
      <StatCard icon={<IconBasket size={16} />} label="Total Rounds">
        <div className={bigNum} style={{ fontStretch: "125%" }}>{S.totalRounds}</div>
        <div className={subNote}>logged all-time · 38 this season</div>
      </StatCard>

      <StatCard icon={<IconTarget size={15} />} label="Avg Score">
        <div className="flex items-baseline gap-1">
          <span className={bigNum} style={{ fontStretch: "125%" }}>{fmtPar(S.avgToPar)}</span>
          <span className={subNote}>/ rd</span>
        </div>
        <Delta v={S.avgToParDelta} invert goodWord="vs prior 10" />
      </StatCard>

      <StatCard icon={<IconTrophy size={15} />} label="Best Round">
        <div className={bigNum} style={{ fontStretch: "125%", color: "var(--good-2)" }}>{fmtPar(S.bestRound.toPar)}</div>
        <div className={subNote}>{S.bestRound.course} · {S.bestRound.date} · {S.bestRound.rating}r</div>
      </StatCard>

      <StatCard icon={<IconBolt size={15} />} label="Last Round Rating">
        <div className={bigNum} style={{ fontStretch: "125%" }}>{S.currentRating}</div>
        <Delta v={S.currentRatingDelta} goodWord="vs season avg" />
      </StatCard>

      <StatCard icon={<IconFlame size={15} />} label="Form Index" tint>
        <div className="flex items-center gap-2.5">
          <span className="flex text-accent-2 drop-shadow-[0_0_8px_var(--accent-2)]">
            <IconFlame size={30} className="dg-flicker" />
          </span>
          <div className={bigNum} style={{ fontStretch: "125%", fontSize: 34, color: "var(--accent)" }}>{S.formIndex}</div>
        </div>
        <div>
          <div
            className="relative h-1.5 rounded"
            style={{ background: "linear-gradient(90deg, #5B6B7A 0%, #8A8060 45%, var(--accent) 100%)" }}
          >
            <span
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg bg-fg shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
              style={{ left: `${S.formIndex}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[8.5px] tracking-[0.06em] text-mute">
            <span>COLD</span><span>HOT</span>
          </div>
          <div className="mt-[7px] text-[13px] font-bold text-accent-2">{state}</div>
        </div>
      </StatCard>
    </div>
  );
}
