import { format } from "date-fns";
import Link from "next/link";
import React, { memo } from "react";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RecentlyViewedRecruitCardProps = {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  avatarImageSrc: string;
  publishedAt: string;
};

const RecentlyViewedRecruitCard = memo(
  ({
    id,
    title,
    authorName,
    avatarImageSrc,
    publishedAt,
    authorId,
  }: RecentlyViewedRecruitCardProps) => {
    return (
      <Card className="shadow-none border hover:border-slate-300 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="truncate text-base">
            <Link href={`/recruits/${id}`} className="hover:opacity-70">
              {title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 items-center">
          <AvatarIcon
            ImageSrc={avatarImageSrc}
            fallbackText="アバター"
            className="border w-8 h-8"
          />
          <div className="flex-1 min-w-0">
            <Link
              href={`/profiles/${authorId}`}
              className="hover:underline text-sm text-slate-700 truncate block"
            >
              {authorName}
            </Link>
            <p className="text-xs text-slate-500">
              {format(new Date(publishedAt), "yyyy/MM/dd")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
);

RecentlyViewedRecruitCard.displayName = "RecentlyViewedRecruitCard";

export default RecentlyViewedRecruitCard;

