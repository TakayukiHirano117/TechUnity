import React from "react";

import { searchRecruits } from "@/lib/fetcher/search";

import RecruitList from "../molecules/RecruitList";

const SearchResultsIndex = async ({ q }: { q: string }) => {
  // APIたたく
  const results = await searchRecruits(encodeURIComponent(q));

  return <RecruitList recruits={results} />;
};

export default SearchResultsIndex;
