const VW = 1280;
const VH = 2960;

function buildPaths(): { d: string; sw: number }[] {
  const out: { d: string; sw: number }[] = [];
  const rng = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  let li = 0;
  for (let y = -40; y < VH; y += 34) {
    const seed = li * 1.37 + 3;
    const amp = 10 + rng(seed) * 26;
    const phase = rng(seed + 1) * Math.PI * 2;
    const freq = 0.7 + rng(seed + 2) * 0.9;
    const sw = [0.5, 0.6, 0.75, 0.9, 1][li % 5];
    let d = "";
    const steps = 16;
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * VW;
      const yy =
        y +
        Math.sin((x / VW) * Math.PI * 2 * freq + phase) * amp +
        Math.sin((x / VW) * Math.PI * 5 + phase * 1.7) * (amp * 0.25);
      d += `${s ? "L" : "M"}${x.toFixed(1)} ${yy.toFixed(1)} `;
    }
    out.push({ d, sw });
    li++;
  }
  return out;
}

const PATHS = buildPaths();
const MASK =
  "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 14%, rgba(0,0,0,0.28) 32%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.04) 100%)";

export function TopoField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ WebkitMaskImage: MASK, maskImage: MASK }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMin slice" className="block">
        {PATHS.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke="#2A2A25" strokeWidth={p.sw} />
        ))}
      </svg>
    </div>
  );
}
