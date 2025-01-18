import { Application, Hire, Like } from "@prisma/client";
import React from "react";

import ProfilesRecruitCard from "./card/ProfilesRecruitCard";

// propsでpropsを受け取る。
const ProfilesRecruitList = ({
  recruits,
}: {
  recruits: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    likes: Like[];
    applications: Application[];
    hires: Hire[];
  }[];
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
    // mapでrecruitsをループさせてそのなかでProfilesRecruitCardを呼び出す
  );
};

export default ProfilesRecruitList;
