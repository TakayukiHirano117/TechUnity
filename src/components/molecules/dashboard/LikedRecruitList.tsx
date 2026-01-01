import React from "react";

import { DashBoardRecruit } from "@/types/types";

import LikedRecruitCard from "../card/LikedRecruitCard";

const LikedRecruitList = ({ recruits }: { recruits: DashBoardRecruit[] }) => {
  return (
    // 募集データがある場合の表示
    <div className="flex flex-col gap-4">
      {recruits.map((recruit) => (
        <LikedRecruitCard key={recruit.id} recruit={recruit} />
      ))}
    </div>
  );
};

export default LikedRecruitList;
