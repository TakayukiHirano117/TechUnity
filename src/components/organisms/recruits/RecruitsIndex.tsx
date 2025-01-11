import React from "react";

import { getAllRecruits } from "@/lib/fetcher/getAllRecruits";

import RecruitList from "../../molecules/RecruitList";

const RecruitsIndex = async () => {
  const recruits = await getAllRecruits();

  return <RecruitList recruits={recruits} />;
};

export default RecruitsIndex;
