import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/db";

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } },
) => {
	try {
		const id = params.id;

		const recruit = await prisma.recruit.findUnique({
			where: { id: id },
			include: {
				creator: true,
				likes: true,
			},
		});

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

		const recruit = await prisma.recruit.update({
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

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: string } },
) => {
	try {
		const token = await getToken({ req });

		if (!token) {
			return NextResponse.json("unauthorized", { status: 403 });
		}

		const id = params.id;

		await prisma.recruit.delete({
			where: { id: id },
		});

		return NextResponse.json("success");
	} catch (error) {
		return NextResponse.json("error", { status: 500 });
	}
};
