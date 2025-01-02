import React from "react";
import RecruitsIndex from "@/components/organisms/recruits/RecruitsIndex";

const AllRecruits = () => {
	return (
		<div className="bg-slate-100">
			<div className="container max-w-[960px] mx-auto p-8 flex flex-col gap-8">
				<h1 className="text-3xl font-bold">Recruits</h1>
				<RecruitsIndex />
			</div>
		</div>
	);
};

export default AllRecruits;
