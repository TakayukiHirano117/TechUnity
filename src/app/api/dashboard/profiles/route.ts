import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/db";

// ログイン中のユーザーのプロフィールを取得
/**
 * 
 * @param req リクエスト
 * @returns ログイン中のユーザーのプロフィール
 */
export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = token.id;

    const profile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        githubUrl: true,
        description: true,
        image: true,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};

// ログイン中のユーザーのプロフィールを更新
/**
 * 
 * @param req リクエスト
 * @returns 更新されたプロフィール
 */
export const PUT = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = token.id;

    const { name, githubUrl, description, image } = await req.json();

    const profile = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        githubUrl,
        description,
        image,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};
