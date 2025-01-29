import Image from "next/image";
import Link from "next/link";
import React from "react";

import MainButton from "@/components/atoms/button/MainButton";

const NoDashboardRecruitsMessage = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-slate-600">
      <h3>まだ募集がありません。</h3>
      <p>募集を作成してみましょう!</p>
      <Image
        src={"/undraw_engineering-team_13ax.svg"}
        width={300}
        height={300}
        alt="no-recruits"
        className="my-8"
      />
      <div>
        <MainButton className="rounded-full font-bold">
          <Link href={"/recruits/create"}>募集する</Link>
        </MainButton>
      </div>
    </div>
  );
};

export default NoDashboardRecruitsMessage;
