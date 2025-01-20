import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  // const q = decodeURIComponent(rawQuery.trim());
  
  console.log(q)

  // 検索ワードが指定されていない場合
  if (!q) {
    return NextResponse.json(
      { message: "検索ワードが指定されていません。" },
      { status: 400 },
    );
  }


  try {
    const results = await prisma.recruit.findMany({
      where: {
        isPublished: true, // 公開されているもののみを対象
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive", // 大文字・小文字を区別しない
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
      include: {
        creator: true,
        likes: true,
        applications: true,
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching recruits: ", error);
    return NextResponse.json(
      { message: "検索に失敗しました。" },
      { status: 500 },
    );
  }
};
