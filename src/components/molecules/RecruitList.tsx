import { Application, Like } from "@prisma/client";
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
			id: string;
			name: string;
			image: string;
		};
		createdAt: string;
		updatedAt: string;
		isPublished: boolean;
		likes: Like[];
		applications: Application[];
		remainingCount: number;
	}[];
}) => {
	console.log(recruits)
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
			{recruits.map((recruit) => (
				<RecruitCard
					key={recruit.id}
					id={recruit.id}
					title={recruit.title}
					description={recruit.content}
					authorName={recruit?.creator.name}
					authorId={recruit?.creator.id}
					avatarImageSrc={recruit?.creator.image}
					publishedAt={recruit.createdAt}
					likes={recruit.likes}
					applications={recruit.applications}
					remainingCount={recruit?.remainingCount}
				/>
			))}
		</div>
	);
};

export default RecruitList;
