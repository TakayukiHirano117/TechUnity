import React, { memo } from "react";

import { searchRecruits } from "@/lib/fetcher/search";

import RecruitList from "../../molecules/recruits/RecruitList";

const SearchResultsIndex = memo(async ({ q }: { q: string }) => {
  const recruits = await searchRecruits(q);

  return <RecruitList recruits={recruits} />;
});

SearchResultsIndex.displayName = "SearchResultsIndex";

export default SearchResultsIndex;
