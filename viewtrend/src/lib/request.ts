import { NextRequest } from "next/server";

export function GetParam(request: NextRequest, key: string) {
  const url = new URL(request.url);
  return url.searchParams.get(key) ?? undefined;
}

export function GetIntParam(request: NextRequest, key: string) {
  const param = GetParam(request, key);

  if (!param) {
    return undefined;
  }

  const id = parseInt(param);

  if (isNaN(id)) {
    return undefined;
  }

  return id;
}
