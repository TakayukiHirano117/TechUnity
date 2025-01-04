import { format } from "date-fns";
import Link from "next/link";
import React, { memo } from "react";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
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
							<div className="text-sm text-slate-700">
								{format(publishedAt, "yyyy/MM/dd")}
							</div>
							<div className="flex items-center text-sm text-slate-700">
								{likes.length > 0 && (
									<>
										<HeartIcon width="16" height="16" />
										<span>{likes.length}</span>
									</>
								)}
							</div>
							<p className="text-end text-xs text-slate-600 font-extralight">
								あと{remainingCount || 0}人募集中
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
