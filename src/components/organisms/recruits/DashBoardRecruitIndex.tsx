import React from "react";

import DashBoardRecruitList from "@/components/molecules/DashBoardRecruitList";
import { getRecruitsWithUser } from "@/lib/fetcher/dashboard";

import NoDashboardRecruitsMessage from "./NoDashboardRecruitsMessage";

const DashBoardRecruitIndex = async () => {
  const recruits = await getRecruitsWithUser();

  return recruits.length > 0 ? (
    <DashBoardRecruitList recruits={recruits} />
  ) : (
    <NoDashboardRecruitsMessage />
  );
};

export default DashBoardRecruitIndex;
