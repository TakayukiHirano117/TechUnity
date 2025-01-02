"use client";

import React from "react";
import useSWR from "swr";
import RecruitList from "@/components/organisms/recruits/RecruitList";
import { Skeleton } from "@/components/ui/skeleton";

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

	if (isLoading) return <Skeleton className="w-full h-full rounded-full" />;

	if (error) return <p>エラーが発生しました: {error.message}</p>;

	return (
		<div className="bg-slate-100">
			<div className="container max-w-[960px] mx-auto p-8 flex flex-col gap-8">
				<h1 className="text-3xl font-bold">Recruits</h1>
				<RecruitList recruits={recruits} />
			</div>
		</div>
	);
};

export default AllRecruits;
