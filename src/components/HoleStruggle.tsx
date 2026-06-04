import { holeStruggle } from "@/lib/data";

export function HoleStruggle() {
  const { holes } = holeStruggle;
  const max = Math.max(...holes.map((h) => h.avg));

  return (
    <div className="flex flex-col gap-3.5">
      {holes.map((h, i) => {
        const pct = (h.avg / max) * 100;
        const hot = i === 0;
        return (
          <div key={h.hole} className="group grid grid-cols-[54px_1fr_56px] items-center gap-3.5">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.05em] text-mute">HOLE</span>
              <span className="font-display text-[22px] font-extrabold leading-none text-fg">{h.hole}</span>
            </div>
            <div className="relative">
              <div className="h-[30px] overflow-hidden rounded-card border border-line bg-panel-2">
                <div
                  className="h-full rounded-card transition-[width] duration-500"
                  style={{
                    width: `${pct}%`,
                    background: hot
                      ? "linear-gradient(90deg, var(--bad-soft), var(--bad))"
                      : "linear-gradient(90deg, var(--accent-soft), var(--accent))",
                    boxShadow: hot ? "0 0 12px var(--bad-soft)" : "0 0 12px var(--accent-soft)",
                  }}
                />
              </div>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11.5px] font-medium text-fg opacity-80 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] transition-opacity group-hover:opacity-100">
                {h.note}
              </span>
            </div>
            <div className="text-right">
              <span className={`font-display text-[20px] font-extrabold ${hot ? "text-bad-2" : "text-accent"}`}>
                +{h.avg}
              </span>
              <span className="-mt-px block font-mono text-[10px] text-mute">over par</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
