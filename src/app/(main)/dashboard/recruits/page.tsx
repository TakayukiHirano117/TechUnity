"use client";

import { DeleteIcon, PencilIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import MainDialog from "@/components/molecules/dialog/MainDialog";
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

const RecruitsCreatedByMe = () => {
  // fetcher.tsのほうの削除関数を読んだ後にrouter.pushすればよい。
  const router = useRouter();

  // DashboardRecruitListコンポーネントに入れる。
  const {
    data: recruits,
    error,
    isLoading,
  } = useSWR<DashBoardRecruits[]>(
    "/api/dashboard/recruits",
    getRecruitsWithUser,
  );

  // useHireを、cardコンポーネントを作成してその中で呼ぶ。

  if (error) return <p>エラーが発生しました: {error.message}</p>;

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
            {!recruits || isLoading ? (
              <div className="mx-auto space-y-3 h-screen">
                <LoadingIcon
                  width="40"
                  height="40"
                  className="animate-spin text-slate-600"
                />
              </div>
            ) : recruits.length > 0 ? (
              // 募集がある場合の表示
              // これをlistコンポーネントに分離する。
              recruits.map((recruit) => (
                // これをcardコンポーネントに分離する。
                <div
                  key={recruit.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="border-t w-full p-2 flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold hover:opacity-70">
                        <Link href={`/recruits/${recruit.id}/edit`}>
                          {recruit.title}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">
                          {recruit.isPublished ? (
                            <Badge className="text-xs">公開中</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              非公開
                            </Badge>
                          )}
                        </span>
                        {/* 応募者の情報を表示 */}
                        {recruit.applications.length > 0 ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="hover:opacity-70 flex items-center gap-1 cursor-pointer border px-2 rounded-full">
                                <ApplyIcon width="20" height="20" />
                                {recruit.applications.length}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              <DropdownMenuLabel>
                                応募しているユーザー
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <div className="flex flex-col gap-2">
                                {recruit.applications.map((application) => (
                                  <div key={application.user.id}>
                                    <div className="text-sm text-slate-600 flex flex-col">
                                      <div className="flex gap-4 justify-between w-full">
                                        <div className="flex items-center gap-1 truncate">
                                          <AvatarIcon
                                            ImageSrc={application.user.image}
                                            fallbackText={application.user.name}
                                            className="w-5 h-5"
                                          />
                                          <Link
                                            href={`/profiles/${application.user.id}`}
                                            className="hover:underline"
                                          >
                                            {application.user.name}
                                          </Link>
                                        </div>
                                        <MainDialog
                                          title="採用しますか？"
                                          description={`${application.user.name}を採用して、ともに開発をしましょう！`}
                                          trigger={
                                            <button
                                              type="button"
                                              className="whitespace-nowrap border rounded-full px-2 py-1 hover:bg-slate-700 duration-300 hover:text-slate-50"
                                            >
                                              ✅ 採用する
                                            </button>
                                          }
                                        >
                                          <div className="flex flex-col items-center justify-center gap-4">
                                            <Image
                                              src="/undraw_team-up_qeem.svg"
                                              width={200}
                                              height={200}
                                              alt="resume"
                                            />
                                            <div className="flex justify-center gap-4">
                                              <DialogClose asChild>
                                                <MainButton
                                                  className="rounded-full font-bold"
                                                  variant={"outline"}
                                                >
                                                  キャンセル
                                                </MainButton>
                                              </DialogClose>
                                              <MainButton
                                                type="button"
                                                className="rounded-full font-bold"
                                                onClick={() =>
                                                  hireUserForRecruit(
                                                    application.user.id,
                                                    recruit.id,
                                                  )
                                                }
                                              >
                                                採用する
                                              </MainButton>
                                            </div>
                                          </div>
                                        </MainDialog>
                                      </div>
                                      <hr className="my-1" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <DropdownMenuSeparator />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <div className="text-sm text-slate-600">
                            まだ誰も応募していません。
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Link href={`/recruits/${recruit.id}/edit`}>
                        <div className="p-2 rounded-full hover:bg-slate-200 border">
                          <PencilIcon
                            width="20"
                            height="20"
                            className="hover:opacity-70 text-slate-600"
                          />
                        </div>
                      </Link>
                      <div className="p-2 rounded-full hover:bg-slate-200 border cursor-pointer">
                        <MainDialog
                          title="削除しますか？"
                          description={`${recruit.title}を削除します、この操作は取り消せません`}
                          trigger={
                            <DeleteIcon
                              width="20"
                              height="20"
                              className="hover:opacity-70 text-slate-600"
                            />
                          }
                        >
                          <div className="flex gap-4 justify-around">
                            <MainButton
                              className="rounded-full py-2 px-4"
                              variant={"outline"}
                            >
                              キャンセル
                            </MainButton>
                            <MainButton
                              className="rounded-full py-2 px-4"
                              variant={"destructive"}
                              onClick={() =>
                                deleteRecruit(
                                  recruit.id,
                                  router,
                                  "/dashboard/recruits",
                                )
                              }
                            >
                              削除
                            </MainButton>
                          </div>
                        </MainDialog>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // 募集がない場合のコンポーネント
              <NoDashboardRecruitsMessage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitsCreatedByMe;
