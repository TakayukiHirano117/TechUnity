import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
	try {
		const token = await getToken({ req });

		if (!token) {
			return NextResponse.json("unauthorized", { status: 403 });
		}

		const recruits = await prisma.recruit.findMany({
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
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
};
