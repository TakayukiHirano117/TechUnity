import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
	// 現在ログインしているユーザーの投稿をすべて取得
	const token = await getToken({ req });

	if (!token) {
		return NextResponse.json("unauthorized", { status: 403 });
	}

	console.log(token);

	const recruits = await prisma.recruits.findMany({
		where: {
			creatorId: token.id,
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			creator: true,
		},
	});

	return NextResponse.json(recruits);
};
