import React from "react";

import RecruitList from "@/components/molecules/recruits/RecruitList";
import { searchRecruits } from "@/lib/fetcher/search";

const SearchResultsIndex = async ({ q }: { q: string }) => {
  // APIたたく
  const results = await searchRecruits(encodeURIComponent(q));

  return <RecruitList recruits={results} />;
};

export default SearchResultsIndex;
