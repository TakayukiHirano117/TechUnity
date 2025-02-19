import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// 募集一覧取得API
/**
 * 
 * @param req リクエスト
 * @returns 募集一覧
 */
export const GET = async (req: NextRequest) => {
  try {
    // select句で必要なカラムのみ返すように要修正
    const recruits = await prisma.recruit.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      include: {
        creator: true,
        likes: true,
        applications: true,
        hires: true,
      },
    });

    return NextResponse.json(recruits);
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};

// 募集作成API
/**
 * 
 * @param req リクエスト
 * @returns 作成した募集情報
 */
export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json("unauthorized", { status: 403 });
    }

    const { title, content, isPublished, repositoryUrl } = await req.json();

    const session = await getServerSession(authOptions);
    const creatorId = session!.user.id as string;

    const recruit = await prisma.recruit.create({
      data: {
        title,
        content,
        isPublished,
        repositoryUrl,
        creator: {
          connect: {
            id: creatorId,
          },
        },
      },
    });

    return NextResponse.json(recruit);
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};
