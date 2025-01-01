import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } },
) => {
	const id = params.id;

	const recruit = await prisma.recruits.findUnique({
		where: { id: id },
		include: { creator: true },
	});

	console.log(recruit);

	return NextResponse.json(recruit);
};
