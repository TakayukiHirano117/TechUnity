import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

// ユーザー新規登録API
/**
 * 
 * @param req リクエスト
 * @returns ユーザー情報
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

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
