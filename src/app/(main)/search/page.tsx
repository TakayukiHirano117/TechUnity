import React, { Suspense } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";

const SearchResultsIndex = React.lazy(
  () => import("@/components/organisms/SearchResultsIndex"),
);

const SearchResults = ({ searchParams }: { searchParams: { q: string } }) => {

  return (
    
    <div className="bg-slate-100">
      <div className="container max-w-[960px] min-h-screen mx-auto p-8 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Results</h1>
          {/* <span>{searchParams.q}</span> */}
        </div>
        <Suspense
          fallback={
            <div className="flex flex-col space-y-3 z-50 h-screen items-center mt-3">
              <LoadingIcon
                width="40"
                height="40"
                className="animate-spin text-slate-600"
              />
            </div>
          }
        >
          <SearchResultsIndex q={searchParams.q} />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchResults;
