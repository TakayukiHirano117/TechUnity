import React, { memo } from "react";

import { searchRecruits } from "@/lib/fetcher/search";

import RecruitList from "../molecules/RecruitList";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

const SearchResultsIndex = memo(async ({ q }: { q: string }) => {
  // APIたたく
  // const res = await fetch(
  //   `${baseURL}/api/search?q=${encodeURIComponent(q)}`,
  // );

  // const results = await res.json();

  const res = searchRecruits(q);
  const results = await res;

  return <RecruitList recruits={results} />;
});

SearchResultsIndex.displayName = "SearchResultsIndex";

export default SearchResultsIndex;
