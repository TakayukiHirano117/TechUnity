import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
	try {
		// select句で必要なカラムのみ返すように要修正
		const recruits = await prisma.recruit.findMany({
			where: {
				isPublished: true,
			},
			orderBy: {
				createdAt: "desc",
			},
			include: {
				creator: true,
				likes: true,
				applications: true,
			},
		});

		console.log(recruits);

		return NextResponse.json(recruits);
	} catch (error) {
		return NextResponse.json("error", { status: 500 });
	}
};
