import React from "react";

import { DashBoardRecruits } from "@/types/types";

import DashBoardRecruitCard from "./card/DashBoardRecruitCard";

const DashBoardRecruitList = ({
  recruits,
}) => {
  console.log(recruits);
  return (
    <>
      {recruits.map((recruit) => (
        <DashBoardRecruitCard key={recruit.id} recruit={recruit} />
      ))}
    </>
  );
};

export default DashBoardRecruitList;
