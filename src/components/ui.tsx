import type { ReactNode } from "react";
import { IconArrowUp, IconArrowDown, IconChevR } from "./icons";

export function Panel({
  title, kicker, action, children, className = "", pad = "p-5",
}: {
  title?: string;
  kicker?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  pad?: string;
}) {
  return (
    <section className={`relative rounded-panel border border-line bg-panel shadow-panel ${pad} ${className}`}>
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="h-4 w-[3px] shrink-0 rounded-sm bg-accent" />
            <div className="min-w-0">
              {kicker && (
                <div className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-mute">{kicker}</div>
              )}
              {title && (
                <h2 className="m-0 font-display text-lg font-bold tracking-[-0.01em] text-fg">{title}</h2>
              )}
            </div>
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function LinkMore({ children = "View all" }: { children?: ReactNode }) {
  return (
    <button className="inline-flex items-center gap-0.5 px-0.5 py-1 font-mono text-[11.5px] tracking-[0.03em] text-dim transition-colors hover:text-accent">
      {children}
      <IconChevR size={14} />
    </button>
  );
}

export function NoteRight({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[10.5px] text-mute">{children}</span>;
}

export function Delta({ v, invert, goodWord }: { v: number; invert?: boolean; goodWord?: string }) {
  const isGood = invert ? v < 0 : v > 0;
  const Arrow = v < 0 ? IconArrowDown : IconArrowUp;
  return (
    <span className={`inline-flex items-center gap-0.5 font-mono text-[11.5px] font-semibold ${isGood ? "text-good-2" : "text-bad-2"}`}>
      <Arrow size={12} />
      {v > 0 ? "+" : ""}{v}{" "}
      {goodWord && <span className="font-normal text-mute">{goodWord}</span>}
    </span>
  );
}
