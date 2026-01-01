"use client";

import React from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import RecentlyViewedRecruitList from "@/components/molecules/recentlyViewed/RecentlyViewedRecruitList";
import { useGetRecentlyViewedRecruits } from "@/generated/recruits";
import { useRecentlyViewedStore } from "@/store/recentlyViewedRecruits";

const RecentlyViewedRecruitsSection = () => {
  const recentlyViewedIds = useRecentlyViewedStore(
    (state) => state.recentlyViewedIds,
  );

  const { data, isLoading } = useGetRecentlyViewedRecruits(
    { ids: recentlyViewedIds.join(",") },
    {
      query: {
        enabled: recentlyViewedIds.length > 0,
      },
    },
  );

  // 閲覧履歴がない場合は何も表示しない
  if (recentlyViewedIds.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingIcon
          width="32"
          height="32"
          className="animate-spin text-slate-600"
        />
      </div>
    );
  }

  const recruits = data?.data ?? [];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">最近見た募集</h2>
      <RecentlyViewedRecruitList recruits={recruits} />
    </section>
  );
};

export default RecentlyViewedRecruitsSection;
