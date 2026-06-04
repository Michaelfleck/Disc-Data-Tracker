import { topCourses } from "@/lib/data";

export function TopCourses() {
  const max = Math.max(...topCourses.map((c) => c.plays));
  return (
    <div className="flex flex-col gap-0.5">
      {topCourses.map((c, i) => (
        <div
          key={c.name}
          className="grid grid-cols-[22px_1fr_auto] items-center gap-[13px] rounded-card px-2 py-[11px] transition-colors hover:bg-panel-2"
        >
          <span className="text-center font-mono text-[13px] text-mute">{i + 1}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-fg">{c.name}</span>
              {c.tag && (
                <span className="whitespace-nowrap rounded-[5px] bg-accent-soft px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-accent">
                  {c.tag}
                </span>
              )}
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded bg-panel-2">
              <div
                className="h-full rounded"
                style={{
                  width: `${(c.plays / max) * 100}%`,
                  background: i === 0 ? "var(--accent)" : "var(--info)",
                  opacity: i === 0 ? 1 : 0.55,
                }}
              />
            </div>
          </div>
          <div className="text-right">
            <span className="font-display text-[17px] font-extrabold text-fg">{c.plays}</span>
            <span className="ml-1 font-mono text-[10px] text-mute">plays</span>
          </div>
        </div>
      ))}
    </div>
  );
}
