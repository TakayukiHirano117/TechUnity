"use client";

import { DeleteIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

import MainButton from "@/components/atoms/button/MainButton";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import MainDialog from "@/components/molecules/dialog/MainDialog";
import { Badge } from "@/components/ui/badge";
import { SidebarItems } from "@/config/dashboard/SidebarItems";
import { deleteRecruit } from "@/lib/apiFetch";
import { DashBoardRecruits } from "@/types/types";

const items = SidebarItems;

const getRecruitsWithUser = async (): Promise<DashBoardRecruits[]> => {
  const res = await fetch("/api/dashboard/recruits");
  const recruits = await res.json();
  return recruits;
};

const RecruitsCreatedByMe = () => {
  const router = useRouter();

  const {
    data: recruits,
    error,
    isLoading,
  } = useSWR<DashBoardRecruits[]>(
    "/api/dashboard/recruits",
    getRecruitsWithUser,
  );

  // if (isLoading) return <p>loading...</p>;

  if (error) return <p>エラーが発生しました: {error.message}</p>;

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
            <div className="flex flex-col gap-4 w-9/12">
              <h1 className="font-bold text-3xl">募集の管理</h1>
              <div className="flex flex-col gap-4">
                {recruits.length > 0 ? (
                  recruits?.map((recruit) => (
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
                          <span className="text-sm text-slate-600">
                            {recruit.isPublished ? (
                              <Badge>公開中</Badge>
                            ) : (
                              <Badge variant="outline">非公開</Badge>
                            )}
                          </span>
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
                          {/* <Link href={"/"}> */}
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
                          {/* </Link> */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-4 text-slate-600">
                    <h3>まだ募集がありません。</h3>
                    <p>募集を作成してみましょう!</p>
                    <Image
                      src={"/undraw_engineering-team_13ax.svg"}
                      width={300}
                      height={300}
                      alt="no-recruits"
                      className="my-8"
                    />
                    <div>
                      <MainButton className="rounded-full font-bold">
                        <Link href={"/recruits/create"}>募集する</Link>
                      </MainButton>
                    </div>
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

export default RecruitsCreatedByMe;
