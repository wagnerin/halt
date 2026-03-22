import { PublishStatus } from "@prisma/client";

import type { AdminArticleInput } from "../api";
import {
  createAdminNewsArticle,
  findAdminNewsArticleById,
  listAdminNewsArticles,
  listAdminNewsEditorOptions,
  updateAdminNewsArticle,
  type AdminNewsEditRecord,
  type AdminNewsEditorOptions,
  type AdminNewsListRecord,
} from "../data";

export type AdminNewsListItem = AdminNewsListRecord;
export type AdminNewsEditArticle = AdminNewsEditRecord;
export type AdminNewsFormOptions = AdminNewsEditorOptions;

export async function getAdminNewsList(): Promise<AdminNewsListItem[]> {
  return listAdminNewsArticles();
}

export async function getAdminNewsFormOptions(): Promise<AdminNewsFormOptions> {
  return listAdminNewsEditorOptions();
}

export async function getAdminNewsArticleForEdit(
  id: string
): Promise<AdminNewsEditArticle | null> {
  return findAdminNewsArticleById(id);
}

type SaveAdminNewsInput = {
  input: AdminArticleInput;
  authorId: string | null;
};

export async function createAdminNews({
  input,
  authorId,
}: SaveAdminNewsInput): Promise<{ id: string }> {
  return createAdminNewsArticle(
    {
      ...input,
      coverImage: input.coverImage ?? null,
      status: input.status ?? PublishStatus.DRAFT,
    },
    authorId
  );
}

export async function updateAdminNews(
  id: string,
  input: AdminArticleInput
): Promise<{ id: string } | null> {
  return updateAdminNewsArticle(id, {
    ...input,
    coverImage: input.coverImage ?? null,
    status: input.status ?? PublishStatus.DRAFT,
  });
}
