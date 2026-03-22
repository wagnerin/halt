import { z } from "@/lib/validation";

export const raceResultCreateSchema = z.object({
  tournamentId: z.string().cuid(),
  eventName: z.string().min(2),
  sessionType: z.string().min(2),
  date: z.string().datetime(),
});
