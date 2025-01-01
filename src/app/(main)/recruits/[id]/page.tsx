"use client";

import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";

const getRecruitDetail = async (url: string) => {
	const response = await fetch(url, { cache: "no-store" });
	// if (!response.ok) throw new Error("データの取得に失敗しました");
	return response.json();
};

const RecruitDetailPage = () => {
	const params = useParams();
	const id = params.id;

	const {
		data: recruit,
		error,
		isLoading,
	} = useSWR(`/api/recruits/${id}`, getRecruitDetail);

	return (
		<div className="container bg-slate-100">
			<div className="container mx-auto">
				<div className="flex flex-col items-center py-[4rem] gap-4">
					<h1 className="text-4xl font-bold">{recruit?.title}</h1>
					<div className="flex gap-4 items-center">
						<p className="text-slate-600 text-sm">{recruit?.createdAt}</p>
					</div>
				</div>
			</div>
			<div className="flex justify-between gap-8 max-w-[1200px] mx-auto p-8">
				<div className="lg:w-4/5 w-full">
					<MDEditor.Markdown
						source={recruit?.content}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeSanitize]}
						className="text-[20px] prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900 border p-10 rounded-lg max-w-full"
					/>
				</div>
				<aside className="flex-1 lg:block hidden">
					<div className="flex flex-col gap-4 border rounded-lg max-w-full bg-white p-4 ">
						<div className="flex gap-4 items-center">
							<AvatarIcon
								ImageSrc={recruit?.creator.image}
								fallbackText={recruit?.creator.name}
								className="w-12 h-12"
							/>
							<div className="flex flex-col gap-1">
								<Link href={"/profiles/1"} className="hover:underline">
									<p className="font-bold hover:underline text-md">
										{recruit?.creator.name}
									</p>
								</Link>
								{/* ログインしているユーザーと同じ場合はどうする */}
								<MainButton
									className="rounded-full font-bold"
									variant={"outline"}
								>
									フォローする
								</MainButton>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
};

export default RecruitDetailPage;
