import React from "react";

import { getProfile } from "@/lib/fetcher/profile";

import DashBoardProfiles from "../molecules/DashBoardProfiles";

const DashBoardProfilesIndex = async () => {
  const profile = await getProfile();

  console.log(profile)

  return <DashBoardProfiles profile={profile} />;
};

export default DashBoardProfilesIndex;