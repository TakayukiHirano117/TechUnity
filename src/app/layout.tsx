import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextAuthSessionProvider from "@/components/atoms/auth/NextAuthSessionProvider";
import ProgressBar from "@/components/atoms/progress/ProgressBar";
import DifyChatbot from "@/components/molecules/dify/ChatbotArea";
import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TechUnity | チーム開発メンバー募集プラットフォーム",
  description: "TechUnityはチーム開発メンバー募集プラットフォームです。",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "TechUnity",
    "チーム開発",
    "メンバー募集",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React",
    "Vercel",
    "Prisma",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://tech-unity-dev.com/",
    siteName: "TechUnity",
    title: "TechUnity | チーム開発メンバー募集プラットフォーム",
    description:
      "TechUnityはチーム開発メンバー募集プラットフォームです。エンジニア、デザイナー、プロジェクトマネージャーなど、様々な役割のメンバーを募集できます。",
    images: [
      {
        url: "https://tech-unity-dev.com/Logo.png",
        width: 1200,
        height: 630,
        alt: "TechUnity | チーム開発メンバー募集プラットフォーム",
      },
    ],
  },
  twitter: {
    site: "@TechUnity",
    card: "summary_large_image",
    title: "TechUnity | チーム開発メンバー募集プラットフォーム",
    description:
      "TechUnityはチーム開発メンバー募集プラットフォームです。エンジニア、デザイナー、プロジェクトマネージャーなど、様々な役割のメンバーを募集できます。",
    images: ["https://tech-unity-dev.com/Logo.png"],
    creator: "TakayukiHirano117",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <DifyChatbot />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-[screen]`}
      >
        <NextAuthSessionProvider>
          <Header />
          {/* <HeaderWrapper /> */}
          <ProgressBar>
            {children}
            <Toaster />
          </ProgressBar>
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
