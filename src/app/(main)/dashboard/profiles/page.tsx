import React, { Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import { SidebarItems } from "@/config/dashboard/SidebarItems";


const items = SidebarItems;

const DashBoardProfilesIndex = React.lazy(
  () => import("@/components/organisms/DashBoardProfilesIndex"),
);

const ProfileSettingsPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
        <DashBoardSideBar items={items} />
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
      <Toaster />
    </div>
  );
};

export default ProfileSettingsPage;
