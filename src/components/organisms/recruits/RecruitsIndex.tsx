import React from "react";

import RecruitList from "@/components/molecules/recruits/RecruitList";
import { getAllRecruits } from "@/lib/fetcher/recruit";

const RecruitsIndex = async () => {
  const recruits = await getAllRecruits();

  return <RecruitList recruits={recruits} />;
};

export default RecruitsIndex;
