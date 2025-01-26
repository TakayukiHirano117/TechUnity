import Link from "next/link";
import React, { memo } from "react";

import { UserProfileHeaderProps } from "@/types/types";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import GitHubIcon from "@/components/atoms/Icon/GitHubIcon";


const UserProfileHeader = memo(
  ({ profile, className }: UserProfileHeaderProps) => {
    return (
      <div
        className={`${className} flex w-full items-center gap-8 justify-center bg-white max-w-max mx-auto p-4 rounded-lg shadow-sm`}
      >
        <AvatarIcon
          ImageSrc={profile?.image || ""}
          fallbackText={profile?.name || "No Name"}
          className="w-20 h-20 border"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-slate-900">
            {profile?.name || "Anonymous User"}
          </h1>
          <div>{profile?.description}</div>
          {profile?.githubUrl && (
            <Link
              href={profile.githubUrl || "#"}
              className="hover:opacity-70 w-fit flex items-center gap-2"
            >
              <GitHubIcon width="20" height="20" />
              <span>GitHub URL</span>
            </Link>
          )}
        </div>
      </div>
    );
  },
);

UserProfileHeader.displayName = "UserProfileHeader";

export default UserProfileHeader;
