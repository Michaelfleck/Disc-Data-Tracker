import { bestCourse, worstCourse } from "@/lib/data";
import type { CourseForm } from "@/lib/types";
import { IconArrowUp, IconArrowDown } from "./icons";

function Cell({ d, good }: { d: CourseForm; good: boolean }) {
  return (
    <div
      className="flex-1 rounded-card px-4 pb-[18px] pt-4"
      style={{
        background: good ? "var(--good-soft)" : "var(--bad-soft)",
        border: `1px solid ${good ? "color-mix(in srgb, var(--good) 30%, transparent)" : "color-mix(in srgb, var(--bad) 30%, transparent)"}`,
      }}
    >
      <div className="flex items-center gap-[7px]">
        {good ? <IconArrowUp size={14} className="text-good-2" /> : <IconArrowDown size={14} className="text-bad-2" />}
        <span className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] ${good ? "text-good-2" : "text-bad-2"}`}>
          {good ? "Your edge" : "Your kryptonite"}
        </span>
      </div>
      <div className="mt-2.5 text-base font-bold text-fg">{d.name}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className={`font-display text-[30px] font-extrabold ${good ? "text-good-2" : "text-bad-2"}`}>
          {d.delta > 0 ? "+" : ""}{d.delta}
        </span>
        <span className="font-mono text-[11px] text-dim">rating pts</span>
      </div>
      <div className="mt-2 text-xs leading-snug text-dim">{d.note}</div>
    </div>
  );
}

export function BestWorst() {
  return (
    <div className="flex gap-3">
      <Cell d={bestCourse} good />
      <Cell d={worstCourse} good={false} />
    </div>
  );
}
