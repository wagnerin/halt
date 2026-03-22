import { z } from "@/lib/validation";
import { NextResponse } from "next/server";

export const followSchema = z
  .object({
    userId: z.string().cuid(),
    driverId: z.string().cuid().optional(),
    teamId: z.string().cuid().optional(),
  })
  .refine((data) => Boolean(data.driverId || data.teamId), {
    message: "Either driverId or teamId is required.",
  });

export function notImplemented(scope: string): NextResponse {
  return NextResponse.json(
    {
      message: `${scope} endpoint is scaffolded but not implemented yet.`,
    },
    { status: 501 }
  );
}
