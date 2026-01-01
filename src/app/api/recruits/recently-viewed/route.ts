import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

/**
 * 最近見た募集一覧取得API
 * @param req リクエスト
 * @returns 最近見た募集一覧
 */
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json(
        { error: "ids parameter is required" },
        { status: 400 }
      );
    }

    const ids = idsParam.split(",").filter((id) => id.trim() !== "");

    if (ids.length === 0) {
      return NextResponse.json([]);
    }

    const recruits = await prisma.recruit.findMany({
      where: {
        id: {
          in: ids,
        },
        isPublished: true,
      },
      include: {
        creator: true,
        likes: true,
        applications: true,
        hires: true,
      },
    });

    // IDの順序を維持してソート（最近見た順）
    const sortedRecruits = ids
      .map((id) => recruits.find((r) => r.id === id))
      .filter((r) => r !== undefined);

    return NextResponse.json(sortedRecruits);
  } catch (error) {
    console.error("Error fetching recently viewed recruits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

