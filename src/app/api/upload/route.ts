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
  const parsed = parseCsvRounds(text);

  let importedCount = 0;

  for (const round of parsed) {
    // Upsert course (city unknown from CSV — use null so uniqueness is per name only)
    const course = await prisma.course.upsert({
      where: { name_city: { name: round.courseName, city: "" } },
      create: { name: round.courseName, city: "" },
      update: {},
    });

    // Upsert layout
    const layout = await prisma.layout.upsert({
      where: { courseId_name: { courseId: course.id, name: round.layoutName } },
      create: { courseId: course.id, name: round.layoutName },
      update: {},
    });

    await prisma.round.create({
      data: {
        userId: session.user.id,
        courseId: course.id,
        layoutId: layout.id,
        playerName: round.playerName,
        playedAt: round.startDate,
        endedAt: round.endDate ?? null,
        total: round.total,
        toPar: round.plusMinus,
        rating: round.roundRating ?? null,
        holeScores: {
          create: round.holeScores
            .filter((hs) => hs.score !== null)
            .map((hs) => ({ hole: hs.hole, strokes: hs.score as number })),
        },
      },
    });

    importedCount++;
  }

  return NextResponse.json({ count: importedCount });
}
