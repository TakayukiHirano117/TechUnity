"use client";

import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";

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
		<div className=" bg-slate-100 mx-auto">
			{!recruit || isLoading ? (
				<div className="flex justify-between">
					<div className="mx-auto space-y-3 h-screen">
						<LoadingIcon
							width="40"
							height="40"
							className="animate-spin text-slate-600"
						/>
					</div>
				</div>
			) : (
				<>
					<div className="container mx-auto">
						<div className="flex flex-col items-center py-[4rem] gap-4">
							<h1 className="text-4xl font-bold">{recruit?.title}</h1>
							<div className="flex gap-4 items-center">
								<p className="text-slate-600 text-sm">
									{format(recruit?.createdAt, "yyyy/MM/dd")}
								</p>
							</div>
						</div>
					</div>
					<div className="flex justify-between gap-8 max-w-[1200px] mx-auto p-8">
						<div className="lg:w-4/5 w-full">
							<MDEditor.Markdown
								source={recruit?.content}
								remarkPlugins={[remarkGfm]}
								rehypePlugins={[rehypeSanitize]}
								className="text-[20px] prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900 border p-10 rounded-t-lg max-w-full"
							/>
							<div className="rounded-b-lg bg-white border p-8 w-full flex ietms-center justify-between">
								<div className="flex items-center gap-4">
									<AvatarIcon
										ImageSrc={recruit?.creator.image}
										fallbackText={recruit?.creator.name}
										className="w-12 h-12"
									/>
									<h4 className="font-bold text-lg">{recruit?.creator.name}</h4>
								</div>
								<div>
									<span className=" bg-slate-200 hover:bg-red-300 inline-flex rounded-full p-2 cursor-pointer">
										<HeartIcon
											width="24"
											height="24"
											className="text-slate-600"
										/>
									</span>
								</div>
								{/* <hr className="my-8" /> */}
							</div>
							{/* <ReactMarkdown
								remarkPlugins={[remarkGfm]}
								rehypePlugins={[rehypeSanitize]}
								className="bg-white text-md prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900 border p-10 rounded-lg max-w-full"
							>
								{recruit?.content}
								{/* <div>ffff</div>
							</ReactMarkdown> */}
						</div>
						<aside className="flex-1 lg:block hidden">
							<div className="flex flex-col gap-4 border rounded-lg max-w-full bg-white p-4">
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
									</div>
								</div>
							</div>
						</aside>
					</div>
				</>
			)}
		</div>
	);
};

export default RecruitDetailPage;
