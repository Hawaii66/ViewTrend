import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <div>
        <h1>ViewTrend</h1>
        <nav>
          <li>
            <Link href={"/predict"}>
              <Button>Predict</Button>
            </Link>
            <Link href={"/howto"}>
              <Button>How to</Button>
            </Link>
            <Link href={"/me"}>
              <Button>Me</Button>
            </Link>
          </li>
        </nav>
      </div>
    </div>
  );
}
