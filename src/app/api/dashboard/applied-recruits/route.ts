import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = token.id;

    const appliedRecruits = await prisma.recruit.findMany({
      where: {
        applications: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        creator: true,
        likes: true,
        applications: true,
        hires: true,
      },
    });

    return NextResponse.json(appliedRecruits);
  } catch (error) {
    console.error("Error fetching applied recruits:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};
