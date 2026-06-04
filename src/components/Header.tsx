import { user, cards } from "@/lib/data";
import { IconBasket, IconSearch, IconBell } from "./icons";

const NAV: [string, boolean, number?][] = [
  ["Overview", true],
  ["Rounds", false],
  ["Courses", false],
  ["Rivals", false],
  ["Cards", false, cards.newCount],
];

export function Header() {
  const xpPct = (user.xp / user.xpMax) * 100;
  const ring = 2 * Math.PI * 19;

  return (
    <header className="flex items-center gap-6 border-b border-line pb-[18px]">
      <div className="flex items-center gap-2.5">
        <span className="flex text-accent drop-shadow-[0_0_6px_var(--accent-soft)]">
          <IconBasket size={26} />
        </span>
        <span className="font-display text-[22px] font-black tracking-[0.04em] text-fg" style={{ fontStretch: "125%" }}>
          CHAINS
        </span>
      </div>

      <nav className="ml-2 flex gap-1">
        {NAV.map(([label, active, badge]) => (
          <button
            key={label}
            className="relative rounded-card px-[13px] py-[7px] text-[13.5px] transition-colors"
            style={{
              background: active ? "var(--accent-soft)" : "transparent",
              color: active ? "var(--accent)" : "var(--dim)",
              fontWeight: active ? 600 : 500,
            }}
          >
            {label}
            {badge ? (
              <span className="ml-1.5 rounded-lg bg-accent px-[5px] py-px font-mono text-[9.5px] font-bold text-[#15140a]">
                {badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      <button className="flex h-[38px] w-[38px] items-center justify-center rounded-card border border-line bg-panel text-dim transition-colors hover:border-line-2 hover:bg-panel-2 hover:text-fg">
        <IconSearch size={17} />
      </button>
      <button className="relative flex h-[38px] w-[38px] items-center justify-center rounded-card border border-line bg-panel text-dim transition-colors hover:border-line-2 hover:bg-panel-2 hover:text-fg">
        <IconBell size={17} />
        <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full border-[1.5px] border-bg bg-bad" />
      </button>

      <div
        className="flex items-center gap-[11px] rounded-full border border-line-2 bg-panel py-1.5 pl-[7px] pr-3.5"
        style={{ backgroundImage: "linear-gradient(120deg, transparent 30%, var(--accent-soft) 50%, transparent 70%)" }}
      >
        <div className="relative h-[42px] w-[42px]">
          <svg width="42" height="42" viewBox="0 0 42 42" className="absolute inset-0 -rotate-90">
            <circle cx="21" cy="21" r="19" fill="none" stroke="var(--panel-2)" strokeWidth="3" />
            <circle cx="21" cy="21" r="19" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${(xpPct / 100) * ring} ${ring}`} />
          </svg>
          <div className="absolute inset-1 flex items-center justify-center rounded-full bg-panel-hi font-display text-sm font-extrabold text-fg">
            {user.initials}
          </div>
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-fg">{user.name}</div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.03em] text-mute">
            <span className="font-bold text-accent">LV {user.level}</span>
            <span>·</span>
            <span>{user.title}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
