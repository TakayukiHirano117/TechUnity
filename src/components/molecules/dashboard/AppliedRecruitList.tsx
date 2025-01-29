import React from "react";
import { DashBoardRecruit } from "@/types/types";
import AppliedRecruitCard from "../card/AppliedRecruitCard";

const AppliedRecruitList = ({ recruits }: { recruits: DashBoardRecruit[] }) => {
  return (
    // 応募した募集データがある場合の表示
    <div className="flex flex-col gap-4">
      {recruits.map((recruit) => (
        <AppliedRecruitCard key={recruit.id} recruit={recruit} />
      ))}
    </div>
  );
};

export default AppliedRecruitList;
