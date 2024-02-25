import { PrismaClient, Video as PrismaVideo } from "@prisma/client";
import prisma from "./prisma";
import { Video } from "@/types/Standard";

function ToVideo(row: PrismaVideo) {
  const video: Video = {
    description: row.description,
    id: row.id,
    image: row.image,
    publishDate: row.publishDate,
    refrence: row.reference,
    title: row.title,
  };

  return video;
}

export async function ListLatest(count: number) {
  const videos = await prisma.video.findMany({
    orderBy: {
      publishDate: "asc",
    },
    skip: 0,
    take: count,
  });

  return videos.map(ToVideo);
}
