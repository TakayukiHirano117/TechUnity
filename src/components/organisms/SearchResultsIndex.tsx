import React, { memo } from "react";

import { searchRecruits } from "@/lib/fetcher/search";

import RecruitList from "../molecules/RecruitList";

const SearchResultsIndex = memo(async ({ q }: { q: string }) => {
  const res = searchRecruits(q);
  const results = await res;

  return <RecruitList recruits={results} />;
});

SearchResultsIndex.displayName = "SearchResultsIndex";

export default SearchResultsIndex;
