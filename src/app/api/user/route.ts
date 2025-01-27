import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// ユーザーデータを取得するAPI
/**
 * 
 * @param req リクエスト
 * @returns ログインしているユーザー情報
 */
export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  // これがないとログインしてない場合はエラーになるので要修正
  // かといってログインしているときといないときでレスポンスが異なるのはいかがなものか💦
  if (!session) {
    return NextResponse.json(session);
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return NextResponse.json(user);
};
