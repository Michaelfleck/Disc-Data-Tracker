export type BadgeKind = "prey" | "nemesis" | "even";

export interface Round {
  i: number;
  date: string;
  toPar: number;
  rating: number;
  course: string;
  layout: string;
  pbBeat: boolean | null;
  pbDelta: number | null;
}

export interface TrendPoint {
  idx: number;
  label: string;
  course: string;
  toPar: number;
  rating: number;
  rolling: number;
}

export interface User {
  name: string;
  handle: string;
  initials: string;
  home: string;
  level: number;
  xp: number;
  xpMax: number;
  title: string;
  avgRating: number;
}

export interface Stats {
  totalRounds: number;
  avgToPar: number;
  avgToParDelta: number;
  bestRound: { toPar: number; course: string; date: string; rating: number };
  currentRating: number;
  currentRatingDelta: number;
  formIndex: number;
  formLabel: string;
  formTrend: "up" | "down";
}

export interface TopCourse { name: string; plays: number; tag: string | null }

export interface CourseForm { name: string; delta: number; note: string; rating: number }

export interface StruggleHole { hole: number; avg: number; par: number; note: string }
export interface HoleStruggle { course: string; layout: string; holes: StruggleHole[] }

export interface Rival {
  name: string;
  initials: string;
  w: number;
  l: number;
  margin: number;
  badge: BadgeKind;
  rounds: number;
  last: string;
  streak: { type: "W" | "L"; n: number } | null;
}

export interface ForecastDay {
  day: string;
  hi: number;
  lo: number;
  wind: number;
  cond: "sun" | "cloud" | "rain";
  play: number;
}
export interface Weather {
  verdict: string;
  blurb: string;
  score: number;
  forecast: ForecastDay[];
}

export interface SplitSlot { key: string; label: string; sub: string; avg: number; rounds: number }
export interface SplitStat { best: string; worst: string; insight: string; slots: SplitSlot[] }

export interface RatingPath {
  current: number;
  currentDiv: string;
  currentDivFloor: number;
  targetDiv: string;
  targetThreshold: number;
  targetDivCeil: number;
  gapText: string;
  motivation: string;
  history: { label: string; r: number }[];
}
