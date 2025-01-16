import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });
    const session = await getServerSession(authOptions);
    console.log("session:" + session);

    // ここに問題あり。 tokenが取れてない。
    if (!token) {
      return NextResponse.json("unauthorized", { status: 403 });
    }

    const recruits = await prisma.recruit.findMany({
      where: {
        creatorId: token.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        isPublished: true,
        creator: {
          select: {
            id: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        applications: {
          select: {
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
    });

    console.log(recruits);

    return NextResponse.json(recruits);
  } catch (error) {
	console.log(error)
    return NextResponse.json(error, { status: 500 });
  }
};
