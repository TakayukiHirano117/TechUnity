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

		const existingApplication = await prisma.application.findFirst({
			where: {
				userId,
				recruitId,
			},
		});

		if (existingApplication) {
			await prisma.application.delete({
				where: { id: existingApplication.id },
			});
		} else {
			await prisma.application.create({
				data: {
					userId: userId,
					recruitId: recruitId,
				},
			});
		}

		const isApplied = existingApplication ? false : true;

		return NextResponse.json({ success: true, isApplied }, { status: 200 });
	} catch (error) {
		console.error("Error: ", error); // ログに出力
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : String(error) }, // エラー内容をレスポンスに含める
			{ status: 500 },
		);
	}
};