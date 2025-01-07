import React, { Suspense } from "react";
import LoadingIcon from "../atoms/Icon/LoadingIcon";
// import RecruitsIndex from "../organisms/recruits/RecruitsIndex";
import DefaultLayout from "../templates/DefaultLayout";

const RecruitsIndex = React.lazy(
	() => import("../organisms/recruits/RecruitsIndex"),
);

const RecruitTopPage = () => {
	return (
		// <DefaultLayout>
		<div className="bg-slate-100">
			<div className="container max-w-[960px] mx-auto p-8 flex flex-col gap-8">
				<h1 className="text-4xl font-bold">Recruits</h1>
				<Suspense
					fallback={
						<div className="flex flex-col space-y-3 z-50 h-screen items-center mt-3">
							<LoadingIcon
								width="40"
								height="40"
								className="animate-spin text-slate-600"
							/>
						</div>
					}
				>
					<RecruitsIndex />
				</Suspense>
			</div>
		</div>
		// </DefaultLayout>
	);
};

export default RecruitTopPage;
