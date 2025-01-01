"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";

const Create = () => {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const formSchema = z.object({
		title: z
			.string()
			.min(1, { message: "タイトルは1文字以上で入力してください" })
			.max(100, { message: "タイトルは100文字以内で入力してください" }),
		content: z
			.string()
			.min(1, { message: "本文は1文字以上で入力してください" }),
		isPublished: z.boolean(),
	});

	const { register, handleSubmit, setValue, watch, control, formState } =
		useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
			defaultValues: {
				title: "",
				content: "",
				isPublished: false,
			},
		});

	const content = watch("content");

	const onSubmit = async (data: {
		title: string;
		content: string;
		isPublished: boolean;
	}) => {
		const res = await fetch("/api/recruits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		// 募集管理ページに飛ばすように修正する。
		router.push("/recruits");
	};

	const handleButtonClick = () => {
		// Inputのclickメソッドを呼び出す
		inputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
			const currentContent = watch("content");
			const markdownLink = `![${file.name}](${publicUrlData.publicUrl})\n`;
			setValue("content", currentContent + markdownLink); // 既存の内容に追加
		}
	};

	return (
		<div className="bg-slate-100">
			<div className="max-w-[960px] mx-auto p-4 container">
				<form onSubmit={handleSubmit(onSubmit)} method="POST">
					<Input
						placeholder="タイトル"
						className="bg-slate-100 focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
						{...register("title")}
					/>
					{/* <Input
						type="number"
						placeholder="募集人数"
						className="bg-slate-100 focus-visible:ring-offset-0 p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
					/> */}
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
										remarkPlugins={[remarkGfm]}
										rehypePlugins={[rehypeSanitize]}
										className="min-h-[720px] text-[20px] prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900 border p-4 rounded-lg max-w-full"
									/>
								</TabsContent>
							</div>
							<div className="mt-2 z-10 w-1/5">
								<div className="bg-slate-300 sticky top-[120px] flex flex-col gap-4 p-4 rounded-sm">
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
									<Button
										variant={"outline"}
										className="rounded-full"
										// disabled={!content || content.trim() === ""}
										disabled={formState.isSubmitting || !content}
									>
										{formState.isSubmitting ? "作成中..." : "作成する"}
									</Button>
									<div>
										<Button
											className="rounded-full w-auto"
											variant={"outline"}
											onClick={handleButtonClick}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 256 256"
											>
												<path
													fill="currentColor"
													d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20l-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52l80 80H40Zm176 28h-21.37l-36-36l20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z"
												/>
											</svg>
										</Button>
										<Input
											className="hidden"
											type="file"
											ref={inputRef}
											onChange={handleFileChange}
										/>
									</div>
								</div>
							</div>
						</div>
					</Tabs>
				</form>
			</div>
		</div>
	);
};

export default Create;
