import { NextResponse } from "next/server";

import {
  mapRequestBodyToAdminArticleInput,
  parseAdminArticleInput,
} from "@/features/news/api";
import { createAdminNews, getAdminNewsList } from "@/features/news/domain";
import { UnauthorizedError, requireMinimumRole } from "@/lib/auth";

export async function GET() {
  try {
    await requireMinimumRole("VIEWER");
    const articles = await getAdminNewsList();
    return NextResponse.json({ articles });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
    return NextResponse.json({ message: "Unable to fetch articles." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireMinimumRole("EDITOR");

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

    const created = await createAdminNews({
      input: parsed,
      authorId: user.id,
    });
    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
    return NextResponse.json(
      {
        message: "Unable to create article. Check slug uniqueness and relation IDs.",
      },
      { status: 400 }
    );
  }
}
