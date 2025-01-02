"use client";

import React from "react";
import useSWR from "swr";
import RecruitList from "@/components/organisms/recruits/RecruitList";

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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="200"
							height="200"
							viewBox="0 0 24 24"
						>
							<g
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeWidth="2"
							>
								<path
									strokeDasharray="60"
									strokeDashoffset="60"
									strokeOpacity=".3"
									d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
								>
									<animate
										fill="freeze"
										attributeName="stroke-dashoffset"
										dur="1.3s"
										values="60;0"
									/>
								</path>
								<path
									strokeDasharray="15"
									strokeDashoffset="15"
									d="M12 3C16.9706 3 21 7.02944 21 12"
								>
									<animate
										fill="freeze"
										attributeName="stroke-dashoffset"
										dur="0.3s"
										values="15;0"
									/>
									<animateTransform
										attributeName="transform"
										dur="1.5s"
										repeatCount="indefinite"
										type="rotate"
										values="0 12 12;360 12 12"
									/>
								</path>
							</g>
						</svg>
					</div>
				) : (
					<RecruitList recruits={recruits} />
				)}
			</div>
		</div>
	);
};

export default AllRecruits;
