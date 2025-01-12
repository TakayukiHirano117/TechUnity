import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  const userId = session?.user.id;

  return NextResponse.json(session);
};
