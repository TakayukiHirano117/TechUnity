"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Create = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const formSchema = z.object({
		title: z
			.string()
			.min(1, { message: "タイトルは1文字以上で入力してください" })
			.max(100, { message: "タイトルは100文字以内で入力してください" }),
		content: z
			.string()
			.min(1, { message: "本文は1文字以上で入力してください" }),
	});

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		// formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	});

	const content = watch("content");

	const onSubmit = (data: { title: string; content: string }) => {
		console.log(data);
	};

	const handleButtonClick = () => {
		// Inputのclickメソッドを呼び出す
		inputRef.current?.click();
	};

	return (
		<div className="max-w-[960px] mx-auto p-4 container">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					placeholder="タイトル"
					className="p-2 md:text-3xl outline-none rounded-none border-none focus:ring-0 focus:outline-none hover:border-none focus:border-none focus-visible:ring-0 shadow-none"
					{...register("title")}
				/>
				<Tabs defaultValue="write" className="w-[960px] mt-4">
					<TabsList className="grid w-full grid-cols-2">
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
									className="p-4 rounded-lg"
									textareaProps={{
										placeholder: "Markdownで募集を書いてください",
									}}
								/>
							</TabsContent>
							<TabsContent value="preview">
								<MDEditor.Markdown
									source={content}
									remarkPlugins={[remarkGfm]}
									rehypePlugins={[rehypeSanitize]}
									className="h-[720px] prose prose-li:marker:list-disc prose-ol:marker:list-decimal border p-4 rounded-sm shadow-sm"
								/>
							</TabsContent>
						</div>
						<div className="mt-2 z-10 w-1/5">
							<div className="bg-slate-300 sticky top-0 flex flex-col gap-4 p-4 rounded-sm">
								<div className="flex items-center space-x-2">
									<Switch id="airplane-mode" />
									<Label htmlFor="airplane-mode">公開</Label>
								</div>
								<Button variant={"outline"} className="rounded-full">
									保存する
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
									<Input className="hidden" type="file" ref={inputRef} />
								</div>
							</div>
						</div>
					</div>
				</Tabs>
			</form>
		</div>
	);
};

export default Create;
