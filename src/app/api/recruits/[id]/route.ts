import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } },
) => {
	try {
		const token = await getToken({ req });

		if (!token) {
			return NextResponse.json("unauthorized", { status: 403 });
		}

		const id = params.id;

		const recruit = await prisma.recruits.findUnique({
			where: { id: id },
			include: { creator: true },
		});

		console.log(recruit);

		return NextResponse.json(recruit);
	} catch (error) {
		return NextResponse.json("error", { status: 500 });
	}
};

export const PUT = async (
	req: NextRequest,
	{ params }: { params: { id: string } },
) => {
	try {
		const token = await getToken({ req });

		if (!token) {
			return NextResponse.json("unauthorized", { status: 403 });
		}

		const id = params.id;

		const { title, content, isPublished } = await req.json();

		const updatedAt = new Date();

		const recruit = await prisma.recruits.update({
			where: { id: id },
			data: {
				title,
				content,
				isPublished,
				updatedAt,
			},
		});

		return NextResponse.json(recruit);
	} catch (error) {
		return NextResponse.json("error", { status: 500 });
	}
};
