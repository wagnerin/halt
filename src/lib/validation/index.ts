import { z } from "zod";

export const cuidSchema = z.string().cuid();
export const slugSchema = z.string().min(2).max(120).regex(/^[a-z0-9-]+$/);

export { z };
