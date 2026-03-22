import { z } from "@/lib/validation";

export const raceResultCreateSchema = z.object({
  tournamentId: z.string().cuid(),
  eventName: z.string().min(2),
  sessionType: z.string().min(2),
  date: z.string().datetime(),
});

export { mapRaceResultToDto } from "./result-session.dto";
export type { ResultSessionDetailDto, ResultSessionStandingDto } from "./result-session.dto";
export { parseResultSessionParams, resultSessionParamsSchema } from "./result-session.validation";
export type { ResultSessionParams } from "./result-session.validation";
