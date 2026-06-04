import { rivals } from "@/lib/data";
import type { BadgeKind } from "@/lib/types";

const BADGE: Record<BadgeKind, { label: string; text: string; bg: string }> = {
  prey: { label: "PREY", text: "#0E2A1C", bg: "var(--good)" },
  nemesis: { label: "NEMESIS", text: "#34140A", bg: "var(--bad)" },
  even: { label: "DEAD EVEN", text: "#23211B", bg: "var(--neutral)" },
};

export function RivalryStrip() {
  return (
    <div className="dg-scroll flex gap-3 overflow-x-auto pb-1.5" style={{ scrollSnapType: "x proximity" }}>
      {rivals.map((r) => {
        const b = BADGE[r.badge];
        const total = r.w + r.l;
        const onStreak = r.streak && r.streak.n >= 2;
        const streakGood = r.streak && r.streak.type === "W";
        return (
          <div
            key={r.name}
            className="shrink-0 basis-[224px] rounded-card border border-line bg-panel-2 p-[15px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-line-2 bg-panel-hi font-display text-sm font-bold text-fg">
                {r.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-semibold text-fg">{r.name}</div>
                <span
                  className="mt-0.5 inline-block rounded-[4px] px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.08em]"
                  style={{ color: b.text, background: b.bg }}
                >
                  {b.label}
                </span>
              </div>
            </div>

            <div className="mt-[13px] flex items-baseline gap-2">
              <span className="font-display text-[28px] font-extrabold tracking-[-0.01em] text-fg">
                {r.w}<span className="font-bold text-mute">–</span>{r.l}
              </span>
              <span className="font-mono text-[10.5px] text-mute">W–L</span>
              {onStreak && (
                <span
                  className="ml-auto rounded-full px-[7px] py-0.5 font-mono text-[11px] font-bold tracking-[0.04em]"
                  style={{
                    color: streakGood ? "var(--good-2)" : "var(--bad-2)",
                    background: streakGood ? "var(--good-soft)" : "var(--bad-soft)",
                    border: `1px solid ${streakGood ? "var(--good)" : "var(--bad)"}`,
                  }}
                >
                  {r.streak!.type}{r.streak!.n}
                </span>
              )}
            </div>

            <div className="mt-2.5 flex h-1 overflow-hidden rounded bg-bad">
              <div className="bg-good" style={{ width: `${(r.w / total) * 100}%` }} />
            </div>

            <div className="mt-2.5 flex justify-between font-mono text-[11px]">
              <span className="text-dim">Avg margin</span>
              <span className={`font-semibold ${r.margin > 0 ? "text-good-2" : "text-bad-2"}`}>
                {r.margin > 0 ? "+" : ""}{r.margin} <span className="text-mute">throws</span>
              </span>
            </div>

            <div className="mt-2 border-t border-line pt-[9px] font-mono text-[10.5px] tracking-[0.02em] text-mute">
              Last played · <span className="text-dim">{r.last}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
