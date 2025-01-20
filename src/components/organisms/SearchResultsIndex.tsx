import React from "react";

import RecruitList from "../molecules/RecruitList";

const SearchResultsIndex = async ({ q }: { q: string }) => {
  // APIたたく
  const res = await fetch(
    `http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
  );

  const results = await res.json();

  return <RecruitList recruits={results} />;
};

export default SearchResultsIndex;
