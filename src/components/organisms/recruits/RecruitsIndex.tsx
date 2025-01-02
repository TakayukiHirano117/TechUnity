"use client";

import React from "react";
import useSWR from "swr";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import RecruitList from "../../molecules/RecruitList";

const getAllRecruits = async () => {
	const res = await fetch("/api/recruits");
	const recruits = await res.json();
	return recruits;
};

const RecruitsIndex = () => {
	const {
		data: recruits,
		error,
		isValidating,
	} = useSWR("/api/recruits", getAllRecruits);

	if (error) return <p>エラーが発生しました: {error.message}</p>;

	return (
		<>
			{!recruits || isValidating ? (
				<div className="flex flex-col space-y-3 z-50 h-screen items-center">
					<LoadingIcon
						width="40"
						height="40"
						className="animate-spin text-slate-600"
					/>
				</div>
			) : (
				<RecruitList recruits={recruits} />
			)}
		</>
	);
};

export default RecruitsIndex;
