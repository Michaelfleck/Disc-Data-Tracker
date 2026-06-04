export interface ParsedRound {
  playerName: string;
  courseName: string;
  layoutName: string;
  startDate: Date;
  endDate?: Date;
  total: number;
  plusMinus: number;
  roundRating?: number;
  holeScores: Array<{ hole: number; score: number | null }>;
}

export interface RoundWithScores {
  id: string;
  playerName: string;
  courseName: string;
  layoutName: string;
  startDate: string;
  endDate: string | null;
  total: number;
  plusMinus: number;
  roundRating: number | null;
  holeScores: Array<{ id: string; hole: number; score: number | null }>;
}
