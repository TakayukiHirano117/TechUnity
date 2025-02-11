import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

// ログイン中のユーザーが応募した募集情報を取得
/**
 * 
 * @param req リクエスト
 * @returns ログイン中のユーザーが応募した募集情報
 */
export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = token.id;

    const appliedRecruits = await prisma.recruit.findMany({
      where: {
        applications: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        creator: true,
        likes: true,
        applications: true,
        hires: true,
      },
    });

    // ログインしてるユーザーが採用されているかどうかの情報を追加
    const recruitsWithIsHired = appliedRecruits.map((recruit) => {
      const isHired = recruit.hires.some((hire) => hire.userId === userId);
      return {
        ...recruit,
        isHired,
      };
    });

    return NextResponse.json(recruitsWithIsHired);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};
