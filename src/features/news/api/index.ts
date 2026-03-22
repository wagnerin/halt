import { z } from "@/lib/validation";

export const articleCreateSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.string().min(20),
});

export {
  adminArticleIdParamsSchema,
  adminArticleInputSchema,
  parseAdminArticleInput,
} from "./admin-article.validation";
export type { AdminArticleInput } from "./admin-article.validation";
export { mapRequestBodyToAdminArticleInput } from "./admin-article.dto";
