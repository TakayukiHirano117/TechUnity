import { z } from "zod";

// 正しいURL形式かどうかを判定する関数
/**
 * 
 * @param url 判定対象のURL
 * @returns URLが正しい形式かどうかの真偽値
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// 募集の作成時のバリデーションスキーマ
/**
 * 
 */
export const createRecruitSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルは1文字以上で入力してください" })
    .max(100, { message: "タイトルは100文字以内で入力してください" }),
  content: z.string().min(1, { message: "本文は1文字以上で入力してください" }),
  isPublished: z.boolean(),
  repositoryUrl: z
    .string()
    .optional()
    .refine((url) => !url || isValidUrl(url), {
      message: "有効なURLを入力してください",
    }),
});

// 募集の編集時のバリデーションスキーマ
export const editRecruitSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルは1文字以上で入力してください" })
    .max(100, { message: "タイトルは100文字以内で入力してください" }),
  content: z.string().min(1, { message: "本文は1文字以上で入力してください" }),
  isPublished: z.boolean(),
  repositoryUrl: z
    .string()
    .optional()
    .refine((url) => !url || isValidUrl(url), {
      message: "有効なURLを入力してください",
    }),
});

// プロフィールの編集時のバリデーションスキーマ
export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "名前は必須です")
    .max(50, "名前は50文字以内で入力してください"),
  githubUrl: z
    .string()
    .optional()
    .refine(
      (url) =>
        !url || (url.startsWith("https://github.com/") && isValidUrl(url)),
      {
        message:
          "GitHubのURLはhttps://github.com/から始まる有効なURLを入力してください",
      },
    ),
  description: z
    .string()
    .max(200, "自己紹介文は200文字以内で入力してください")
    .optional(),
  image: z.string().url("有効な画像URLを入力してください").optional(),
});

// ログインフォームのバリデーションスキーマ
export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// 新規登録フォームのバリデーションスキーマ
export const signUpFormSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8),
});
