import React from "react";
import { Controller } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const PostRecruitAside = () => {
	return (
		<aside className="bg-slate-300 border sticky top-[120px] flex flex-col gap-4 p-4 rounded-sm">
			<div className="flex items-center space-x-2">
				<Controller
					name="isPublished"
					control={control}
					render={({ field }) => (
						<div className="flex items-center space-x-2">
							<Switch checked={field.value} onCheckedChange={field.onChange} />
							<Label className="font-bold text-slate-700">
								{field.value ? "公開" : "非公開"}
							</Label>
						</div>
					)}
				/>
			</div>
			<div>
				<Button
					className="rounded-full w-auto"
					variant={"outline"}
					onClick={handleButtonClick}
					type="button"
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
			<Button
				variant={"outline"}
				className="rounded-full"
				onClick={() => {
					if (formState.errors.title || formState.errors.content) {
						// バリデーションエラーがある場合、toastを表示
						Object.values(formState.errors).forEach((error) => {
							toast({
								title: "エラー",
								description: error.message || "エラーが発生しました。",
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
	);
};

export default PostRecruitAside;
