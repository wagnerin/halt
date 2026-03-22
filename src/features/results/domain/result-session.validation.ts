import { cuidSchema, slugSchema, z } from "@/lib/validation";

const resultSessionParamsSchema = z.object({
  tournamentSlug: slugSchema,
  resultId: cuidSchema,
});

type ResultSessionParams = z.infer<typeof resultSessionParamsSchema>;

export function parseResultSessionParams(input: unknown): ResultSessionParams | null {
  const parsed = resultSessionParamsSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }
  return parsed.data;
}
