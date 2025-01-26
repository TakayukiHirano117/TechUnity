import React from "react";

import { getProfile } from "@/lib/fetcher/profile";

import DashBoardProfiles from "../molecules/DashBoardProfiles";

// 自分のプロフィール情報を取得するコンポーネント
const DashBoardProfilesIndex = async () => {
  const profile = await getProfile();

  return <DashBoardProfiles profile={profile} />;
};

export default DashBoardProfilesIndex;
