import { headers } from "next/headers";
import React from "react";
import LikedRecruits from "@/components/molecules/dashboard/LikedRecruits";
import { DashBoardRecruit } from "@/types/types";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

const getLikedRecruits = async (): Promise<DashBoardRecruit[]> => {
  const res = await fetch(`${baseURL}/api/dashboard/liked-recruits`, {
    headers: Object.fromEntries(headers()),
  });
  const recruits = await res.json();
  return recruits;
};

const LikedRecruitsIndex = async () => {
  const recruits = await getLikedRecruits();

  return <LikedRecruits recruits={recruits} />;
};

export default LikedRecruitsIndex;
