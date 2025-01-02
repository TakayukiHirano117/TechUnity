"use client";

import { DeleteIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import { Badge } from "@/components/ui/badge";
import { SidebarItems } from "@/lib/dashboard/SidebarItems";

const items = SidebarItems;

const getRecruitsWithUser = async () => {
	const res = await fetch("/api/dashboard/recruits");
	const recruits = await res.json();
	return recruits;
};

const RecruitsCreatedByMe = () => {
	const {
		data: recruits,
		error,
		isLoading,
	} = useSWR("/api/dashboard/recruits", getRecruitsWithUser);

	if (isLoading) return <p>loading...</p>;

	if (error) return <p>エラーが発生しました: {error.message}</p>;

	return (
		<div className="bg-slate-100">
			<div className="px-8 py-12 flex justify-between container mx-auto gap-12 max-w-[1080px]">
				<DashBoardSideBar items={items} />
				<div className="flex flex-col gap-4 w-9/12">
					<h1 className="font-bold text-3xl">募集の管理</h1>
					<div className="flex flex-col gap-4">
						{/* コンポーネントに分ける */}
						{recruits.map((recruit) => (
							<div
								key={recruit.id}
								className="flex items-center justify-between gap-4"
							>
								<div className="border-t w-full p-2 flex items-center justify-between gap-2">
									<div>
										<h3 className="text-lg font-bold">{recruit.title}</h3>
										<span className="text-sm text-slate-600">
											{recruit.isPublished ? (
												<Badge>公開中</Badge>
											) : (
												<Badge variant="outline">非公開</Badge>
											)}
										</span>
									</div>
									<div className="flex gap-4 items-center">
										<Link href={"/"}>
											<div className="p-2 rounded-full hover:bg-slate-200 border">
												<PencilIcon
													width="20"
													height="20"
													className="hover:opacity-70 text-slate-600"
												/>
											</div>
										</Link>
										<Link href={"/"}>
											<div className="p-2 rounded-full hover:bg-slate-200 border">
												<DeleteIcon
													width="20"
													height="20"
													className="hover:opacity-70 text-slate-600"
												/>
											</div>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecruitsCreatedByMe;
