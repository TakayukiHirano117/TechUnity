import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  
  const profile = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      recruits_creator: {
        where: {
          isPublished: true, // isPublishedがtrueのものだけ取得
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          isPublished: true,
          likes: true, // likesを含める
          applications: true, // applicationsを含める
          hires: true, // hiresを含める
        },
      },
    },
  });

  return NextResponse.json(profile);
};
