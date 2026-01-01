import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// 募集一覧を取得するAPI
/**
 * 
 * @param req リクエスト
 * @returns 公開されている募集情報
 */
export const GET = async (_req: NextRequest) => {
  try {
    // select句で必要なカラムのみ返すように要修正
    // 今後全件取得ではなく、ページネーションと合わせて、一度に取得する件数を制限するように要修正

    const recruits = await prisma.recruit.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        creator: true,
        likes: true,
        applications: true,
        hires: true,
      },
    });

    return NextResponse.json(recruits);
  } catch {
    return NextResponse.json("error", { status: 500 });
  }
};
