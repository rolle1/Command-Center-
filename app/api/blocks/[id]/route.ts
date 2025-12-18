import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const block = await db.block.update({
    where: { id: params.id },
    data: body
  });

  return NextResponse.json({ block });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db.block.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
