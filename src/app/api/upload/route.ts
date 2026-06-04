import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { parseCsvRounds } from "@/lib/csv-parser";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const text = await file.text();
  const rounds = parseCsvRounds(text);

  const created = await prisma.$transaction(
    rounds.map((round) =>
      prisma.round.create({
        data: {
          userId: session.user.id,
          playerName: round.playerName,
          courseName: round.courseName,
          layoutName: round.layoutName,
          startDate: round.startDate,
          endDate: round.endDate ?? null,
          total: round.total,
          plusMinus: round.plusMinus,
          roundRating: round.roundRating ?? null,
          holeScores: {
            create: round.holeScores.map((hs) => ({
              hole: hs.hole,
              score: hs.score,
            })),
          },
        },
      })
    )
  );

  return NextResponse.json({ count: created.length });
}
