import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import { Button } from "@/components/ui/button";
import { DashBoardRecruit } from "@/types/types";
import MainDialog from "../dialog/MainDialog";

const AppliedRecruits = ({ recruits }: { recruits: DashBoardRecruit[] }) => {
  return recruits.length > 0 ? (
    // 応募した募集データがある場合の表示
    <div className="flex flex-col gap-4">
      {recruits.map((recruit) => (
        // card形式でコンポーネント分ける
        <div
          key={recruit.id}
          className="flex items-center justify-between gap-4 container text-ellipsis overflow-hidden"
        >
          <div className="border-t w-full p-2">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="max-w-[200px]  sm:max-w-[350px] truncate font-bold text-lg hover:opacity-70">
                    <Link href={`/recruits/${recruit.id}`}>
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
  );
};

export default AppliedRecruits;
