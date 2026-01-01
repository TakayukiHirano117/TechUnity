import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import RecentlyViewedRecruitCard from "@/components/atoms/card/RecentlyViewedRecruitCard";
import { RecruitWithRelations } from "@/generated/api.schemas";

type RecentlyViewedRecruitListProps = {
  recruits: RecruitWithRelations[];
};

const RecentlyViewedRecruitList = memo(
  ({ recruits }: RecentlyViewedRecruitListProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollPosition = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }, []);

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // 初期チェック
      checkScrollPosition();

      // スクロールイベントリスナー
      container.addEventListener("scroll", checkScrollPosition);
      // リサイズ時もチェック
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }, [checkScrollPosition, recruits]);

    if (recruits.length === 0) {
      return (
        <p className="text-slate-500 text-sm text-center py-4">
          まだ閲覧した募集がありません
        </p>
      );
    }

    return (
      <div className="relative">
        {/* 左端のスクロールインジケーター */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-4 w-10 flex items-center justify-center pointer-events-none z-10">
            <div className="animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </div>
          </div>
        )}

        {/* スクロールエリア */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 px-10"
        >
          {recruits.map((recruit) => (
            <div key={recruit.id} className="flex-shrink-0 w-[280px]">
              <RecentlyViewedRecruitCard
                id={recruit.id ?? ""}
                title={recruit.title ?? ""}
                authorName={recruit.creator?.name ?? "匿名"}
                authorId={recruit.creator?.id ?? ""}
                avatarImageSrc={recruit.creator?.image ?? "/default-avatar.png"}
                publishedAt={recruit.createdAt ?? new Date().toISOString()}
              />
            </div>
          ))}
        </div>

        {/* 右端のスクロールインジケーター */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-4 w-10 flex items-center justify-center pointer-events-none z-10">
            <div className="animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  },
);

RecentlyViewedRecruitList.displayName = "RecentlyViewedRecruitList";

export default RecentlyViewedRecruitList;

