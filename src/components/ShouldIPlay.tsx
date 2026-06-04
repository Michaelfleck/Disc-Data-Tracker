import { weather } from "@/lib/data";
import { IconSun, IconCloud, IconRain, IconWind } from "./icons";
import type { ForecastDay } from "@/lib/types";

const COND_ICON = { sun: IconSun, cloud: IconCloud, rain: IconRain } as const;

function condColor(cond: ForecastDay["cond"]) {
  if (cond === "sun") return "var(--accent)";
  if (cond === "rain") return "var(--info)";
  return "var(--dim)";
}

export function ShouldIPlay() {
  const W = weather;
  const dash = (W.score / 100) * 226;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="relative h-[84px] w-[84px] shrink-0">
          <svg width="84" height="84" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r="36" fill="none" stroke="var(--panel-2)" strokeWidth="8" />
            <circle
              cx="42" cy="42" r="36" fill="none" stroke="var(--good)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${dash} 226`} transform="rotate(-90 42 42)"
              style={{ filter: "drop-shadow(0 0 5px var(--good))" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-extrabold leading-none text-fg">{W.score}</span>
            <span className="font-mono text-[8.5px] tracking-[0.06em] text-mute">PLAYABILITY</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 text-[15px] font-bold text-good-2">
            <IconSun size={16} />{W.verdict}
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-dim">{W.blurb}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {W.forecast.map((f) => {
          const Ico = COND_ICON[f.cond];
          return (
            <div key={f.day} className="rounded-card border border-line bg-panel-2 px-2.5 py-3 text-center">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-mute">{f.day}</div>
              <div className="my-[5px] flex justify-center" style={{ color: condColor(f.cond) }}>
                <Ico size={26} />
              </div>
              <div>
                <span className="font-display text-[18px] font-extrabold text-fg">{f.hi}°</span>
                <span className="ml-[3px] font-mono text-[11px] text-mute">{f.lo}°</span>
              </div>
              <div className="mt-[5px] inline-flex items-center gap-1 font-mono text-[10.5px] text-dim">
                <IconWind size={12} />{f.wind}mph
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
