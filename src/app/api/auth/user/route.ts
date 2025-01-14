import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  // console.log(user)

  return NextResponse.json(user);
};
