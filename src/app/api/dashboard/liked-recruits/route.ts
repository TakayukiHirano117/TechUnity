import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = token.id;

    const likedRecruits = await prisma.recruit.findMany({
      where: {
        likes: {
          some: {
            userId: userId, // 自分がいいねした投稿のみフィルタリング
          },
        },
      },
      include: {
        creator: true, // 投稿の作成者の情報を取得
        likes: true, // いいねの情報を取得（必要に応じて削除可能）
        applications: true, // 応募の情報を取得（必要に応じて削除可能）
        hires: true, // 採用の情報を取得（必要に応じて削除可能）
      },
    });

    return NextResponse.json(likedRecruits);
  } catch (error) {
    console.error("Error fetching liked recruits:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};
