"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import DeleteIcon from "@/components/atoms/Icon/DeleteIcon";
import PencilIcon from "@/components/atoms/Icon/PencilIcon";
import { Badge } from "@/components/ui/badge";
import { DialogClose } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHire } from "@/hooks/useHire";
import { deleteRecruit } from "@/lib/fetcher/recruit";

import MainDialog from "../dialog/MainDialog";

export type DashBoardRecruit = {
  id: string;
  title: string;
  createdAt: string;
  isPublished: boolean;
  creator: {
    id: string;
  };
  likes: {
    userId: string;
  }[];
  applications: {
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
  hires: {
    userId: string;
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
};

const DashBoardRecruitCard = ({ recruit }: { recruit: DashBoardRecruit }) => {
  const [dialogStates, setDialogStates] = useState<Record<string, boolean>>({});

  const { toggleHire, isHireMutating } = useHire(recruit.id);
  const router = useRouter();

  const handleHire = async (userId: string) => {
    await toggleHire({ userId });
    setDialogStates((prev) => ({ ...prev, [userId]: false }));
    router.refresh();
  };

  const toggleDialog = (userId: string, isOpen: boolean) => {
    setDialogStates((prev) => ({ ...prev, [userId]: isOpen }));
  };

  const handleDeleteRecruit = () => {
    try {
      deleteRecruit(recruit.id);
      toast.success("削除しました。");
      router.refresh();
    } catch (error) {
      toast.error("削除に失敗しました。");
    }
  };

  return (
    <div key={recruit.id} className="flex items-center justify-between gap-4">
      <div className="border-t w-full p-2 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold hover:opacity-70">
            <Link href={`/recruits/${recruit.id}/edit`}>{recruit.title}</Link>
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
                  <DropdownMenuLabel>応募しているユーザー</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex flex-col gap-2">
                    {recruit.applications.map((application) => (
                      <div key={application.user.id}>
                        <div className="text-sm text-slate-600 flex flex-col">
                          <div className="flex gap-4 justify-between w-full">
                            <div className="flex items-center gap-1 truncate">
                              <AvatarIcon
                                ImageSrc={application.user.image || ""}
                                fallbackText={application.user.name}
                                className="w-5 h-5 border"
                              />
                              <Link
                                href={`/profiles/${application.user.id}`}
                                className="hover:underline"
                              >
                                {application.user.name}
                              </Link>
                            </div>
                            {/* isHired次第で変える */}
                            {/* もしくはhiresにapplication.user.idが入っているかとかで判定 */}
                            {recruit.hires.some(
                              (hire) => hire.userId === application.user.id,
                            ) ? (
                              <MainDialog
                                title="採用を取り消しますか？"
                                description={`${application.user.name}はすでに採用されています。`}
                                trigger={
                                  <button
                                    type="button"
                                    className="bg-blue-300 hover:opacity-70 whitespace-nowrap border rounded-full px-2 py-1 duration-300"
                                  >
                                    採用済み
                                  </button>
                                }
                                onOpenChange={(isOpen) =>
                                  toggleDialog(application.user.id, isOpen)
                                }
                                isOpen={
                                  dialogStates[application.user.id] || false
                                }
                              >
                                <div className="flex flex-col items-center justify-center gap-4">
                                  <Image
                                    src="/undraw_feeling-blue_8si6.svg"
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
                                        handleHire(application.user.id)
                                      }
                                      disabled={isHireMutating}
                                    >
                                      取り消す
                                    </MainButton>
                                  </div>
                                </div>
                              </MainDialog>
                            ) : (
                              <MainDialog
                                title="採用しますか？"
                                description={`${application.user.name}を採用して、ともに開発をしましょう！`}
                                trigger={
                                  <button
                                    type="button"
                                    className="whitespace-nowrap border rounded-full px-2 py-1 hover:bg-slate-700 duration-300 hover:text-slate-50"
                                  >
                                    採用する
                                  </button>
                                }
                                onOpenChange={(isOpen) =>
                                  toggleDialog(application.user.id, isOpen)
                                }
                                isOpen={
                                  dialogStates[application.user.id] || false
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
                                        handleHire(application.user.id)
                                      }
                                      disabled={isHireMutating}
                                    >
                                      採用する
                                    </MainButton>
                                  </div>
                                </div>
                              </MainDialog>
                            )}
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
            <button className="p-1 rounded-full hover:bg-slate-200 border">
              <PencilIcon
                width="28"
                height="28"
                className="hover:opacity-70 text-slate-600"
              />
            </button>
          </Link>
          <div className="rounded-full hover:bg-slate-200 border p-1 cursor-pointer flex items-center justify-center">
            <MainDialog
              title="削除しますか？"
              description={`${recruit.title}を削除します、この操作は取り消せません`}
              trigger={
                <button
                  type="button"
                  className="w-7 h-7 rounded-full flex flex-col items-center justify-center"
                >
                  <DeleteIcon
                    width="25"
                    height="25"
                    className="hover:opacity-70 text-slate-600"
                  />
                </button>
              }
            >
              <div className="flex gap-4 justify-around">
                <DialogClose asChild>
                  <MainButton
                    className="rounded-full py-2 px-4"
                    variant={"outline"}
                  >
                    キャンセル
                  </MainButton>
                </DialogClose>
                <MainButton
                  type="submit"
                  className="rounded-full py-2 px-4"
                  variant={"destructive"}
                  onClick={handleDeleteRecruit}
                >
                  削除
                </MainButton>
              </div>
            </MainDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardRecruitCard;
