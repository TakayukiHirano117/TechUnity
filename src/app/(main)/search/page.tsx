// "use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import SearchResultsIndex from "@/components/organisms/SearchResultsIndex";

type Recruit = {
  id: number;
  title: string;
  content: string;
};

const SearchResults = ({ searchParams }: { searchParams: { q: string } }) => {
  // const searchParams = useSearchParams();
  // const query = searchParams.get("q") || ""; // クエリパラメータから検索ワードを取得
  // const [results, setResults] = useState<Recruit[]>([]);

  // useEffect(() => {
  //   if (query) {
  //     // API呼び出し
  //     const fetchResults = async () => {
  //       const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  //       if (res.ok) {
  //         const data = await res.json();
  //         setResults(data);
  //       } else {
  //         console.error("Failed to fetch search results");
  //       }
  //     };
  //     fetchResults();
  //   }
  // }, [query]);

  return (
    // <div>
    //   <h1>検索結果: {query}</h1>
    //   {results.length > 0 ? (
    //     <ul>
    //       {results.map((recruit) => (
    //         <li key={recruit.id}>
    //           <h2>{recruit.title}</h2>
    //           <p>{recruit.content}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>該当する募集は見つかりませんでした。</p>
    //   )}
    // </div>
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
