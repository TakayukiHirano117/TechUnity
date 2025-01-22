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

    const profile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching liked recruits:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = token.id;

    const { name, description, image } = await req.json();

    const profile = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        description,
        image,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching liked recruits:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};
