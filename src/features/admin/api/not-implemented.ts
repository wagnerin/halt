import { NextResponse } from "next/server";

export function notImplemented(scope: string): NextResponse {
  return NextResponse.json(
    {
      message: `${scope} endpoint is scaffolded but not implemented yet.`,
    },
    { status: 501 }
  );
}
