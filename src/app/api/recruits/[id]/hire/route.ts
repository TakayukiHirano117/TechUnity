import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/db";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json("unauthorized", { status: 403 });
    }
    const body = await req.json();

    // token.idではなく、応募してきたユーザーのidを使用。
    const userId = body?.arg?.userId;
    const recruitId = params.id;

    const existingHire = await prisma.hire.findFirst({
      where: {
        // userId,
        userId,
        recruitId,
      },
    });

    if (existingHire) {
      await prisma.hire.delete({
        where: { id: existingHire.id },
      });
    } else {
      const res = await prisma.hire.create({
        data: {
          userId,
          recruitId,
        },
      });
    }

    const isHired = existingHire ? false : true;

    return NextResponse.json({ success: true, isHired }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/recruits/:id/hire:", error); // ログに出力
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) }, // エラー内容をレスポンスに含める
      { status: 500 },
    );
  }
};
