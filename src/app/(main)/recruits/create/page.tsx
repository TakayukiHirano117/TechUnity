"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { toast } from "@/hooks/use-toast";
import { createRecruit } from "@/lib/fetcher/recruit";
import { createRecruitSchema } from "@/lib/formSchema";

const CreateRecruitPage = () => {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false); // Switchでプレビュー状態を管理

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
    },
  });

  const title = watch("title");
  const content = watch("content");

  const onSubmit = async (data: {
    title: string;
    content: string;
    isPublished: boolean;
  }) => {
    createRecruit(data);

    router.push("/dashboard/recruits");
  };

  const onInsertImage = (name: string, url: string) => {
    const content = watch("content");
    const imageLink = `![${name}](${url})\n`;
    setValue("content", content + imageLink);
  };

  return (
    <div className="bg-slate-100 w-full">
      <div className="max-w-[960px] mx-auto p-8 container">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <Input
            placeholder="タイトル"
            value={title}
            className="bg-slate-100 font-bold text-2xl focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
            {...register("title")}
          />
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="w-full md:w-4/5">
              {/* Switchでプレビューとエディタを切り替え */}
              {!isPreview ? (
                <div className="min-h-[720px]">
                  <MDEditor
                    value={content}
                    onChange={(value) => setValue("content", value || "")}
                    hideToolbar={true}
                    preview="edit"
                    height={720}
                    className="p-4 border"
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
              <div className="bg-slate-200 rounded-lg mt-2 py-2 md:hidden sticky bottom-12 left-0 w-full flex justify-center items-center gap-4">
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
                    variant={"outline"}
                    className="rounded-full shadow-md"
                    disabled={isSubmitting || !content || !title}
                    onClick={() => {
                      if (errors.title || errors.content) {
                        // バリデーションエラーがある場合、toastを表示
                        Object.values(errors).forEach((error) => {
                          toast({
                            title: "エラー",
                            description:
                              error.message || "エラーが発生しました。",
                            variant: "destructive",
                            duration: 3000,
                          });
                        });

                        return;
                      }
                    }}
                  >
                    {isSubmitting ? "作成中..." : "作成する"}
                  </Button>
                </div>
              </div>
            </div>
            <aside className="hidden md:block z-10 md:w-1/5">
              <div className="bg-slate-300 border sticky top-[120px] flex flex-col gap-4 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isPreview}
                    onCheckedChange={setIsPreview} // プレビュー切り替え
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
                  <ImageUpload folder="recruits" onInsertImage={onInsertImage}>
                    {(open) => (
                      <MainButton
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
                <Button
                  variant={"outline"}
                  className="rounded-full"
                  disabled={isSubmitting || !content || !title}
                  onClick={() => {
                    if (errors.title || errors.content) {
                      // バリデーションエラーがある場合、toastを表示
                      Object.values(errors).forEach((error) => {
                        toast({
                          title: "エラー",
                          description:
                            error.message || "エラーが発生しました。",
                          variant: "destructive",
                          duration: 3000,
                        });
                      });

                      return;
                    }
                  }}
                >
                  {isSubmitting ? "作成中..." : "作成する"}
                </Button>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecruitPage;
