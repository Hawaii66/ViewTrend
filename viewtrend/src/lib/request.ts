import { NextRequest } from "next/server";

export function GetParam(request: NextRequest, key: string) {
  const url = new URL(request.url);
  return url.searchParams.get(key) ?? undefined;
}
