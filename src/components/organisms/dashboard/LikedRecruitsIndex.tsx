import { headers } from "next/headers";
import React from "react";
import LikedRecruits from "@/components/molecules/dashboard/LikedRecruits";
import { DashBoardRecruit } from "@/types/types";

// 本番環境と開発環境でURLを変更する
const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const revalidate = 0;

// いいねした募集を取得する関数
const getLikedRecruits = async (): Promise<DashBoardRecruit[]> => {
  const res = await fetch(`${baseURL}/api/dashboard/liked-recruits`, {
    headers: Object.fromEntries(headers()),
    cache: "no-store",
  });
  const recruits = await res.json();
  return recruits;
};

// いいねした募集を取得するコンポーネント
const LikedRecruitsIndex = async () => {
  const recruits = await getLikedRecruits();

  return <LikedRecruits recruits={recruits} />;
};

export const dynamic = "force-dynamic";

export default LikedRecruitsIndex;
