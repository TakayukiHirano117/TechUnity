"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import MainButton from "@/components/atoms/button/MainButton";
import ImageUpload from "@/components/molecules/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createRecruit } from "@/lib/fetcher/recruit";
import { createRecruitSchema } from "@/lib/schema/formSchema";

const CreateRecruitForm = () => {
  const router = useRouter();
  // プレビューかどうかの状態管理をするステート
  const [isPreview, setIsPreview] = useState(false);

  // フォームの状態管理をするステート
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof createRecruitSchema>>({
    resolver: zodResolver(createRecruitSchema),
    defaultValues: {
      title: "",
      content: "",
      isPublished: false,
      repositoryUrl: "",
    },
  });

  const title = watch("title");
  const content = watch("content");
  const repositoryUrl = watch("repositoryUrl");

  // 募集作成関数
  const onSubmit = async (data: {
    title: string;
    content: string;
    isPublished: boolean;
    repositoryUrl?: string;
  }) => {
    try {
      const res = await createRecruit(data);

      if (res) {
        toast.success("募集を作成しました", { icon: "🎉" });
        router.push("/dashboard/recruits");
        router.refresh();
      }
    } catch (error) {
      toast.error("エラーが発生しました", { icon: "❌" });
    }
  };
  const onError = () => {
    // バリデーションエラーを全て取得して表示
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message, { icon: "⚠️" });
      }
    });
  };

  // マークダウンエディター内のカーソル位置を保持するためのRef
  const cursorPositionRef = useRef<number>(0);

  // カーソルの位置に画像のパスを挿入する関数
  const insertTextToContent = (text: string) => {
    // 現在の content を取得
    const currentContent = watch("content");

    // カーソル位置を基準にして、カーソル位置前後の文字列を取得
    const before = currentContent.slice(0, cursorPositionRef.current);
    const after = currentContent.slice(cursorPositionRef.current);

    // 画像パス挿入後の新しいコンテンツを作成
    const newContent = `${before}${text}${after}`;

    setValue("content", newContent);
  };

  // マークダウンエディターのカーソル位置を取得する関数
  const handleCursorChange = (
    event:
      | React.MouseEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = event.target as HTMLTextAreaElement;
    cursorPositionRef.current = textarea.selectionStart;
  };

  // 画像をCloudinaryに保存し、パスをcontentに追加する関数
  const onInsertImage = (name: string, url: string) => {
    const imageLink = `\n![${name}](${url})\n`;
    insertTextToContent(imageLink);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} method="POST">
      {/* タイトル入力欄 */}
      <div className="flex flex-col gap-4">
        <Input
          placeholder="タイトル *"
          value={title}
          className="bg-slate-100 font-bold text-2xl focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
          {...register("title")}
        />
        <hr />
        <Input
          placeholder="プロジェクトのリポジトリURL"
          value={repositoryUrl}
          className="bg-slate-100 font-bold text-2xl focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
          {...register("repositoryUrl")}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-full md:w-4/5">
          {/* プレビューではないときにマークダウンエディターを表示 */}
          {!isPreview ? (
            <div className="min-h-[720px]">
              {/* マークダウンエディター */}
              <MDEditor
                value={content}
                onChange={(value) => setValue("content", value || "")}
                hideToolbar={true}
                preview="edit"
                height={720}
                className="p-4 border"
                textareaProps={{
                  onClick: handleCursorChange,
                  onKeyUp: handleCursorChange,
                  placeholder: "Markdownで募集を書いてください *",
                }}
                style={{ boxShadow: "none", borderRadius: "0.5rem" }}
                visibleDragbar={false}
              />
            </div>
          ) : (
            // プレビュー状態のときマークダウンプレビューを表示
            <div className="min-h-[720px] bg-white border p-6 rounded-lg">
              {/* マークダウンプレビュー */}
              <MDEditor.Markdown
                source={content}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeSanitize]}
                className="text-[20px] prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900"
              />
            </div>
          )}
          {/* モバイルサイズのときのサイドメニュー */}
          <div className="bg-slate-200 rounded-lg mt-2 py-2 md:hidden sticky bottom-12 left-0 w-full flex justify-center items-center gap-4">
            <div className="flex items-center space-x-2 bg-white p-2 rounded-full">
              {/* プレビュー・編集の切り替え */}
              <Switch
                checked={isPreview}
                onCheckedChange={setIsPreview}
                className="shadow-md"
              />
              <Label className="font-bold text-slate-700">
                {isPreview ? "プレビュー" : "編集"}
              </Label>
            </div>
            <div>
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2 bg-white p-2 rounded-full">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="shadow-md"
                    />
                    <Label className="font-bold text-slate-700">
                      {field.value ? "公開" : "非公開"}
                    </Label>
                  </div>
                )}
              />
            </div>
            <div>
              <ImageUpload folder="recruits" onInsertImage={onInsertImage}>
                {(open) => (
                  <MainButton
                    type="button"
                    className="rounded-full w-10 h-10 shadow-md"
                    onClick={() => open()}
                    variant={"outline"}
                  >
                    <ImageIcon />
                  </MainButton>
                )}
              </ImageUpload>
            </div>
            <div>
              <Button
                type="submit"
                variant={"outline"}
                className="rounded-full shadow-md"
                disabled={isSubmitting || !content || !title}
              >
                {isSubmitting ? "作成中..." : "作成する"}
              </Button>
            </div>
          </div>
        </div>
        {/* サイドメニュー */}
        <aside className="hidden md:block z-10 md:w-1/5">
          <div className="bg-slate-300 border sticky top-[120px] flex flex-col gap-4 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Switch checked={isPreview} onCheckedChange={setIsPreview} />
              <Label className="font-bold text-slate-700">
                {isPreview ? "プレビュー" : "編集"}
              </Label>
            </div>
            <div>
              {/* 公開・非公開の切り替え */}
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="font-bold text-slate-700">
                      {field.value ? "公開" : "非公開"}
                    </Label>
                  </div>
                )}
              />
            </div>
            <div>
              {/* 画像アップロードウィジェット */}
              <ImageUpload folder="recruits" onInsertImage={onInsertImage}>
                {(open) => (
                  <MainButton
                    type="button"
                    className="rounded-full font-bold flex gap-1"
                    onClick={() => open()}
                    variant={"outline"}
                  >
                    <ImageIcon size={24} />
                    <span>画像を挿入</span>
                  </MainButton>
                )}
              </ImageUpload>
            </div>
            {/* 作成ボタン */}
            <Button
              variant={"outline"}
              className="rounded-full"
              disabled={isSubmitting || !content || !title}
            >
              {isSubmitting ? "作成中..." : "作成する"}
            </Button>
          </div>
        </aside>
      </div>
    </form>
  );
};

export default CreateRecruitForm;
