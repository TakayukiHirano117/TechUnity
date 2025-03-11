import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/dashboard/DashBoardSideBar";
import { SidebarItems } from "@/config/dashboard/SidebarItems";

const DashBoardProfilesIndex = dynamic(
  () => import("@/components/organisms/dashboard/DashBoardProfilesIndex"),
);

// 自分のプロフィールページ
const ProfileSettingsPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
        <DashBoardSideBar items={SidebarItems} />
        <div className="flex flex-col gap-4 sm:w-9/12 w-full">
          <h1 className="font-bold text-3xl">プロフィール</h1>
          <Suspense
            fallback={
              <div className="mx-auto space-y-3 h-screen">
                <LoadingIcon
                  width="40"
                  height="40"
                  className="animate-spin text-slate-600"
                />
              </div>
            }
          >
            <DashBoardProfilesIndex />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
