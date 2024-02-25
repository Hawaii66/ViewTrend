import { GetParam } from "@/lib/request";
import { NextRequest, NextResponse } from "next/server";
import { youtube } from "@googleapis/youtube";
import { Video } from "@/types/Standard";
import prisma from "@/lib/prisma";

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
    const youtubeResponse = await youtube({
      version: "v3",
      auth: "AIzaSyDe1YZ03LBHFSM99dt5lZqotwq-NkPM2dg",
    }).videos.list({
      part: ["statistics", "snippet"],
      id: [id],
    });

    if (!youtubeResponse.data.items) {
      return NextResponse.json({}, { status: 500 });
    }

    const data = youtubeResponse.data.items[0];

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
