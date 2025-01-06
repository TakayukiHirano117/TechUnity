import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } },
) => {
	const profile = await prisma.user.findUnique({
		where: { id: params.id },
		include: {
			recruits_creator: true,
		},
	});

	console.log(profile)

	return NextResponse.json(profile);
};
