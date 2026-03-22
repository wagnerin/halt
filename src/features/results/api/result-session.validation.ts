import { cuidSchema, slugSchema, z } from "@/lib/validation";

export const resultSessionParamsSchema = z.object({
  tournamentSlug: slugSchema,
  resultId: cuidSchema,
});

export type ResultSessionParams = z.infer<typeof resultSessionParamsSchema>;

export function parseResultSessionParams(input: unknown): ResultSessionParams | null {
  const parsed = resultSessionParamsSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }
  return parsed.data;
}
