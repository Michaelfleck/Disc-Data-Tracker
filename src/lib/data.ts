// Placeholder dataset — swap this module for Prisma queries when the DB is wired.

import type {
  Round, TrendPoint, User, Stats, TopCourse, CourseForm,
  HoleStruggle, Rival, Weather, SplitStat, RatingPath,
} from "./types";
import { monthDay } from "./format";

const toParSeq = [10, 8, 11, 9, 7, 12, 9, 8, 10, 6, 9, 7, 8, 11, 6, 7, 9, 5, 8, 6, 7, 4, 6, 8, 5, 6, 3, 5, 4, 2];

const courses = ["Kilborne TPC", "Eastway Park", "Sugaw Creek", "Renaissance Park", "Reedy Creek", "Hornets Nest"];
const layouts = ["Long Pads · 18", "Short Pads · 18", "Blue · 18", "Gold · 18", "Red · 18"];

const courseIdxSeq = [0, 0, 1, 2, 0, 3, 1, 0, 2, 4, 0, 1, 2, 0, 5, 1, 0, 2, 3, 0, 1, 0, 2, 4, 0, 1, 0, 2, 1, 0];
const layoutIdxSeq = [0, 1, 2, 0, 1, 3, 1, 0, 2, 4, 0, 1, 2, 0, 4, 1, 0, 2, 3, 0];

const START = new Date("2026-06-01T12:00:00");

function buildRounds(): Round[] {
  const rounds: Round[] = toParSeq.map((p, i) => {
    const idxFromEnd = toParSeq.length - 1 - i;
    const d = new Date(START);
    d.setDate(d.getDate() - idxFromEnd * 3);
    const rating = Math.round(1004 - p * 11 + ((i * 37) % 9) - 4);
    return {
      i,
      date: d.toISOString(),
      toPar: p,
      rating,
      course: courses[courseIdxSeq[i]],
      layout: layouts[layoutIdxSeq[i % 20]],
      pbBeat: null,
      pbDelta: null,
    };
  });

  const pbByTrack: Record<string, number> = {};
  for (const r of rounds) {
    const key = `${r.course} :: ${r.layout}`;
    const prevPB = pbByTrack[key];
    r.pbBeat = prevPB == null ? null : r.toPar < prevPB;
    r.pbDelta = prevPB == null ? null : r.toPar - prevPB;
    if (prevPB == null || r.toPar < prevPB) pbByTrack[key] = r.toPar;
  }
  return rounds;
}

export const rounds: Round[] = buildRounds();

function rollingAt(globalIdx: number): number {
  const s = Math.max(0, globalIdx - 4);
  const slice = toParSeq.slice(s, globalIdx + 1);
  return slice.reduce((a, b) => a + b, 0) / slice.length;
}

export const trend: TrendPoint[] = rounds.map((r) => ({
  idx: r.i,
  label: monthDay(r.date),
  course: r.course,
  toPar: r.toPar,
  rating: r.rating,
  rolling: Number(rollingAt(r.i).toFixed(2)),
}));

export const recent: Round[] = [...rounds].reverse().slice(0, 10);

export const user: User = {
  name: "Michael Fleck",
  handle: "@fleck",
  initials: "MF",
  home: "Charlotte, NC",
  level: 27,
  xp: 2140,
  xpMax: 3000,
  title: "Chain Hunter",
  avgRating: 931,
};

export const stats: Stats = {
  totalRounds: 142,
  avgToPar: 4.6,
  avgToParDelta: -1.7,
  bestRound: { toPar: -2, course: "Sugaw Creek", date: "Apr 18", rating: 1012 },
  currentRating: 982,
  currentRatingDelta: 51,
  formIndex: 78,
  formLabel: "Heating up",
  formTrend: "up",
};

export const topCourses: TopCourse[] = [
  { name: "Kilborne TPC", plays: 38, tag: "Home turf" },
  { name: "Eastway Park", plays: 27, tag: null },
  { name: "Sugaw Creek", plays: 21, tag: null },
  { name: "Renaissance Park", plays: 16, tag: null },
  { name: "Reedy Creek", plays: 12, tag: null },
];

export const bestCourse: CourseForm = {
  name: "Sugaw Creek", delta: 34, note: "You rate 34 pts above your average here", rating: 965,
};
export const worstCourse: CourseForm = {
  name: "Renaissance Park", delta: -41, note: "The wooded gauntlet keeps biting", rating: 890,
};

