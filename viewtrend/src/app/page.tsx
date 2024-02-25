import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListLatest } from "@/lib/video";
import Link from "next/link";

export default async function Home() {
  const videos = await ListLatest(20);

  return (
    <div className="gap-4 grid grid-cols-5 p-4">
      {videos.map((video) => (
        <Card className="overflow-hidden">
          <img className="w-full aspect-video" src={video.image} />
          <CardHeader>
            <CardTitle>{video.title}</CardTitle>
            <CardDescription>{video.description.slice(0, 100)}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={`/predict/${video.id}`}>
              <Button>Predict</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
