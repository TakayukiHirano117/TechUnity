import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/db";

// ログイン中のユーザーが作成した募集情報を取得
/**
 * 
 * @param req リクエスト
 * @returns ログイン中のユーザーが作成した募集情報
 */
export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json("unauthorized", { status: 403 });
    }

    const recruits = await prisma.recruit.findMany({
      where: {
        creatorId: token.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        isPublished: true,
        creator: {
          select: {
            id: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        applications: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        hires: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });


    return NextResponse.json(recruits);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
