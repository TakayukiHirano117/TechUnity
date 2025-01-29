import Image from "next/image";
import React from "react";

const NoAppliedRecruitMessage = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-slate-600">
      <h3>まだ応募した募集がありません。</h3>
      <Image
        src={"/undraw_job-offers_55y0.svg"}
        width={300}
        height={300}
        alt="no-recruits"
        className="my-8"
      />
    </div>
  );
};

export default NoAppliedRecruitMessage;
