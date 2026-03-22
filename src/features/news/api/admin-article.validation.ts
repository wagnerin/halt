import { PublishStatus } from "@prisma/client";

import { cuidSchema, slugSchema, z } from "@/lib/validation";

const publishStatusSchema = z.nativeEnum(PublishStatus);

const relatedIdsSchema = z.array(cuidSchema).default([]);

export const adminArticleInputSchema = z
  .object({
    slug: slugSchema,
    title: z.string().min(5).max(180),
    excerpt: z.string().min(10).max(400),
    content: z.string().min(20),
    coverImage: z.string().trim().url().nullable().optional().transform((value) => value ?? null),
    status: publishStatusSchema,
    tagIds: relatedIdsSchema,
    relatedDriverIds: relatedIdsSchema,
    relatedTeamIds: relatedIdsSchema,
    relatedTournamentIds: relatedIdsSchema,
  })
  .superRefine((value, ctx) => {
    const uniqueTagIds = new Set(value.tagIds);
    if (uniqueTagIds.size !== value.tagIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tagIds"],
        message: "Tag assignments must be unique.",
      });
    }

    if (value.status === PublishStatus.PUBLISHED && value.title.trim().length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["title"],
        message: "Published articles require a valid title.",
      });
    }
  });

export type AdminArticleInput = z.infer<typeof adminArticleInputSchema>;

export const adminArticleIdParamsSchema = z.object({
  id: cuidSchema,
});

export function parseAdminArticleInput(input: unknown): AdminArticleInput | null {
  const parsed = adminArticleInputSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }
  return parsed.data;
}
