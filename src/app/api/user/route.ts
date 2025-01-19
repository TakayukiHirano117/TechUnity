import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
  // ユーザーデータを取得
  const session = await getServerSession(authOptions);

  if(!session) {
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
