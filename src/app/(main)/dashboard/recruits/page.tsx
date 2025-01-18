// "use client";

import { DeleteIcon, PencilIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import useSWR from "swr";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import MainDialog from "@/components/molecules/dialog/MainDialog";
// import DashBoardRecruitIndex from "@/components/organisms/recruits/DashBoardRecruitIndex";
import NoDashboardRecruitsMessage from "@/components/organisms/recruits/NoDashboardRecruitsMessage";
import { Badge } from "@/components/ui/badge";
import { DialogClose } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarItems } from "@/config/dashboard/SidebarItems";
import { useHire } from "@/hooks/useHire";
import { deleteRecruit } from "@/lib/apiFetch";
import { getRecruitsWithUser } from "@/lib/fetcher/recruit";
import { DashBoardRecruits } from "@/types/types";

const hireUserForRecruit = async (userId: string, id: string) => {
  await fetch(`/api/recruits/${id}/hire`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
};

const DashBoardRecruitIndex = React.lazy(
  () => import("@/components/organisms/recruits/DashBoardRecruitIndex"),
);

const RecruitsCreatedByMe = () => {
  // fetcher.tsのほうの削除関数を読んだ後にrouter.pushすればよい。
  // const router = useRouter();

  // DashboardRecruitListコンポーネントに入れる。
  // const {
  //   data: recruits,
  //   error,
  //   isLoading,
  // } = useSWR<DashBoardRecruits[]>(
  //   "/api/dashboard/recruits",
  //   getRecruitsWithUser,
  // );

  // useHireを、cardコンポーネントを作成してその中で呼ぶ。

  // if (error) return <p>エラーが発生しました: {error.message}</p>;

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
        {/* DashBoardSideBarを常に表示 */}
        <DashBoardSideBar items={SidebarItems} />

        <div className="flex flex-col gap-4 sm:w-9/12 w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">募集の管理</h1>
            <MainButton className="rounded-full font-bold sm:hidden">
              <Link href={"/recruits/create"}>募集する</Link>
            </MainButton>
          </div>

          <div className="flex flex-col gap-4">
            {/* ローディング状態を表示 */}
            {/* {!recruits || isLoading ? (
              <div className="mx-auto space-y-3 h-screen">
                <LoadingIcon
                  width="40"
                  height="40"
                  className="animate-spin text-slate-600"
                />
              </div>
            ) : recruits.length > 0 ? ( */}
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
              <DashBoardRecruitIndex />
            </Suspense>
            {/* ) : (
              // 募集がない場合のコンポーネント
              <NoDashboardRecruitsMessage />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitsCreatedByMe;
