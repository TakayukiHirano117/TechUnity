import { headers } from "next/headers";
import React from "react";
import AppliedRecruits from "@/components/molecules/dashboard/AppliedRecruits";
import { DashBoardRecruit } from "@/types/types";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

const getAppliedRecruits = async (): Promise<DashBoardRecruit[]> => {
  const res = await fetch(`${baseURL}/api/dashboard/applied-recruits`, {
    headers: Object.fromEntries(headers()),
  });
  const recruits = await res.json();
  return recruits;
};

const AppliedRecruitsIndex = async () => {
  const recruits = await getAppliedRecruits();

  return <AppliedRecruits recruits={recruits} />;
};

export default AppliedRecruitsIndex;
