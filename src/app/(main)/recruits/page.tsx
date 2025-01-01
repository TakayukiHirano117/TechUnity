"use client";

import React from "react";
import useSWR from "swr";
import RecruitCard from "@/components/molecules/card/RecruitCard";

const getAllRecruits = async () => {
	const res = await fetch("/api/recruits");
	const recruits = await res.json();
	return recruits;
};

const AllRecruits = () => {
	const {
		data: recruits,
		error,
		isLoading,
	} = useSWR("/api/recruits", getAllRecruits);

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>エラーが発生しました: {error.message}</p>;

	return (
		<div className="bg-slate-100">
			<div className="container max-w-[960px] mx-auto p-8 flex flex-col gap-8">
				<h1 className="text-3xl font-bold">Recruits</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					{recruits.map((recruit) => (
						<RecruitCard
							key={recruit.id}
							title={recruit.title}
							description={recruit.content}
							authorName={recruit.creator.name}
							avatarImageSrc={recruit.creator.image}
							publishedAt={recruit.createdAt}
							goodCount={recruit.goodCount}
							remainingCount={recruit.remainingCount}
						/>
					))}
					{/* <RecruitCard
						title="ReactでSNSアプリを作りたい!"
						description="
								ReactでSNSアプリを作成したいです。具体的には、Reactで状態管理しつつwebsocketを活用してリアルタイム通信を行うことを想定しています。そして、、、、、、"
						authorName="shadcn"
						publishedAt="1日前"
						goodCount={5}
						remainingCount={3}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default AllRecruits;
