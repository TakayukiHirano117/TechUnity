"use client";

import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import { Recruit } from "@prisma/client";

const getUserProfile = async (url: string) => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("Failed to fetch user profile");
	}

	const data = await response.json();
	return data;
};

type UserProfile = {
	image?: string;
	name?: string;
	description?: string;
	recruits_creator: Recruit[];
};

const ProfilePage = ({ params }: { params: { id: string } }) => {
	const id = params.id;
	
	const {
		data: profile,
		error,
		isLoading,
	} = useSWR<UserProfile>(`/api/profiles/${id}`, getUserProfile);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading profile: {error.message}</div>;
	}

	return (
		<div className="bg-slate-100 min-h-screen py-4">
			<div className="container mx-auto max-w-[960px] p-8">
				{/* ユーザー情報 */}
				<div className="flex items-center gap-8">
					<AvatarIcon
						ImageSrc={profile?.image || ""}
						fallbackText={profile?.name || "No Name"}
						className="w-20 h-20"
					/>
					<div>
						<h1 className="text-2xl font-bold text-slate-900">
							{profile?.name || "Anonymous User"}
						</h1>
						<div>{profile?.description}</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto max-w-[960px]">
				<h2 className="text-2xl font-semibold text-slate-700">Recruits</h2>
				<div className="grid grid-cols-3 gap-8">
					{profile?.recruits_creator.map((recruit) => (
						<div key={recruit.id}>{recruit.title}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
