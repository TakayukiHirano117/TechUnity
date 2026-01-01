import dynamic from "next/dynamic";
import { Suspense } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import TipsIcon from "@/components/atoms/Icon/TipsIcon";
import RecruitsIndex from "@/components/organisms/recruits/RecruitsIndex";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// SSRを無効化してhydrationエラーを回避（localStorageはクライアントのみ）
const RecentlyViewedRecruitsSection = dynamic(
  () =>
    import("@/components/organisms/recentlyViewed/RecentlyViewedRecruitsSection"),
  { ssr: false },
);

const TopPage = () => {
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

        {/* 最近見た募集 */}
        <RecentlyViewedRecruitsSection />

        {/* 検索への誘導 */}
        <div className="flex gap-1 justify-center items-center">
          <span className="text-slate-600 text-sm">
            検索バーからもっと募集を探してみましょう
          </span>
          <button type="button" className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 64 64"
            >
              <circle cx="32" cy="32" r="30" fill="#4fd1d9" />
              <path fill="#fff" d="M48 30.3L32 15L16 30.3h10.6V49h10.3V30.3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopPage;
