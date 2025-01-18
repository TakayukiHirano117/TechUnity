import { Application, Hire, Like } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfilesRecruitCard = ({
  recruit,
}: {
  recruit: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    likes: Like[];
    applications: Application[];
    hires: Hire[];
  };
}) => {
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle className="truncate text-lg">
          <Link href={`/recruits/${recruit.id}`} className="hover:opacity-70">
            {recruit.title}
          </Link>
        </CardTitle>
        {/* <CardDescription className="truncate">{description}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex gap-4">
        <div>
          <div className="flex  gap-2 items-center">
            <div className="text-sm text-slate-700">
              {format(recruit.createdAt, "yyyy/MM/dd")}
            </div>
            <div className="flex items-center text-sm text-slate-700 gap-1">
              {recruit.applications.length > 0 && (
                <>
                  <ApplyIcon width="16" height="16" />
                  <span>{recruit.applications.length}</span>
                </>
              )}
              {recruit.likes.length > 0 && (
                <>
                  <HeartIcon width="16" height="16" />
                  <span>{recruit.likes.length}</span>
                </>
              )}
              {recruit.hires.length > 0 && (
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
                  <span>{recruit.hires.length}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilesRecruitCard;
