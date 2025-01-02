import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } },
) => {
	// recruitsテーブルからidをもとに投稿詳細を1件取得
	// 取得した投稿詳細をJSON形式で返す
	// 必要なカラムのみ返すこと。

	try {
		const token = await getToken({ req });

		if (!token) {
			return NextResponse.json("unauthorized", { status: 403 });
		}

		const id = params.id;

		const recruit = await prisma.recruits.findUnique({
			where: { id: id },
			select: {
				id: true,
				title: true,
				content: true,
				isPublished: true,
			},
		});

        console.log(recruit);

		return NextResponse.json({ recruit });
	} catch (error) {
		return NextResponse.json("error", { status: 500 });
	}
};
