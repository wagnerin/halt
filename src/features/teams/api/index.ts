import { z } from "@/lib/validation";

export const teamCreateSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  country: z.string().min(2),
  description: z.string().min(20),
});
