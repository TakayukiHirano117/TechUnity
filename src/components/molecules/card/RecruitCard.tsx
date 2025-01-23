import { format } from "date-fns";
import Link from "next/link";
import React, { memo } from "react";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import {
  Card,
  CardContent,
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
    hires,
    // remainingCount,
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
          <AvatarIcon
            ImageSrc={avatarImageSrc}
            fallbackText="アバター"
            className="border"
          />
          <div>
            <Link href={`/profiles/${authorId}`} className="hover:underline">
              <p>{authorName}</p>
            </Link>
            <div className="flex  gap-2 items-center">
              <div className="text-sm text-slate-700">
                {format(publishedAt, "yyyy/MM/dd")}
              </div>
              <div className="flex items-center text-sm text-slate-700 gap-1">
                {applications?.length > 0 && (
                  <>
                    <ApplyIcon width="16" height="16" />
                    <span>{applications.length}</span>
                  </>
                )}
                {likes?.length > 0 && (
                  <>
                    <HeartIcon width="16" height="16" />
                    <span>{likes.length}</span>
                  </>
                )}
                {hires?.length > 0 && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32Z"
                      />
                    </svg>
                    <span>{hires.length}</span>
                  </>
                )}
              </div>
              {/* <p className="text-end text-xs text-slate-600 font-extralight">
								あと{remainingCount || "n"}人募集中
							</p> */}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);

RecruitCard.displayName = "RecruitCard";

export default RecruitCard;
