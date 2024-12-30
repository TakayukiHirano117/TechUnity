import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export const POST = async (req: NextRequest) => {
	const { title, content } = await req.json();

	const session = await getServerSession(authOptions);
	const creatorId = session!.user.id as string;

	const recruit = await prisma.recruits.create({
		data: {
			title,
			content,
			// creatorId,
			creator: {
				connect: {
					id: creatorId, // UserのIDを指定
				},
			},
		},
	});

	return NextResponse.json(recruit);
};
