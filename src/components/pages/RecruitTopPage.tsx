import React from "react";
import RecruitsIndex from "../organisms/recruits/RecruitsIndex";
import DefaultLayout from "../templates/DefaultLayout";

const RecruitTopPage = () => {
	return (
		// <DefaultLayout>
		<div className="bg-slate-100">
			<div className="container max-w-[960px] mx-auto p-8 flex flex-col gap-8">
				<h1 className="text-3xl font-bold">Recruits</h1>
				<RecruitsIndex />
			</div>
		</div>
		// </DefaultLayout>
	);
};

export default RecruitTopPage;
