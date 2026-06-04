import Papa from "papaparse";
import type { ParsedRound } from "@/types";

const MAX_HOLES = 21;

interface CsvRow {
  PlayerName: string;
  CourseName: string;
  LayoutName: string;
  StartDate: string;
  EndDate: string;
  Total: string;
  "+/-": string;
  RoundRating: string;
  [key: string]: string;
}

export function parseCsvRounds(csvText: string): ParsedRound[] {
  const { data, errors } = Papa.parse<CsvRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length) {
    throw new Error(`CSV parse error: ${errors[0].message}`);
  }

  return data.map((row) => {
    const holeScores: ParsedRound["holeScores"] = [];

    for (let i = 1; i <= MAX_HOLES; i++) {
      const raw = row[`Hole${i}`];
      if (raw !== undefined && raw !== "") {
        holeScores.push({ hole: i, score: parseInt(raw, 10) || null });
      }
    }

    return {
      playerName: row.PlayerName,
      courseName: row.CourseName,
      layoutName: row.LayoutName,
      startDate: new Date(row.StartDate),
      endDate: row.EndDate ? new Date(row.EndDate) : undefined,
      total: parseInt(row.Total, 10),
      plusMinus: parseInt(row["+/-"], 10),
      roundRating: row.RoundRating ? parseInt(row.RoundRating, 10) : undefined,
      holeScores,
    };
  });
}
