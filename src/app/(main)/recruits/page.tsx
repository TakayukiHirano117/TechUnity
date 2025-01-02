"use client";

import React from "react";
import useSWR from "swr";
import RecruitList from "@/components/organisms/recruits/RecruitList";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";

const getAllRecruits = async () => {
	const res = await fetch("/api/recruits");
	const recruits = await res.json();
	return recruits;
};

const AllRecruits = () => {
	const {
		data: recruits,
		error,
		isValidating,
	} = useSWR("/api/recruits", getAllRecruits);

	if (error) return <p>エラーが発生しました: {error.message}</p>;

	return (
		<div className="bg-slate-100">
			<div className="container max-w-[960px] mx-auto p-8 flex flex-col gap-8">
				<h1 className="text-3xl font-bold">Recruits</h1>
				{!recruits || isValidating ? (
					<div className="flex flex-col space-y-3 z-50 h-screen items-center">
						<LoadingIcon width="40" height="40" className="animate-spin text-slate-600" />
					</div>
				) : (
					<RecruitList recruits={recruits} />
				)}
			</div>
		</div>
	);
};

export default AllRecruits;
