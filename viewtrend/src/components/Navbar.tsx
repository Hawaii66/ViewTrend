import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

function Navbar() {
  return (
    <>
      <div className="flex flex-row justify-between items-center px-12 pt-4 w-full">
        <h1 className="flex-grow font-extrabold text-2xl text-left text-purple-700">
          ViewTrend
        </h1>
        <nav>
          <Link href={"/"}>
            <Button variant={"link"}>Home</Button>
          </Link>
          <Link href={"/predict"}>
            <Button variant={"link"}>Predict</Button>
          </Link>
          <Link href={"/howto"}>
            <Button variant={"link"}>How to</Button>
          </Link>
          <Link href={"/me"}>
            <Button variant={"link"}>Me</Button>
          </Link>
        </nav>
      </div>
      <Separator />
    </>
  );
}

export default Navbar;
