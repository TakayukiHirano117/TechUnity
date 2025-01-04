import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

export const POST = async (
	req: NextRequest,
	{ params }: { params: { id: string } },
) => {
	try {
		const token = await getToken({ req });

		if (!token) {
			return NextResponse.json("unauthorized", { status: 403 });
		}

		const userId = token.id;
		const recruitId = params.id;

		const existingLike = await prisma.like.findFirst({
			where: {
				userId,
				recruitId,
			},
		});

		if (existingLike) {
			await prisma.like.delete({
				where: { id: existingLike.id },
			});
		} else {
			const res = await prisma.like.create({
				data: {
					userId: userId,
					recruitId: recruitId,
				},
			});
		}

		const isLiked = existingLike ? false : true;

		// console.log(isLiked)

		return NextResponse.json({ success: true, isLiked }, { status: 200 });
	} catch (error) {
		console.error("Error in POST /api/recruits/:id/like:", error); // ログに出力
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : String(error) }, // エラー内容をレスポンスに含める
			{ status: 500 },
		);
	}
};
