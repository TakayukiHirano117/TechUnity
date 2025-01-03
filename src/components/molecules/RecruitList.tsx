import React from "react";
import RecruitCard from "@/components/molecules/card/RecruitCard";

const RecruitList = ({
	recruits,
}: {
	recruits: {
		id: number;
		title: string;
		content: string;
		creator: {
			name: string;
			image: string;
		};
		createdAt: string;
		goodCount: number;
		remainingCount: number;
	}[];
}) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
			{recruits.map((recruit) => (
				<RecruitCard
					key={recruit.id}
					id={recruit.id}
					title={recruit.title}
					description={recruit.content}
					authorName={recruit.creator.name}
					avatarImageSrc={recruit.creator.image}
					publishedAt={recruit.createdAt}
					goodCount={recruit.goodCount}
					remainingCount={recruit.remainingCount}
				/>
			))}
		</div>
	);
};

export default RecruitList;
