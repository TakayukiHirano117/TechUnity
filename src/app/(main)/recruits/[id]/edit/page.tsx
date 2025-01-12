"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { ImageIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import { z } from "zod";

import MainButton from "@/components/atoms/button/MainButton";
import ImageUpload from "@/components/molecules/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { editRecruitSchema } from "@/lib/formSchema";

const getRecruitDetail = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" });
  return response.json();
};

const EditRecruitPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const { register, handleSubmit, setValue, watch, control, formState, reset } =
    useForm<z.infer<typeof editRecruitSchema>>({
      resolver: zodResolver(editRecruitSchema),
      defaultValues: {
        title: "",
        content: "",
        isPublished: false,
      },
    });

  const {
    data: recruit,
    error,
    isLoading,
  } = useSWR(`/api/recruits/${id}/edit`, getRecruitDetail, {
    onSuccess: (data) => {
      // データ取得成功後にフォームの初期値を設定
      // 画像をアップロードしようとすると、MDEditorへ入れた値が初期値に戻ってしまう。
      // 直前に何か入力していたとしても、編集を行う前の初期値に戻る。
      reset({
        title: data.title,
        content: data.content,
        isPublished: data.isPublished,
      });
    },
  });

  const content = watch("content");

  const onSubmit = async (data: {
    title: string;
    content: string;
    isPublished: boolean;
  }) => {
    await fetch(`/api/recruits/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    router.push("/dashboard/recruits");
  };

  const onInsertImage = (name: string, url: string) => {
    const content = watch("content");
    const imageLink = `![${name}](${url})`;
    setValue("content", content + imageLink);
    // console.log("inserted") このconsole.logは呼ばれており、エラーも出ていない。
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-slate-100">
      <div className="max-w-[960px] mx-auto p-8 container">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <Input
            placeholder="タイトル"
            className="bg-slate-100 focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
            {...register("title")}
          />
          <Tabs defaultValue="write" className="w-[960px] mt-4">
            <TabsList className="grid w-full grid-cols-2 border">
              <TabsTrigger value="write">募集を書く</TabsTrigger>
              <TabsTrigger value="preview">プレビュー</TabsTrigger>
            </TabsList>
            <div className="flex gap-4 mt-4">
              <div className="w-4/5">
                <TabsContent value="write">
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
                </TabsContent>
                <TabsContent value="preview">
                  <MDEditor.Markdown
                    source={content}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeSanitize]}
                    className="min-h-[720px] text-[20px] prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900 border p-4 rounded-lg max-w-full"
                  />
                </TabsContent>
              </div>
              <div className="mt-2 z-10 w-1/5">
                <aside className="bg-slate-300 border sticky top-[120px] flex flex-col gap-4 p-4 rounded-sm">
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
                  {/* 画像をアップロードさせるウィジェット */}
                  <ImageUpload folder="recruits" onInsertImage={onInsertImage}>
                    {(open) => (
                      <MainButton
                        className="rounded-full font-bold flex gap-1"
                        // 画像を挿入ボタンをクリックしたときに画像アップロードウィジェットを開く
                        // もともとイベントは受け取っていなかったが、今回の挙動を調べるためe.preventDefault()を追加してみたが特に効果なし。
                        // やはりreact-hook-formやresetの挙動の問題だと思われる。
                        onClick={(e) => {
                          e.preventDefault();
                          open()
                        }}
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
                    onClick={() => {
                      if (formState.errors.title || formState.errors.content) {
                        Object.values(formState.errors).forEach((error) => {
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
                    disabled={formState.isSubmitting || !content}
                  >
                    {formState.isSubmitting ? "更新中..." : "保存する"}
                  </Button>
                </aside>
              </div>
            </div>
          </Tabs>
        </form>
      </div>
    </div>
  );
};

export default EditRecruitPage;
