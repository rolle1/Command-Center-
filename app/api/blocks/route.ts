import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { startOfLocalDayISO, getLocalZone } from "@/lib/time";
import { validateCreateBlock } from "@/lib/validate";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date")!;
  const zone = url.searchParams.get("tz") ?? getLocalZone();

  const { start, end } = startOfLocalDayISO(date, zone);

  const blocks = await db.block.findMany({
    where: { startAt: { gte: start, lte: end } },
    orderBy: { startAt: "asc" }
  });

  return NextResponse.json({ blocks });
}

export async function POST(req: Request) {
  const body = await req.json();
  const errors = validateCreateBlock(body);

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const block = await db.block.create({
    data: {
      title: body.title,
      notes: body.notes ?? "",
      startAt: new Date(body.startAtISO),
      endAt: new Date(body.endAtISO),
      timezone: body.timezone,
      mode: body.mode,
      status: body.status
    }
  });

  return NextResponse.json({ block });
}
