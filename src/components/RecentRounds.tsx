import { recent } from "@/lib/data";
import { fmtPar, monthDay } from "@/lib/format";
import { IconGhost } from "./icons";

const TH = "pb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-mute";

export function RecentRounds() {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={`${TH} text-left`}>Date</th>
            <th className={`${TH} text-left`}>Course</th>
            <th className={`${TH} text-left`}>Layout</th>
            <th className={`${TH} text-right`}>Score</th>
            <th className={`${TH} text-right`}>Rating</th>
            <th className={`${TH} text-center`}>PB</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((r, i) => {
            const scoreCol = r.toPar <= 3 ? "text-good-2" : r.toPar >= 9 ? "text-bad-2" : "text-fg";
            return (
              <tr key={i} className="dg-trow border-t border-line">
                <td className="py-[11px] font-mono text-[12.5px] text-dim">{monthDay(r.date)}</td>
                <td className="py-[11px] text-[13.5px] font-semibold text-fg">{r.course}</td>
                <td className="py-[11px] font-mono text-xs text-mute">{r.layout}</td>
                <td className="py-[11px] text-right">
                  <span className={`font-display text-base font-extrabold ${scoreCol}`}>{fmtPar(r.toPar)}</span>
                </td>
                <td className="py-[11px] text-right font-mono text-[13px] text-dim">{r.rating}</td>
                <td className="py-[11px] text-center">
                  <span
                    className="inline-flex"
                    title={
                      r.pbBeat == null
                        ? "First time on this track"
                        : r.pbBeat
                          ? `New personal best — beat your old mark by ${-(r.pbDelta ?? 0)}`
                          : "Did not beat your best here"
                    }
                    style={{
                      color: r.pbBeat ? "var(--accent)" : "var(--mute)",
                      opacity: r.pbBeat ? 1 : 0.45,
                      filter: r.pbBeat ? "drop-shadow(0 0 5px var(--accent))" : "none",
                    }}
                  >
                    {r.pbBeat == null ? <span className="text-mute">—</span> : <IconGhost size={18} lit={r.pbBeat} />}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-[13px] flex items-center gap-2 border-t border-line pt-3">
        <span className="inline-flex text-accent drop-shadow-[0_0_4px_var(--accent)]">
          <IconGhost size={15} lit />
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.02em] text-mute">
          Ghost lights up when you set a new personal best on that exact course + layout. Short and Long Pads count separately.
        </span>
      </div>
    </div>
  );
}
