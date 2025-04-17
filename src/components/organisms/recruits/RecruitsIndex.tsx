import React from "react";

import RecruitList from "@/components/molecules/recruits/RecruitList";
import { getAllRecruits } from "@/lib/fetcher/recruit";

const RecruitsIndex = async ({ jwt }) => {
  const recruits = await getAllRecruits(jwt);

  return (
    <>
      <RecruitList recruits={recruits} />
      {/* スムーズにページ最上部に移動させたい場合CCにする必要あり。 */}
      <div className="flex gap-1 justify-center items-center">
        <span className="text-slate-600 text-sm">
          検索バーからもっと募集を探してみましょう
        </span>
        <button type="button" className=" animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 64 64"
          >
            <circle cx="32" cy="32" r="30" fill="#4fd1d9" />
            <path fill="#fff" d="M48 30.3L32 15L16 30.3h10.6V49h10.3V30.3z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default RecruitsIndex;
