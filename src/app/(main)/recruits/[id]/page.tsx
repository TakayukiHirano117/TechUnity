"use client";

import MDEditor from "@uiw/react-md-editor";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import useSWR from "swr";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import GitHubIcon from "@/components/atoms/Icon/GitHubIcon";
import GoogleIcon from "@/components/atoms/Icon/GoogleIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import MainDialog from "@/components/molecules/dialog/MainDialog";
import { DialogClose } from "@/components/ui/dialog";
import { useApply } from "@/hooks/useApply";
import { useRecruitLike } from "@/hooks/useRecruitLike";

const getRecruitDetail = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" });
  return response.json();
};

const RecruitDetailPage = () => {
  const params = useParams();
  const id = params.id;

  const { data: session } = useSession();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApply = async () => {
    await toggleApply();
    setIsDialogOpen(false);
  };

  const {
    data: recruit,
    error,
    isLoading,
  } = useSWR(`/api/recruits/${id}`, getRecruitDetail);

  const { toggleRecruitLike, isLikeRecruitMutating } = useRecruitLike(
    id as string,
  );

  const { toggleApply, isApplyMutating } = useApply(id as string);

  return (
    <div className="bg-slate-100 mx-auto">
      {!recruit || isLoading ? (
        <div className="flex justify-between">
          <div className="mx-auto space-y-3 h-screen mt-3">
            <LoadingIcon
              width="40"
              height="40"
              className="animate-spin text-slate-600"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="container mx-auto">
            <div className="flex flex-col items-center py-[4rem] gap-4">
              <h1 className="text-4xl font-bold px-8">{recruit?.title}</h1>
              <div className="flex gap-4 items-center">
                <p className="text-slate-600 text-sm">
                  {format(recruit?.createdAt, "yyyy/MM/dd")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-8 max-w-[1200px] mx-auto p-8">
            <div className="lg:w-4/5 w-full">
              <MDEditor.Markdown
                source={recruit?.content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                className="text-[20px] prose-img:max-w-full prose prose-img:h-auto prose-img:mx-auto prose-img:block prose-code:text-slate-900 border p-10 rounded-t-lg max-w-full"
              />
              <div className="rounded-b-lg bg-white border p-8 w-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 ">
                    <div className="flex items-center gap-2">
                      <div className=" flex items-center">
                        {session ? (
                          !recruit.isApplied ? (
                            <MainDialog
                              title="応募しますか？"
                              description=""
                              trigger={
                                <button
                                  type="button"
                                  className={`rounded-full p-2 hover:bg-green-300 cursor-pointer ${
                                    recruit.isApplied
                                      ? "bg-green-300"
                                      : "bg-slate-200"
                                  }`}
                                  disabled={isApplyMutating}
                                >
                                  <ApplyIcon
                                    width="24"
                                    height="24"
                                    className="text-slate-600"
                                  />
                                </button>
                              }
                              onOpenChange={setIsDialogOpen}
                              isOpen={isDialogOpen}
                            >
                              <div className="flex flex-col items-center justify-center gap-4">
                                <Image
                                  src={"/undraw_resume_jrgi.svg"}
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
                                    onClick={handleApply}
                                    disabled={isApplyMutating}
                                  >
                                    {isApplyMutating ? "応募中" : "応募する"}
                                  </MainButton>
                                </div>
                              </div>
                            </MainDialog>
                          ) : (
                            <MainDialog
                              title="すでに応募済みです!"
                              description="応募を取り下げますか？"
                              trigger={
                                <button
                                  type="button"
                                  className={`rounded-full p-2 hover:bg-green-300 cursor-pointer ${
                                    recruit.isApplied
                                      ? "bg-green-300"
                                      : "bg-slate-200"
                                  }`}
                                  disabled={isApplyMutating}
                                >
                                  <ApplyIcon
                                    width="24"
                                    height="24"
                                    className="text-slate-600"
                                  />
                                </button>
                              }
                              onOpenChange={setIsDialogOpen}
                              isOpen={isDialogOpen}
                            >
                              <div className="flex flex-col items-center justify-center gap-4">
                                <Image
                                  src={"/undraw_feeling-blue_8si6.svg"}
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
                                    onClick={handleApply}
                                    disabled={isApplyMutating}
                                  >
                                    {isApplyMutating
                                      ? "取り下げています.."
                                      : "取り下げる"}
                                  </MainButton>
                                </div>
                              </div>
                            </MainDialog>
                          )
                        ) : (
                          // <LoginDialog />
                          <MainDialog
                            title="TechUnity"
                            description="TechUnityはチーム開発メンバーの募集をお手伝いする、チーム開発メンバー募集プラットフォームです。"
                            trigger={
                              <button
                                type="button"
                                className={`rounded-full p-2 hover:bg-green-300 cursor-pointer ${
                                  recruit.isApplied
                                    ? "bg-green-300"
                                    : "bg-slate-200"
                                }`}
                                disabled={isApplyMutating}
                              >
                                <ApplyIcon
                                  width="24"
                                  height="24"
                                  className="text-slate-600"
                                />
                              </button>
                            }
                          >
                            <MainButton
                              className="rounded-full font-bold"
                              variant="outline"
                              onClick={() => signIn("github")}
                            >
                              <GitHubIcon />
                              GitHubでログイン
                            </MainButton>
                            <MainButton
                              className="rounded-full font-bold"
                              variant="outline"
                              onClick={() => signIn("google")}
                            >
                              <GoogleIcon />
                              Googleでログイン
                            </MainButton>
                          </MainDialog>
                        )}
                      </div>
                      <span className="text-slate-500 text-sm">
                        {recruit.applications.length > 0
                          ? `${recruit.applications.length}人のユーザーが応募しています。`
                          : "まだ誰も応募していません。"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {session ? (
                        <>
                          <button
                            type="button"
                            className={`rounded-full p-2 hover:bg-red-300 cursor-pointer ${recruit.isLiked ? "bg-red-300" : "bg-slate-200"}`}
                            onClick={() => toggleRecruitLike()}
                            disabled={isLikeRecruitMutating}
                          >
                            <HeartIcon
                              width="24"
                              height="24"
                              className={`${
                                recruit.isLiked
                                  ? "text-red-600"
                                  : "text-slate-600"
                              }`}
                            />
                          </button>
                        </>
                      ) : (
                        <MainDialog
                          title="TechUnity"
                          description="TechUnityはチーム開発メンバーの募集をお手伝いする、チーム開発メンバー募集プラットフォームです。"
                          trigger={
                            <button
                              type="button"
                              className={`rounded-full p-2 hover:bg-red-300 cursor-pointer ${recruit.isLiked ? "bg-red-300" : "bg-slate-200"}`}
                              // onClick={() => toggleRecruitLike()}
                              // disabled={isLikeRecruitMutating}
                            >
                              <HeartIcon
                                width="24"
                                height="24"
                                className={`${
                                  recruit.isLiked
                                    ? "text-red-600"
                                    : "text-slate-600"
                                }`}
                              />
                            </button>
                          }
                        >
                          <MainButton
                            className="rounded-full font-bold"
                            variant="outline"
                            onClick={() => signIn("github")}
                          >
                            <GitHubIcon />
                            GitHubでログイン
                          </MainButton>
                          <MainButton
                            className="rounded-full font-bold"
                            variant="outline"
                            onClick={() => signIn("google")}
                          >
                            <GoogleIcon />
                            Googleでログイン
                          </MainButton>
                        </MainDialog>
                      )}
                      <span className="text-slate-500 text-sm">
                        {recruit.likes.length > 0 && recruit.likes.length}
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="my-6" />
                <div className="flex items-center gap-4">
                  <AvatarIcon
                    ImageSrc={recruit?.creator.image}
                    fallbackText={recruit?.creator.name}
                    className="w-12 h-12 border"
                  />
                  <div>
                    <h4 className="font-bold text-lg hover:underline">
                      <Link href={`/profiles/${recruit.creator.id}`} passHref>
                        {recruit?.creator.name}
                      </Link>
                    </h4>
                    <p>{recruit.creator.description || ""}</p>
                  </div>
                </div>
              </div>
            </div>
            <aside className="flex-1 lg:block hidden">
              <div className="flex flex-col gap-4 border rounded-lg max-w-full bg-white p-4">
                <div className="flex gap-4 items-center">
                  <AvatarIcon
                    ImageSrc={recruit?.creator.image}
                    fallbackText={recruit?.creator.name}
                    className="w-12 h-12 border"
                  />
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/profiles/${recruit.creator.id}`}
                      className="hover:underline"
                    >
                      <p className="font-bold hover:underline text-md">
                        {recruit?.creator.name}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
};

export default RecruitDetailPage;
