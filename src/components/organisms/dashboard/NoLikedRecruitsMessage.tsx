import Image from "next/image";
import React from "react";

const NoLikedRecruitsMessage = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-slate-600">
      <h3>まだいいねした募集がありません。</h3>
      <Image
        src={"/undraw_engineering-team_13ax.svg"}
        width={300}
        height={300}
        alt="no-recruits"
        className="my-8"
      />
    </div>
  );
};

export default NoLikedRecruitsMessage;
