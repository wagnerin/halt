import { z } from "@/lib/validation";

export const driverCreateSchema = z.object({
  nickname: z.string().min(2),
  slug: z.string().min(2),
  country: z.string().min(2),
  bio: z.string().min(20),
});
