"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { updateRecruit } from "@/lib/fetcher/recruit";
import { editRecruitSchema } from "@/lib/formSchema";
import MainButton from "../atoms/button/MainButton";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import ImageUpload from "./ImageUpload";

const EditRecruit = memo(
  ({
    recruit,
  }: {
    recruit: {
      id: string;
      title: string;
      content: string;
      isPublished: boolean;
      repositoryUrl?: string;
    };
  }) => {
    const [isPreview, setIsPreview] = useState(false);
    const router = useRouter();
    const isInitialResetDone = useRef(false);

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      control,
      formState: { isSubmitting, errors },
      reset,
    } = useForm<z.infer<typeof editRecruitSchema>>({
      resolver: zodResolver(editRecruitSchema),
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

    useEffect(() => {
      if (!isInitialResetDone.current) {
        reset({
          title: recruit.title,
          content: recruit.content,
          isPublished: recruit.isPublished,
          repositoryUrl: recruit.repositoryUrl,
        });
        isInitialResetDone.current = true;
      }
    }, [recruit, reset]);

    const onSubmit = async (data: {
      title: string;
      content: string;
      isPublished: boolean;
      repositoryUrl?: string;
    }) => {
      try {
        updateRecruit(recruit.id as string, data);
        toast.success("更新しました");
      } catch (error) {
        toast.error("更新に失敗しました");
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

    const onInsertImage = useCallback(
      (name: string, url: string) => {
        const currentContent = watch("content");
        const imageLink = `\n![${name}](${url})\n`;
        setValue("content", currentContent + imageLink, { shouldDirty: true });
      },
      [setValue, watch],
    );

    return (
      <form onSubmit={handleSubmit(onSubmit, onError)} method="POST">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="タイトル"
            className="bg-slate-100 font-bold text-2xl focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
            {...register("title")}
            value={title}
          />
          <hr />
          <Input
            placeholder="プロジェクトのリポジトリURL(任意)"
            className="bg-slate-100 font-bold text-2xl focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
            {...register("repositoryUrl")}
            value={repositoryUrl}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-full md:w-4/5">
            {!isPreview ? (
              <div className="min-h-[720px]">
                <MDEditor
                  value={content}
                  onChange={(value) => setValue("content", value || "")}
                  hideToolbar={true}
                  preview="edit"
                  height={720}
                  className="p-2 border"
                  textareaProps={{
                    placeholder: "Markdownで募集を書いてください",
                  }}
                  style={{ boxShadow: "none", borderRadius: "0.5rem" }}
                  visibleDragbar={false}
                />
              </div>
            ) : (
              <div className="min-h-[720px] bg-white border p-6 rounded-lg">
                <MDEditor.Markdown
                  source={content}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  rehypePlugins={[rehypeSanitize]}
                  className="text-[20px] prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900"
                />
              </div>
            )}
            <div className="bg-slate-200 rounded-lg mt-2 py-2 md:hidden sticky bottom-10 left-0 w-full flex justify-center items-center gap-4">
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full">
                <Switch
                  checked={isPreview}
                  onCheckedChange={setIsPreview}
                  className="shadow-md"
                />
                <Label className="font-bold text-slate-700">
                  {isPreview ? "プレビュー" : "編集"}
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-white p-2 rounded-full">
                <Controller
                  name="isPublished"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="shadow-md"
                      />
                      <Label className="font-bold text-slate-700">
                        {field.value ? "公開" : "非公開"}
                      </Label>
                    </>
                  )}
                />
              </div>
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
              <Button
                variant={"outline"}
                className="rounded-full shadow-md"
                disabled={isSubmitting || !content}
              >
                {isSubmitting ? "更新中..." : "更新する"}
              </Button>
            </div>
          </div>
          <aside className="hidden md:block z-10 md:w-1/5">
            <div className="bg-slate-300 border sticky top-[120px] flex flex-col gap-4 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Switch checked={isPreview} onCheckedChange={setIsPreview} />
                <Label className="font-bold text-slate-700">
                  {isPreview ? "プレビュー" : "編集"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name="isPublished"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label className="font-bold text-slate-700">
                        {field.value ? "公開" : "非公開"}
                      </Label>
                    </>
                  )}
                />
              </div>
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
              <Button
                variant={"outline"}
                className="rounded-full"
                disabled={isSubmitting || !content}
                // onClick={() => {
                //   if (errors.title || errors.content) {
                //     // バリデーションエラーがある場合、toastを表示
                //     Object.values(errors).forEach((error) => {
                //       toast({
                //         title: "エラー",
                //         description: error.message || "エラーが発生しました。",
                //         variant: "destructive",
                //         duration: 3000,
                //       });
                //     });

                //     return;
                //   }
                // }}
              >
                {isSubmitting ? "更新中..." : "更新する"}
              </Button>
            </div>
          </aside>
        </div>
      </form>
    );
  },
);

EditRecruit.displayName = "EditRecruit";

export default EditRecruit;
