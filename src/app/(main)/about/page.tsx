import Image from "next/image";
import React from "react";

// 未実装です
const AboutPage = () => {
  return (
    <div className="px-8 flex flex-col gap-8 justify-center items-center h-screen container mx-auto max-width-[960px]">
      <div className="flex gap-2 items-center">
        <Image
          src={"/apple-touch-icon.png"}
          height={32}
          width={60}
          alt="logo"
        />
        <h1 className="font-bold text-3xl sm:text-6xl">TechUnity</h1>
      </div>
      <Image
        src="/undraw_development_s4gv.svg"
        width={400}
        height={400}
        alt="tech-unity"
      />
      <h2 className="font-bold text-slate-600">
        TechUnityはチーム開発メンバー募集プラットフォームです。
      </h2>
    </div>
  );
};

export default AboutPage;
