import React from "react";

import { ProfilesRecruitListProps } from "@/types/types";

import ProfilesRecruitCard from "../card/ProfilesRecruitCard";

const ProfilesRecruitList = ({
  recruits,
}: {
  recruits: ProfilesRecruitListProps["recruits"];
}) => {
  return (
    <div>
      <h2 className="font-bold text-2xl my-2">Recruits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {recruits.map((recruit) => (
          <ProfilesRecruitCard key={recruit.id} recruit={recruit} />
        ))}
      </div>
    </div>
  );
};

export default ProfilesRecruitList;
