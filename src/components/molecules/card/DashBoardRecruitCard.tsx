import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { useHire } from "@/hooks/useHire";

import AvatarIcon from "../../atoms/avatar/AvatarIcon";
import MainButton from "../../atoms/button/MainButton";
import { DialogClose } from "../../ui/dialog";
import MainDialog from "../dialog/MainDialog";

const DashBoardRecruitCard = ({
  userId,
  username,
  userImage,
  recruitId,
}: {
  userId: string;
  username: string;
  userImage: string;
  recruitId: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toggleHire, isHireMutating } = useHire(recruitId);

  const handleHire = async () => {
    await toggleHire({ userId });
    setIsDialogOpen(false);
  };

  return (
    <div key={userId}>
      <div className="text-sm text-slate-600 flex flex-col">
        <div className="flex gap-4 justify-between">
          <div className="flex items-center gap-1">
            <AvatarIcon
              ImageSrc={userImage}
              fallbackText={username}
              className="w-5 h-5"
            />
            <Link href={`/profiles/${userId}`} className="hover:underline">
              {username}
            </Link>
          </div>
          {/* すでに採用しているかどうかで表示を変える。recruit/id/page.tsxを参照 */}
          <MainDialog
            title="採用しますか？"
            description={`${username}を採用して、ともに開発をしましょう！`}
            trigger={
              <button
                type="button"
                className="border rounded-full px-2 py-1 hover:bg-slate-700 duration-300 hover:text-slate-50"
              >
                ✅ 採用する
              </button>
            }
            onOpenChange={setIsDialogOpen}
            isOpen={isDialogOpen}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={"/undraw_team-up_qeem.svg"}
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
                  onClick={handleHire}
                  disabled={isHireMutating}
                >
                  {isHireMutating ? "取り消しています.." : "取り消す"}
                </MainButton>
              </div>
            </div>
          </MainDialog>
        </div>
        <hr className="my-1" />
      </div>
    </div>
  );
};

export default DashBoardRecruitCard;
