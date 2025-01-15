import React from "react";

import { getAllRecruits } from "@/lib/fetcher/recruit";

import RecruitList from "../../molecules/RecruitList";

const RecruitsIndex = async () => {
  // 検索結果表示ページでも使用したい
  // なので使うfetcherは選べるようにしたい。
  const recruits = await getAllRecruits();

  return <RecruitList recruits={recruits} />;
};

export default RecruitsIndex;
