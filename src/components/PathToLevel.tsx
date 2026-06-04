import { ratingPath } from "@/lib/data";
import { IconChevR, IconTarget } from "./icons";
import { RatingProgression } from "./RatingProgression";

function DivChip({ label, sub, target }: { label: string; sub: string; target?: boolean }) {
  return (
    <div
      className="rounded-card px-4 py-2 text-center"
      style={{
        background: target ? "var(--accent-soft)" : "var(--panel-2)",
        border: `1px solid ${target ? "color-mix(in srgb, var(--accent) 40%, transparent)" : "var(--line-2)"}`,
      }}
    >
      <div
        className="font-display text-[20px] font-extrabold tracking-[0.02em]"
        style={{ color: target ? "var(--accent)" : "var(--text)", fontStretch: "125%" }}
      >
        {label}
      </div>
      <div className="mt-px font-mono text-[8.5px] uppercase tracking-[0.1em] text-mute">{sub}</div>
    </div>
  );
}

export function PathToLevel() {
  const P = ratingPath;
  const span = P.targetDivCeil - P.currentDivFloor;
  const posPct = Math.max(0, Math.min(100, ((P.current - P.currentDivFloor) / span) * 100));
  const threshPct = ((P.targetThreshold - P.currentDivFloor) / span) * 100;

  return (
    <div className="flex flex-col gap-[22px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-display text-[56px] font-black leading-[0.9] tracking-[-0.02em] text-accent" style={{ fontStretch: "125%" }}>
            {P.current}
          </div>
          <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-mute">Current player rating</div>
        </div>
        <div className="flex items-center gap-3">
          <DivChip label={P.currentDiv} sub="now" />
          <IconChevR size={16} className="text-mute" />
          <DivChip label={P.targetDiv} sub="target" target />
        </div>
      </div>

      <div>
        <div className="relative mb-1.5 mt-[26px] h-3 rounded-full border border-line bg-panel-2">
          <div
            className="absolute bottom-0 left-0 top-0 rounded-full"
            style={{ width: `${posPct}%`, background: "linear-gradient(90deg, color-mix(in srgb, var(--accent) 55%, transparent), var(--accent))" }}
          />
          <div className="absolute -bottom-1.5 -top-1.5 w-0.5 -translate-x-px bg-good-2" style={{ left: `${threshPct}%` }} />
          <div
            className="absolute -top-[22px] -translate-x-1/2 whitespace-nowrap font-mono text-[9.5px] tracking-[0.06em] text-good-2"
            style={{ left: `${threshPct}%` }}
          >
            {P.targetDiv} · {P.targetThreshold}
          </div>
          <div
            className="absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-bg bg-accent shadow-[0_0_10px_var(--accent)]"
            style={{ left: `${posPct}%` }}
          />
          <div
            className="absolute top-5 -translate-x-1/2 font-display text-sm font-extrabold text-fg"
            style={{ left: `${posPct}%` }}
          >
            {P.current}
          </div>
        </div>
        <div className="mt-[18px] flex justify-between font-mono text-[11px] text-mute">
          <span>{P.currentDiv} floor · {P.currentDivFloor}</span>
          <span>{P.targetDiv} ceiling · {P.targetDivCeil}</span>
        </div>
      </div>

      <div
        className="flex items-center gap-3 rounded-card px-4 py-3.5"
        style={{ background: "var(--good-soft)", border: "1px solid color-mix(in srgb, var(--good) 34%, transparent)" }}
      >
        <span className="inline-flex text-good-2"><IconTarget size={20} /></span>
        <div>
          <span className="font-display text-base font-extrabold text-good-2">{P.gapText}</span>
          <span className="ml-2 text-[13.5px] text-dim">{P.motivation}</span>
        </div>
      </div>

      <div>
        <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-mute">Rating trajectory · this season</div>
        <RatingProgression />
      </div>
    </div>
  );
}
