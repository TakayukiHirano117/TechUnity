import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    // リクエストボディの取得
    const body = await req.json();
    const { email, username, password } = body;

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 12);

    // ユーザーの作成
    const response = await prisma.user.create({
      data: {
        email,
        image:
          "https://res.cloudinary.com/dgoksx6om/image/upload/v1736771057/person_xvykw9.svg",
        name: username,
        hashedPassword,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
};
