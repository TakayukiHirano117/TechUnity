import React, { memo } from "react";

import { UserProfileHeaderProps } from "@/types/types";

import AvatarIcon from "../atoms/avatar/AvatarIcon";

const UserProfileHeader = memo(
  ({ profile, className }: UserProfileHeaderProps) => {
    return (
      <div
        className={`${className} flex items-center gap-8 justify-center bg-white max-w-max mx-auto p-4 rounded-lg shadow-sm`}
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
        </div>
      </div>
    );
  },
);

UserProfileHeader.displayName = "UserProfileHeader";

export default UserProfileHeader;
