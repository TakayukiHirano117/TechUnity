import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export const GET = async (req: NextRequest) => {
	const recruits = await prisma.recruits.findMany({
		include: {
			creator: true,
		},
	});

	// console.log(recruits)

	return NextResponse.json(recruits);
};

export const POST = async (req: NextRequest) => {
	const { title, content, isPublished } = await req.json();

	const session = await getServerSession(authOptions);
	const creatorId = session!.user.id as string;

	const recruit = await prisma.recruits.create({
		data: {
			title,
			content,
			isPublished,
			creator: {
				connect: {
					id: creatorId,
				},
			},
		},
	});

	return NextResponse.json(recruit);
};
