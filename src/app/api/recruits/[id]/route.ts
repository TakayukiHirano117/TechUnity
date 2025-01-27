import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/db";

// 募集詳細取得API
/**
 * 
 * @param req リクエスト
 * @param params 募集ID
 * @returns 募集詳細
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;

    const token = await getToken({ req });

    const userId = token?.id || null;

    const recruit = await prisma.recruit.findUnique({
      where: { id: id },
      include: {
        creator: true,
        likes: {
          select: {
            userId: true,
          },
        },
        applications: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!recruit) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // ログインしているユーザーが「いいね」しているかどうかを判定
    const isLiked = userId
      ? recruit.likes.some((like) => like.userId === userId)
      : false;

    // ログインしているユーザーが応募しているかどうかを判定
    const isApplied = userId
      ? recruit.applications.some(
          (application) => application.userId === userId,
        )
      : false;

    const response = {
      ...recruit,
      isLiked,
      isApplied,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};

// 募集更新API
/**
 * 
 * @param req リクエスト
 * @param params 募集ID
 * @returns 更新した募集情報
 */
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json("unauthorized", { status: 403 });
    }

    const id = params.id;

    const { title, content, isPublished, repositoryUrl } = await req.json();

    const updatedAt = new Date();

    const recruit = await prisma.recruit.update({
      where: { id: id },
      data: {
        title,
        content,
        isPublished,
        repositoryUrl,
        updatedAt,
      },
    });

    return NextResponse.json(recruit);
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};

// 募集削除API
/**
 * 
 * @param req リクエスト
 * @param params 募集ID
 * @returns 削除成功
 */
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json("unauthorized", { status: 403 });
    }

    const id = params.id;

    const recruit = await prisma.recruit.delete({
      where: { id: id },
    });

    return NextResponse.json(recruit);
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};
