"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, View } from "@/types/Standard";
import { useState } from "react";

function Page() {
  const [link, setLink] = useState("");

  const predict = async () => {
    const response = await fetch("/api/predict?link=" + link);
    const data: {
      video: Video;
      view: View;
    } = await response.json();

    console.log(data);
  };

  return (
    <div className="flex flex-grow justify-center items-center w-full ">
      <Card>
        <CardHeader>
          <CardTitle>Link a video</CardTitle>
          <CardDescription>
            Link to a video to start the predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Video link</Label>
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={predict}>Predict</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
