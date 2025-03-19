import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";


// コメント一覧取得API
/**
 * 
 * @param req リクエスト
 * @param params 募集ID
 * @returns コメント一覧
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const recruitId = params.id;

    // トップレベルのコメントを取得
    const comments = await prisma.comment.findMany({
      where: { 
        recruitId,
        parentId: null // 親コメントのみを取得
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        // 返信コメントを含める
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            // ネストされた返信も含める（再帰的に）
            replies: {
              include: {
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
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "コメントの取得に失敗しました。" },
      { status: 500 },
    );
  }
};

// コメント投稿API
/**
 * 
 * @param req リクエスト
 * @param params 募集ID
 * @returns 作成したコメント
 */
export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { error: "認証が必要です。" },
        { status: 401 },
      );
    }

    const recruitId = params.id;
    const userId = token.id as string;
    const { content, parentId } = await req.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "コメント内容は必須です。" },
        { status: 400 },
      );
    }

    // 募集が存在するか確認
    const recruit = await prisma.recruit.findUnique({
      where: { id: recruitId },
    });

    if (!recruit) {
      return NextResponse.json(
        { error: "募集が見つかりません。" },
        { status: 404 },
      );
    }

    // 親コメントが指定されている場合、存在確認
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        return NextResponse.json(
          { error: "親コメントが見つかりません。" },
          { status: 404 },
        );
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        recruitId,
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "コメントの投稿に失敗しました。" },
      { status: 500 },
    );
  }
};
