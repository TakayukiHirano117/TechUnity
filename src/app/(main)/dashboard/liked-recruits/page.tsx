import Link from "next/link";
import React, { Suspense } from "react";

import MainButton from "@/components/atoms/button/MainButton";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import { SidebarItems } from "@/config/dashboard/SidebarItems";

const items = SidebarItems;

const LikedRecruitsIndex = React.lazy(
  () => import("@/components/organisms/dashboard/LikedRecruitsIndex"),
);

const LikedRecruitsDashboardPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
        {/* DashBoardSideBarを常に表示 */}
        <DashBoardSideBar items={items} />

        <div className="flex flex-col gap-4 sm:w-9/12 w-full">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">いいねした募集</h1>
            <MainButton className="rounded-full font-bold sm:hidden">
              <Link href={"/recruits/create"}>募集する</Link>
            </MainButton>
          </div>

          {/* ローディング状態の表示 */}
          {/* {!recruits || isLoading ? (
            <div className="mx-auto space-y-3 h-screen">
              <LoadingIcon
                width="40"
                height="40"
                className="animate-spin text-slate-600"
              />
            </div>
          ) : recruits.length > 0 ? (
            // 募集データがある場合の表示
            <div className="flex flex-col gap-4">
              {recruits.map((recruit) => (
                <div
                  key={recruit.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="border-t w-full p-2 flex items-center justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold hover:opacity-70">
                        <Link href={`/recruits/${recruit.id}`}>
                          {recruit.title}
                        </Link>
                      </h3>
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
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 募集データがない場合の表示
            <div className="flex flex-col items-center gap-4 text-slate-600">
              <h3>まだいいねした募集がありません。</h3>
              <Image
                src={"/undraw_engineering-team_13ax.svg"}
                width={300}
                height={300}
                alt="no-recruits"
                className="my-8"
              />
            </div>
          )} */}
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
            <LikedRecruitsIndex />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LikedRecruitsDashboardPage;
