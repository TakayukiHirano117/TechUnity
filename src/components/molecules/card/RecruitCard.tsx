import Link from "next/link";
import React, { memo } from "react";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RecruitCardProps } from "@/types/types";

const RecruitCard = memo(
	({
		id,
		title,
		description,
		authorName,
		avatarImageSrc,
		publishedAt,
		goodCount,
		remainingCount,
	}: RecruitCardProps) => {
		return (
			<Card className="shadow-none border-none">
				<CardHeader>
					<CardTitle className="truncate text-lg">
						<Link href={`/recruits/${id}`} className="hover:opacity-70">
							{title}
						</Link>
					</CardTitle>
					<CardDescription className="truncate">{description}</CardDescription>
				</CardHeader>
				<CardContent className="flex gap-4">
					<AvatarIcon ImageSrc={avatarImageSrc} fallbackText="アバター" />
					<div>
						<Link href={"/profiles/1"} className="hover:underline">
							<p>{authorName}</p>
						</Link>
						<div className="flex justify-between gap-2 items-center">
							<div className="text-sm text-slate-700">{publishedAt}</div>
							<div className="flex items-center text-sm text-slate-700">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="M12 4.528a6 6 0 0 0-8.243 8.715l6.829 6.828a2 2 0 0 0 2.828 0l6.829-6.828A6 6 0 0 0 12 4.528zm-1.172 1.644l.465.464a1 1 0 0 0 1.414 0l.465-.464a4 4 0 1 1 5.656 5.656L12 18.657l-6.828-6.829a4 4 0 0 1 5.656-5.656z"
									/>
								</svg>
								{goodCount || 0}
							</div>
							<p className="text-end text-xs text-slate-600 font-extralight">
								あと{remainingCount || 0}人募集中
							</p>
						</div>
					</div>
				</CardContent>
				{/* <CardFooter></CardFooter> */}
			</Card>
		);
	},
);

RecruitCard.displayName = "RecruitCard";

export default RecruitCard;
