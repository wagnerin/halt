import { NextResponse } from "next/server";

import {
  adminArticleIdParamsSchema,
  mapRequestBodyToAdminArticleInput,
  parseAdminArticleInput,
} from "@/features/news/api";
import { getAdminNewsArticleForEdit, updateAdminNews } from "@/features/news/domain";
import { UnauthorizedError, requireMinimumRole } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    await requireMinimumRole("VIEWER");
    const { id } = await context.params;
    const parsedId = adminArticleIdParamsSchema.safeParse({ id });
    if (!parsedId.success) {
      return NextResponse.json({ message: "Invalid article id." }, { status: 400 });
    }

    const article = await getAdminNewsArticleForEdit(parsedId.data.id);
    if (!article) {
      return NextResponse.json({ message: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
    return NextResponse.json({ message: "Unable to fetch article." }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireMinimumRole("EDITOR");
    const { id } = await context.params;
    const parsedId = adminArticleIdParamsSchema.safeParse({ id });
    if (!parsedId.success) {
      return NextResponse.json({ message: "Invalid article id." }, { status: 400 });
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
    }

    const mapped = mapRequestBodyToAdminArticleInput(payload as Record<string, unknown>);
    const parsed = parseAdminArticleInput(mapped);
    if (!parsed) {
      return NextResponse.json(
        { message: "Validation failed for article payload." },
        { status: 400 }
      );
    }

    const updated = await updateAdminNews(parsedId.data.id, parsed);
    if (!updated) {
      return NextResponse.json({ message: "Article not found." }, { status: 404 });
    }
    return NextResponse.json({ id: updated.id });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
    return NextResponse.json(
      {
        message: "Unable to update article. Check slug uniqueness and relation IDs.",
      },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  return NextResponse.json(
    {
      message: "Delete endpoint not implemented in this iteration.",
    },
    { status: 501 }
  );
}
