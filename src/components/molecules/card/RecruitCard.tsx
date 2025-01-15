import { format } from "date-fns";
import Link from "next/link";
import React, { memo } from "react";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
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
		likes,
		authorId,
		applications,
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
					{/* <CardDescription className="truncate">{description}</CardDescription> */}
				</CardHeader>
				<CardContent className="flex gap-4">
					<AvatarIcon ImageSrc={avatarImageSrc} fallbackText="アバター" className="border" />
					<div>
						<Link href={`/profiles/${authorId}`} className="hover:underline">
							<p>{authorName}</p>
						</Link>
						<div className="flex  gap-2 items-center">
							<div className="text-sm text-slate-700">
								{format(publishedAt, "yyyy/MM/dd")}
							</div>
							<div className="flex items-center text-sm text-slate-700 gap-1">
								{applications.length > 0 && (
									<>
										<ApplyIcon width="16" height="16" />
										<span>{applications.length}</span>
									</>
								)}
								{likes.length > 0 && (
									<>
										<HeartIcon width="16" height="16" />
										<span>{likes.length}</span>
									</>
								)}
							</div>
							<p className="text-end text-xs text-slate-600 font-extralight">
								あと{remainingCount || "n"}人募集中
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	},
);

RecruitCard.displayName = "RecruitCard";

export default RecruitCard;
