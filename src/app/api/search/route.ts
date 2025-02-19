import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

const PAGE_SIZE = 20;

// 募集検索API
/**
 * 
 * @param req リクエスト
 * @returns 検索クエリに一致する募集情報
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const q = decodeURIComponent(searchParams.get("q") || "").trim();
  const page = parseInt(searchParams.get("page") || "1");

  // 検索ワードが指定されていない場合
  if (!q) {
    return NextResponse.json(
      { message: "検索ワードが指定されていません。" },
      { status: 400 },
    );
  }

  try {
    const totalCount = await prisma.recruit.count({
      where: {
        isPublished: true,
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;
    
    const recruits = await prisma.recruit.findMany({
      where: {
        isPublished: true,
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        creator: true,
        likes: true,
        applications: true,
        hires: true,
      },
    });

    console.log(recruits)

    return NextResponse.json({
      recruits,
      totalCount,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "検索に失敗しました。" },
      { status: 500 },
    );
  }
};
