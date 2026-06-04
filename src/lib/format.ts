export function fmtPar(v: number): string {
  if (v > 0) return "+" + (Number.isInteger(v) ? v : v.toFixed(1));
  if (v < 0) return String(Number.isInteger(v) ? v : v.toFixed(1));
  return "E";
}

export function monthDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formState(v: number): string {
  if (v >= 80) return "Peaking";
  if (v >= 55) return "Heating up";
  if (v >= 35) return "Steady";
  return "Running cold";
}
