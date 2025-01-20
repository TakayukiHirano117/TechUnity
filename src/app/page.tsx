import React, { Suspense } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import TipsIcon from "@/components/atoms/Icon/TipsIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const RecruitsIndex = React.lazy(
  () => import("@/components/organisms/recruits/RecruitsIndex"),
);

const Top = () => {
  return (
    <div className="bg-slate-100">
      <div className="container max-w-[960px] min-h-screen mx-auto p-8 flex flex-col gap-8">
        <div className="flex items-end gap-1">
          <h1 className="text-4xl font-bold">Recruits</h1>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button type="button">
                <TipsIcon className="mb-2 hover:opacity-70 cursor-pointer" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="p-2 text-sm text-slate-600">
              ユーザーが投稿した募集一覧です。
              タイトルをクリックして内容を見てみましょう✨
            </HoverCardContent>
          </HoverCard>
        </div>
        <Suspense
          fallback={
            <div className="flex flex-col space-y-3 z-50 h-screen items-center mt-3">
              <LoadingIcon
                width="40"
                height="40"
                className="animate-spin text-slate-600"
              />
            </div>
          }
        >
          <RecruitsIndex />
        </Suspense>
      </div>
    </div>
  );
};

export default Top;
