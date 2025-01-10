"use client";

import Image from "next/image";
import React from "react";
import useSWR from "swr";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import ImageUpload from "@/components/molecules/ImageUpload";
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SidebarItems } from "@/config/dashboard/SidebarItems";

const items = SidebarItems;

// ユーザー情報フェッチする。

const getProfile = async () => {
	const res = await fetch("/api/dashboard/profiles");
	const profile = await res.json();
	return profile;
};

const ProfileSettingsPage = () => {
	const {
		data: profile,
		error,
		isLoading,
	} = useSWR("/api/dashboard/profiles", getProfile);

	const onInsertImage = (name: string, url: string) => {
		// const content = watch("content");
		const imageLink = `![${name}](${url})`;
		// setValue("content", content + imageLink);
	};

	return (
		<div className="bg-slate-100 min-h-screen">
			<div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
				{!profile || isLoading ? (
					<div className="mx-auto space-y-3 h-screen">
						<LoadingIcon
							width="40"
							height="40"
							className="animate-spin text-slate-600"
						/>
					</div>
				) : (
					<>
						<DashBoardSideBar items={items} />
						<div className="flex flex-col gap-4 w-9/12">
							<h1 className="font-bold text-3xl">プロフィール</h1>
							<div className="flex gap-8 mt-4">
								<ImageUpload folder="recruits" onInsertImage={onInsertImage}>
									{(open) => (
										<button
											type="button"
											className="flex flex-col items-center gap-1"
											onClick={() => open()}
										>
											<AvatarIcon
												className="w-20 h-20"
												ImageSrc={profile.image}
												fallbackText={profile.name}
											/>
											<span className="text-sm text-slate-600">変更する</span>
										</button>
									)}
								</ImageUpload>
								{/* <button
									type="button"
									className="flex flex-col items-center gap-1"
								>
									<AvatarIcon
										className="w-20 h-20"
										ImageSrc={profile.image}
										fallbackText={profile.name}
									/>
									<span className="text-sm text-slate-600">変更する</span>
								</button> */}
								<div className="w-full flex flex-col gap-8">
									<div className="flex flex-col gap-2">
										<Label htmlFor="name" className="text-slate-600 font-bold">
											名前
										</Label>
										<Input name="name" placeholder="ユーザー名" />
									</div>
									<div className="flex flex-col gap-2">
										<Label htmlFor="" className="text-slate-600 font-bold">
											自己紹介
										</Label>
										<Textarea
											placeholder="自己紹介文"
											className="resize-none"
										/>
									</div>
									<div className="flex justify-center">
										<MainButton className="font-bold rounded-full">
											更新する
										</MainButton>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProfileSettingsPage;
