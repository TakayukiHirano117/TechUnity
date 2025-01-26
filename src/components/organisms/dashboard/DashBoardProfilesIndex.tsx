import React from "react";

import DashBoardProfiles from "@/components/molecules/dashboard/DashBoardProfiles";
import { getProfile } from "@/lib/fetcher/profile";

// 自分のプロフィール情報を取得するコンポーネント
const DashBoardProfilesIndex = async () => {
  const profile = await getProfile();

  return <DashBoardProfiles profile={profile} />;
};

export default DashBoardProfilesIndex;
