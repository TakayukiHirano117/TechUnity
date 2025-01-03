import { z } from "zod";

export const createRecruitSchema = z.object({
	title: z
		.string()
		.min(1, { message: "タイトルは1文字以上で入力してください" })
		.max(100, { message: "タイトルは100文字以内で入力してください" }),
	content: z.string().min(1, { message: "本文は1文字以上で入力してください" }),
	isPublished: z.boolean(),
	// 募集人数も追加すること
});

export const editRecruitSchema = z.object({
	title: z
		.string()
		.min(1, { message: "タイトルは1文字以上で入力してください" })
		.max(100, { message: "タイトルは100文字以内で入力してください" }),
	content: z.string().min(1, { message: "本文は1文字以上で入力してください" }),
	isPublished: z.boolean(),
	// 募集人数も追加すること
});
