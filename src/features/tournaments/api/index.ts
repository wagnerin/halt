import { z } from "@/lib/validation";

export const tournamentCreateSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  organizer: z.string().min(2),
  game: z.string().min(2),
});
