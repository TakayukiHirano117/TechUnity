"use client";

import { DeleteIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";
import GearIcon from "@/components/atoms/Icon/GearIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";

const getRecruitsWithUser = async () => {
	const res = await fetch("/api/dashboard/recruits");
	const recruits = await res.json();
	return recruits;
};

const RecruitsCreatedByMe = () => {
	// const pathname = usePathname();

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
				<div className="flex flex-col gap-4 sticky top-[120px]">
					<Link
						href={"/dashboard/recruits"}
						className="flex gap-2 rounded-full hover:bg-slate-200 py-2 px-4 font-bold text-slate-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 2048 2048"
						>
							<path
								fill="currentColor"
								d="M2048 1280v768H1024v-768h256v-256h512v256h256zm-640 0h256v-128h-256v128zm512 384h-128v128h-128v-128h-256v128h-128v-128h-128v256h768v-256zm0-256h-768v128h768v-128zm-355-512q-54-61-128-94t-157-34q-80 0-149 30t-122 82t-83 123t-30 149q0 92-41 173t-116 136q45 23 84 53t73 68v338q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149H0q0-73 20-141t57-129t90-108t118-81q-74-54-115-135t-42-174q0-79 30-149t82-122t122-83t150-30q92 0 173 41t136 116q38-75 97-134t135-98q-74-54-115-135t-42-174q0-79 30-149t82-122t122-83t150-30q79 0 149 30t122 82t83 123t30 149q0 92-41 173t-116 136q68 34 123 85t93 118h-158zM512 1408q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20zm512-1024q0 53 20 99t55 82t81 55t100 20q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100z"
							/>
						</svg>
						募集の管理
					</Link>
					<Link
						href={"/dashboard/recruits"}
						className="flex gap-2 rounded-full hover:bg-slate-200 py-2 px-4 font-bold text-slate-600"
					>
						<HeartIcon width="20" height="20" className="hover:opacity-70" />
						いいねした募集
					</Link>
					<Link
						href={"/dashboard/recruits"}
						className="flex gap-2 rounded-full hover:bg-slate-200 py-2 px-4 font-bold text-slate-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="m11 20.1l8.2-8.2c.5-.5 1.1-.8 1.8-.8s1.3.3 1.8.8l.2.2V4c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8v-1.9M3 4h18v3H3V4m18 9.1c-.1 0-.3.1-.4.2l-1 1l2.1 2.1l1-1c.2-.2.2-.6 0-.8l-1.3-1.3c-.1-.1-.2-.2-.4-.2m-1.9 1.8l-6.1 6V23h2.1l6.1-6.1l-2.1-2Z"
							/>
						</svg>
						応募した募集
					</Link>
					<Link
						href={"/dashboard/recruits"}
						className="flex gap-2 rounded-full hover:bg-slate-200 py-2 px-4 font-bold text-slate-600"
					>
						<GearIcon width="20" height="20" className="hover:opacity-70" />
						アカウント設定
					</Link>
				</div>
				<div className="flex flex-col gap-4 w-9/12">
					<h1 className="font-bold text-3xl">募集の管理</h1>
					<div className="flex flex-col gap-4">
						{recruits.map((recruit) => (
							<div
								key={recruit.id}
								className="flex items-center justify-between gap-4"
							>
								<div className="border-t w-full p-2 flex items-center justify-between gap-2">
									<div>
										<h3 className="text-lg font-bold">{recruit.title}</h3>
										<span className="text-sm text-slate-600">
											{recruit.isPublished ? "公開中" : "非公開"}
										</span>
									</div>
									<div className="flex gap-4 items-center">
										<Link href={"/"}>
											<div className="p-2 rounded-full hover:bg-slate-200 border">
												<PencilIcon
													width="30"
													height="30"
													className="hover:opacity-70 text-slate-600"
												/>
											</div>
										</Link>
										<Link href={"/"}>
											<div className="p-2 rounded-full hover:bg-slate-200 border">
												<DeleteIcon
													width="30"
													height="30"
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
