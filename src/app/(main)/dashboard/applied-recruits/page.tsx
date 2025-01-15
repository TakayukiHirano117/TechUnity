"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import { SidebarItems } from "@/config/dashboard/SidebarItems";
import { DashBoardRecruits } from "@/types/types";
import MainButton from "@/components/atoms/button/MainButton";

const items = SidebarItems;

const getAppliedRecruits = async (): Promise<DashBoardRecruits[]> => {
  const res = await fetch("/api/dashboard/applied-recruits");
  const recruits = await res.json();
  console.log(recruits);
  return recruits;
};

const AppliedRecruitsPage = () => {
  const {
    data: recruits,
    error,
    isLoading,
  } = useSWR<DashBoardRecruits[]>(
    "/api/dashboard/applied-recruits",
    getAppliedRecruits,
  );

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
        {!recruits || isLoading ? (
          <div className="mx-auto space-y-3 h-screen">
            <LoadingIcon
              width="40"
              height="40"
              className="animate-spin text-slate-600"
            />
          </div>
        ) : (
          <>
            <DashBoardSideBar items={items} />
            <div className="flex flex-col gap-4 sm:w-9/12 w-full">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl">応募した募集</h1>
                <MainButton className="rounded-full font-bold sm:hidden">
                  <Link href={"/recruits/create"}>募集する</Link>
                </MainButton>
              </div>
              <div className="flex flex-col gap-4">
                {recruits.length > 0 ? (
                  recruits?.map((recruit) => (
                    <div
                      key={recruit.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="border-t w-full p-2 ">
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
                              className="w-8 h-8 rounded-full"
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
                            <div>{format(recruit.createdAt, "yyyy/MM/dd")}</div>
                          </div>
                          {/* <div className="flex gap-4 items-center">
														<Link href={`/recruits/${recruit.id}`}>
															<div className="p-2 rounded-full hover:bg-slate-200 border">
																<ApplyIcon
																	width="20"
																	height="20"
																	className="hover:opacity-70 text-slate-600"
																/>
															</div>
														</Link>
													</div> */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
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
          </>
        )}
      </div>
    </div>
  );
};

export default AppliedRecruitsPage;
