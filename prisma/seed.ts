// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
	// 既存のユーザーを取得または新規作成
	let user = await prisma.user.findFirst();
	if (!user) {
		user = await prisma.user.create({
			data: {
				name: "Dummy User",
				email: "dummy@example.com",
				image: "https://via.placeholder.com/150",
			},
		});
	}

	// recruits テーブルにダミーデータを挿入
	const recruits = Array.from({ length: 10 }).map((_, i) => ({
		title: `Recruit Title ${i + 1}`,
		content: `This is a description of recruit ${i + 1}.`,
		isPublished: i % 2 === 0, // 偶数番目のデータを公開済みに設定
		creatorId: user.id,
	}));

	await prisma.recruits.createMany({ data: recruits });

	console.log("Inserted 10 dummy recruits!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
