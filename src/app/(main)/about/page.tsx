import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ActionButtons from "./components/ActionButtons";

const AboutPage = () => {
  const features = [
    {
      title: "プロジェクトを見つける",
      description:
        "あなたのスキルや興味に合ったプロジェクトを簡単に見つけることができます。",
      icon: "/undraw_job-offers_55y0.svg",
    },
    {
      title: "チームを結成する",
      description: "あなたのプロジェクトに最適なチームメンバーを募集できます。",
      icon: "/undraw_team-up_qeem.svg",
    },
    {
      title: "スキルを磨く",
      description: "実際のプロジェクトで経験を積み、技術力を向上させましょう。",
      icon: "/undraw_development_s4gv.svg",
    },
  ];

  const techStack = [
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "PHP",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    },
    {
      name: "Ruby",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    },
    {
      name: "Go",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    },
    {
      name: "C#",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    },
    {
      name: "Swift",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    },
    {
      name: "Kotlin",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    },
    {
      name: "Rust",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    },
    {
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "AWS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* ヒーローセクション */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/Logo.png"
              height={60}
              width={60}
              alt="TechUnity Logo"
              className="rounded-lg"
            />
            <h1 className="font-bold text-4xl sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TechUnity
            </h1>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
            チーム開発メンバー募集プラットフォーム
          </h2>
          <p className="text-lg text-slate-600 max-w-xl">
            TechUnityは、プログラマー、デザイナー、プロジェクトマネージャーなど、
            様々な役割のチームメンバーを見つけ、素晴らしいプロジェクトを一緒に作り上げるための
            プラットフォームです。
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center">
                <div className="w-10 h-10 relative">
                  <Image
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-xs mt-1">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/undraw_creative-team_wfty.svg"
            width={400}
            height={400}
            alt="Creative Team"
            className="w-full max-w-md"
            priority
          />
        </div>
      </section>

      {/* ミッションセクション */}
      <section className="mb-20">
        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-slate-800">
              私たちのミッション
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              開発者同士の出会いとコラボレーションを促進します
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              TechUnityは、個人の開発者がチームを見つけ、共に学び、成長するための場所です。
              私たちは、技術的なスキルだけでなく、コミュニケーションやチームワークの重要性も
              理解しています。一人では難しいプロジェクトも、チームなら実現できることがあります。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 特徴セクション */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          TechUnityの特徴
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="h-48 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    width={200}
                    height={200}
                    alt={feature.title}
                    className="w-full max-w-[200px]"
                  />
                </div>
                <CardTitle className="text-xl font-semibold text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 使い方セクション */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">
            TechUnityの使い方
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">アカウント作成</h3>
                  <p>
                    簡単な登録プロセスでアカウントを作成します。あなたのスキルや経験を入力しましょう。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    プロジェクトを探す・作る
                  </h3>
                  <p>
                    興味のあるプロジェクトを見つけるか、自分のプロジェクトを作成してメンバーを募集します。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    応募・コミュニケーション
                  </h3>
                  <p>
                    プロジェクトに応募したり、メンバーとコミュニケーションを取りましょう。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    チーム開発を始める
                  </h3>
                  <p>
                    チームが揃ったら、一緒に素晴らしいプロジェクトを作り上げましょう！
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/undraw_engineering-team_13ax.svg"
                width={400}
                height={400}
                alt="Engineering Team"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="text-center">
        <Card className="border-none shadow-xl bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-800">
              あなたも始めてみませんか？
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              新しいプロジェクトとの出会いがあなたを待っています
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <p className="text-lg text-slate-700 max-w-2xl">
              TechUnityで、あなたのスキルを活かせるプロジェクトを見つけるか、
              あなたのアイデアを実現するためのチームメンバーを募集しましょう。
            </p>
            <ActionButtons />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AboutPage;
