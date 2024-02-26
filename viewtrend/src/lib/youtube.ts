import { youtube } from "@googleapis/youtube";
import prisma from "./prisma";

export async function VideoById(id: string) {
  const youtubeResponse = await youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  }).videos.list({
    part: ["statistics", "snippet"],
    id: [id],
  });

  if (!youtubeResponse.data.items) {
    return undefined;
  }

  const data = youtubeResponse.data.items[0];

  return data;
}

export async function ViewsById(id: number) {
  const videoId = await prisma.video.findFirst({
    where: {
      id: id,
    },
    select: {
      reference: true,
    },
  });

  const youtubeResponse = await youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  }).videos.list({
    part: ["statistics", "snippet"],
    id: [videoId?.reference!],
  });

  if (!youtubeResponse.data.items) {
    return undefined;
  }
  const data = youtubeResponse.data.items[0];

  const views = parseInt(data.statistics?.viewCount!);

  return views;
}
