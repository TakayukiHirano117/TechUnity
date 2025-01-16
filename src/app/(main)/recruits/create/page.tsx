"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { createRecruitSchema } from "@/lib/formSchema";
import { createRecruit } from "@/lib/fetcher/recruit";

const CreateRecruitPage = () => {
  const router = useRouter();

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
            className="bg-slate-100 text-2xl focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
            {...register("title")}
          />
          <Tabs defaultValue="write" className="max-w-[960px] mt-4">
            <TabsList className="grid w-full grid-cols-2 border">
              <TabsTrigger value="write">募集を書く</TabsTrigger>
              <TabsTrigger value="preview">プレビュー</TabsTrigger>
            </TabsList>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="w-full md:w-4/5">
                <TabsContent
                  value="write"
                  className="min-h-[540px] md:min-h-[720px]"
                >
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
                </TabsContent>
                <TabsContent value="preview">
                  <MDEditor.Markdown
                    source={content}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeSanitize]}
                    className=" min-h-[540px] md:min-h-[720px] text-[20px] prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900 border p-6 rounded-lg max-w-full"
                  />
                </TabsContent>
                <div className="bg-slate-200 rounded-lg mt-2 py-2 md:hidden sticky bottom-12 left-0 w-full flex justify-center items-center gap-4">
                  <div className="">
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
                    <ImageUpload
                      folder="recruits"
                      onInsertImage={onInsertImage}
                    >
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
                      disabled={
                        isSubmitting
                      }
                    >
                      {isSubmitting ? "作成中..." : "作成する"}
                    </Button>
                  </div>
                </div>
              </div>
              {/* 768px以下の場合に非表示 */}
              <aside className="hidden md:block mt-2 z-10 md:w-1/5">
                <div className="bg-slate-300 border sticky top-[120px] flex flex-col gap-4 p-4 rounded-sm">
                  <div className="flex items-center space-x-2">
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
                    <ImageUpload
                      folder="recruits"
                      onInsertImage={onInsertImage}
                    >
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
                    disabled={isSubmitting || !content}
                  >
                    {isSubmitting ? "作成中..." : "作成する"}
                  </Button>
                </div>
              </aside>
            </div>
          </Tabs>
        </form>
      </div>
    </div>
  );
};

export default CreateRecruitPage;
