import { GetParam } from "@/lib/request";
import { NextRequest, NextResponse } from "next/server";
import { Video } from "@/types/Standard";
import prisma from "@/lib/prisma";
import { VideoById } from "@/lib/youtube";

export const revalidate = 0;

export const GET = async (request: NextRequest) => {
  const link = GetParam(request, "link");

  if (!link) {
    return NextResponse.json({}, { status: 400 });
  }

  const id = new URL(link).searchParams.get("v");
  if (!id) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const data = await VideoById(id);
    if (!data) {
      return NextResponse.json({}, { status: 500 });
    }
    const video = await prisma.video.create({
      data: {
        description: data.snippet?.description!,
        image: data.snippet?.thumbnails?.standard?.url!,
        publishDate: new Date(data.snippet?.publishedAt!),
        reference: id,
        title: data.snippet?.title!,
      },
    });

    const view = await prisma.view.create({
      data: {
        count: parseInt(data.statistics?.viewCount!),
        video: video.id,
      },
    });

    return NextResponse.json({
      view,
      video,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({}, { status: 500 });
  }
};