export const holeStruggle: HoleStruggle = {
  course: "Kilborne TPC",
  layout: "Blue · 18",
  holes: [
    { hole: 11, avg: 1.8, par: 3, note: "247ft · OB right, tunnel tee" },
    { hole: 4, avg: 1.3, par: 4, note: "510ft · dogleg, water carry" },
    { hole: 17, avg: 1.1, par: 3, note: "298ft · elevated basket" },
    { hole: 7, avg: 0.9, par: 3, note: "320ft · blind gap shot" },
    { hole: 14, avg: 0.7, par: 4, note: "465ft · uphill finish" },
  ],
};

export const rivals: Rival[] = [
  { name: "Jordan Pike", initials: "JP", w: 14, l: 3, margin: 5.6, badge: "prey", rounds: 17, last: "May 28", streak: { type: "W", n: 4 } },
  { name: "Dave Kowalski", initials: "DK", w: 12, l: 7, margin: 3.2, badge: "prey", rounds: 19, last: "May 24", streak: { type: "W", n: 2 } },
  { name: "Priya Anand", initials: "PA", w: 6, l: 5, margin: 0.4, badge: "even", rounds: 11, last: "May 19", streak: null },
  { name: "Marcus Webb", initials: "MW", w: 8, l: 8, margin: 0.1, badge: "even", rounds: 16, last: "May 12", streak: null },
  { name: "Sarah Tran", initials: "ST", w: 5, l: 9, margin: -1.8, badge: "nemesis", rounds: 14, last: "May 30", streak: { type: "L", n: 3 } },
  { name: "Tyler Nguyen", initials: "TN", w: 3, l: 6, margin: -2.4, badge: "nemesis", rounds: 9, last: "Apr 30", streak: { type: "L", n: 2 } },
];

export const weather: Weather = {
  verdict: "Prime conditions",
  blurb: "Light wind, dry fairways, low 70s. Go chase a personal best at Kilborne.",
  score: 92,
  forecast: [
    { day: "Today", hi: 72, lo: 54, wind: 5, cond: "sun", play: 92 },
    { day: "Tue", hi: 68, lo: 50, wind: 9, cond: "cloud", play: 76 },
    { day: "Wed", hi: 61, lo: 47, wind: 14, cond: "rain", play: 38 },
  ],
};

export const playWindows: SplitStat = {
  best: "morning", worst: "evening",
  insight: "Your sharpest rounds happen before noon — morning you, keep it up.",
  slots: [
    { key: "morning", label: "Morning", sub: "before noon", avg: 3.1, rounds: 54 },
    { key: "afternoon", label: "Afternoon", sub: "noon–5pm", avg: 5.4, rounds: 61 },
    { key: "evening", label: "Evening", sub: "after 5pm", avg: 6.8, rounds: 27 },
  ],
};

export const restPerf: SplitStat = {
  best: "3plus", worst: "same",
  insight: "You play best after 3+ days away — fresh legs, cleaner lines.",
  slots: [
    { key: "same", label: "Same day", sub: "back-to-back", avg: 6.2, rounds: 22 },
    { key: "1to2", label: "1–2 days", sub: "short rest", avg: 5.1, rounds: 68 },
    { key: "3plus", label: "3+ days", sub: "well rested", avg: 3.8, rounds: 52 },
  ],
};

export const ratingPath: RatingPath = {
  current: 934,
  currentDiv: "MA3",
  currentDivFloor: 900,
  targetDiv: "MA2",
  targetThreshold: 935,
  targetDivCeil: 970,
  gapText: "1 rating point away",
  motivation: "You're right on the doorstep.",
  history: [
    { label: "Jan", r: 905 },
    { label: "Feb", r: 909 },
    { label: "Feb", r: 907 },
    { label: "Mar", r: 914 },
    { label: "Mar", r: 919 },
    { label: "Apr", r: 917 },
    { label: "Apr", r: 924 },
    { label: "May", r: 928 },
    { label: "May", r: 926 },
    { label: "May", r: 931 },
    { label: "Jun", r: 933 },
    { label: "Now", r: 934 },
  ],
};

export const cards = { owned: 47, total: 120, newCount: 3, latest: "Tunnel Vision — Rare" };
