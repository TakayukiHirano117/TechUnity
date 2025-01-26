"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import MainDialog from "@/components/molecules/dialog/MainDialog";
import { Button } from "@/components/ui/button";
import { SidebarItems } from "@/config/dashboard/SidebarItems";
import { DashBoardRecruit } from "@/types/types";

const items = SidebarItems;

const getAppliedRecruits = async (): Promise<DashBoardRecruit[]> => {
  const res = await fetch("/api/dashboard/applied-recruits");
  const recruits = await res.json();
  // console.log(recruits)
  return recruits;
};

const AppliedRecruitsPage = () => {
  const {
    data: recruits,
    error,
    isLoading,
  } = useSWR<DashBoardRecruit[]>(
    "/api/dashboard/applied-recruits",
    getAppliedRecruits,
  );

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
        {/* DashBoardSideBarを常時表示 */}
        <DashBoardSideBar items={items} />

        <div className="flex flex-col gap-4 sm:w-9/12 w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">応募した募集</h1>
            <MainButton className="rounded-full font-bold sm:hidden">
              <Link href={"/recruits/create"}>募集する</Link>
            </MainButton>
          </div>

          {/* ローディング状態の表示 */}
          {!recruits || isLoading ? (
            <div className="mx-auto space-y-3 h-screen">
              <LoadingIcon
                width="40"
                height="40"
                className="animate-spin text-slate-600"
              />
            </div>
          ) : recruits.length > 0 ? (
            // 応募した募集データがある場合の表示
            <div className="flex flex-col gap-4">
              {recruits.map((recruit) => (
                <div
                  key={recruit.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="border-t w-full p-2">
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex flex-col gap-2">
                        <div>
                          <h3 className="text-lg font-bold hover:opacity-70">
                            <Link
                              href={`/recruits/${recruit.id}`}
                              className="truncate w-1/2"
                            >
                              {recruit.title}
                            </Link>
                          </h3>
                        </div>
                        <div className="flex gap-2 items-end text-slate-600 text-sm">
                          <AvatarIcon
                            ImageSrc={recruit.creator.image}
                            fallbackText="アバター"
                            className="w-8 h-8 rounded-full border"
                          />
                          <Link
                            href={`/profiles/${recruit.creator.id}`}
                            className="hover:underline"
                          >
                            <p>{recruit.creator.name}</p>
                          </Link>
                          {recruit.applications.length > 0 && (
                            <div className="flex items-center gap-1">
                              <ApplyIcon width="16" height="16" />
                              <span>{recruit.applications.length}</span>
                            </div>
                          )}
                          {recruit.likes.length > 0 && (
                            <div className="flex items-center gap-1">
                              <HeartIcon width="16" height="16" />
                              <span>{recruit.likes.length}</span>
                            </div>
                          )}
                          {recruit.hires.length > 0 && (
                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 256 256"
                              >
                                <path
                                  fill="currentColor"
                                  d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32Z"
                                />
                              </svg>
                              <span>{recruit.hires.length}</span>
                            </div>
                          )}
                          <div>{format(recruit.createdAt, "yyyy/MM/dd")}</div>
                        </div>
                      </div>
                      {recruit.isHired && (
                        <>
                          {recruit.repositoryUrl ? (
                            <MainDialog
                              title="採用されました🎉"
                              description="チーム開発にともに励みましょう！"
                              trigger={
                                <Button
                                  variant={"outline"}
                                  className="rounded-full font-bold w-10 h-10 sm:w-fit sm:h-fit"
                                >
                                  <span className="sm:inline hidden">
                                    採用されています🎉
                                  </span>
                                  <span className="sm:hidden inline">🎉</span>
                                </Button>
                              }
                            >
                              <div className="flex flex-col items-center justify-center gap-4">
                                <Image
                                  src={"/undraw_creative-team_wfty.svg"}
                                  width={200}
                                  height={200}
                                  alt="team"
                                />
                                <div className="flex items-center text-slate-600 font-bold">
                                  <Link
                                    href={recruit.repositoryUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    プロジェクトURLはこちら
                                  </Link>
                                </div>
                              </div>
                            </MainDialog>
                          ) : (
                            <MainDialog
                              title="採用されました🎉"
                              description="チーム開発にともに励みましょう！"
                              trigger={
                                <Button
                                  variant={"outline"}
                                  className="rounded-full font-bold w-10 h-10 sm:w-fit sm:h-fit"
                                >
                                  <span className="sm:inline hidden">
                                    採用されています✅
                                  </span>
                                  <span className="sm:hidden inline">✅</span>
                                </Button>
                              }
                            >
                              <div className="flex flex-col items-center justify-center gap-4">
                                <Image
                                  src={"/undraw_wait-in-line_fbdq.svg"}
                                  width={200}
                                  height={200}
                                  alt="team"
                                />
                                <div className="flex items-center text-slate-600 font-bold">
                                  募集作成者がプロジェクトURLを発行するまでお待ちください
                                </div>
                              </div>
                            </MainDialog>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 応募した募集データがない場合の表示
            <div className="flex flex-col items-center gap-4 text-slate-600">
              <h3>まだ応募した募集がありません。</h3>
              <Image
                src={"/undraw_job-offers_55y0.svg"}
                width={300}
                height={300}
                alt="no-recruits"
                className="my-8"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedRecruitsPage;
