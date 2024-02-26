import prisma from "@/lib/prisma";
import { GetIntParam } from "@/lib/request";
import { ViewsById } from "@/lib/youtube";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const id = GetIntParam(request, "id");

  if (!id) {
    return NextResponse.json({}, { status: 400 });
  }

  const views = await ViewsById(id);

  if (!views) {
    return NextResponse.json({}, { status: 500 });
  }

  await prisma.view.create({
    data: {
      count: views,
      video: id,
    },
  });

  return NextResponse.json({});
};
