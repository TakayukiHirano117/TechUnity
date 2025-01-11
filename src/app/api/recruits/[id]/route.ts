import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;

    const token = await getToken({ req });

    // console.log(req)

    // const session = await getServerSession(authOptions);

    // console.log("session: " + session)

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

    // 自分が「いいね」しているかどうかを判定
    const isLiked = userId
      ? recruit.likes.some((like) => like.userId === userId)
      : false;

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

    // console.log("id: " + id)

	// console.log( "userId: " + userId)

  // console.log( "token: " + token)

	// console.log(recruit.likes.some((like) => console.log(like.userId)));

	console.log(response);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};

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

    const { title, content, isPublished } = await req.json();

    const updatedAt = new Date();

    const recruit = await prisma.recruit.update({
      where: { id: id },
      data: {
        title,
        content,
        isPublished,
        updatedAt,
      },
    });

    return NextResponse.json(recruit);
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};

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

    await prisma.recruit.delete({
      where: { id: id },
    });

    return NextResponse.json("success");
  } catch (error) {
    return NextResponse.json("error", { status: 500 });
  }
};
