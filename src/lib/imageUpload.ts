import { UseFormSetValue } from "react-hook-form";
import { supabase } from "./supabase";

export const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  content: string,
  setValue: UseFormSetValue<{
    content: string;
    title: string;
    isPublished: boolean;
  }>,
) => {
  if (!e.target.files || e.target.files.length === 0) return;

  const file = e.target.files[0];

  // ファイル名の重複を防ぐために、タイムスタンプを追加
  const fileExtension = file.name.split(".").pop(); // 拡張子を抽出
  const fileNameWithoutExtension = file.name.replace(`.${fileExtension}`, "");
  const timestamp = Date.now(); // 現在のタイムスタンプ
  const uniqueFileName = `${fileNameWithoutExtension}-${timestamp}.${fileExtension}`;

  // Supabaseにファイルをアップロード
  const { data, error } = await supabase.storage
    .from("test") // ストレージバケット名
    .upload(`images/${uniqueFileName}`, file);

  if (error) {
    console.error("アップロードエラー:", error.message);
    return;
  }

  // ファイルのURLを取得
  const { data: publicUrlData } = supabase.storage
    .from("test")
    .getPublicUrl(data.path);

  if (publicUrlData?.publicUrl) {
    // 現在のcontentの内容を取得して、markdownLinkを追加
    const markdownLink = `![${file.name}](${publicUrlData.publicUrl})\n`;
    setValue("content", content + markdownLink); // 既存の内容に追加
  }
};
