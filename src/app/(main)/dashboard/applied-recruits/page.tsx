import Link from "next/link";
import React, { Suspense } from "react";

import MainButton from "@/components/atoms/button/MainButton";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import { SidebarItems } from "@/config/dashboard/SidebarItems";

const AppliedRecruitsIndex = React.lazy(
  () => import("@/components/organisms/dashboard/AppliedRecruitsIndex"),
);

// 応募した募集一覧ページ
const AppliedRecruitsPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
        {/* DashBoardSideBar */}
        <DashBoardSideBar items={SidebarItems} />

        <div className="flex flex-col gap-4 sm:w-9/12 w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">応募した募集</h1>
            <MainButton className="rounded-full font-bold sm:hidden">
              <Link href={"/recruits/create"}>募集する</Link>
            </MainButton>
          </div>
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
            <AppliedRecruitsIndex />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AppliedRecruitsPage;
