import React, { memo } from "react";

import { searchRecruits } from "@/lib/fetcher/search";

import RecruitList from "../../molecules/recruits/RecruitList";

export const revalidate = 0;

const SearchResultsIndex = memo(async ({ q }: { q: string }) => {
  const recruits = await searchRecruits(q);

  return <RecruitList recruits={recruits} />;
});

SearchResultsIndex.displayName = "SearchResultsIndex";

export const dynamic = "force-dynamic";

export default SearchResultsIndex;
