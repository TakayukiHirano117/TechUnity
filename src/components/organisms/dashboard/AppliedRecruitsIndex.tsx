import { headers } from "next/headers";
import React from "react";
import AppliedRecruitList from "@/components/molecules/dashboard/AppliedRecruitList";
import { DashBoardRecruit } from "@/types/types";
import NoAppliedRecruitMessage from "./NoAppliedRecruitMessage";

// 本番環境と開発環境でURLを変更する
const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const revalidate = 0;

// 応募した募集を取得する関数
const getAppliedRecruits = async (): Promise<DashBoardRecruit[]> => {
  const res = await fetch(`${baseURL}/api/dashboard/applied-recruits`, {
    headers: Object.fromEntries(headers()),
    cache: "no-store",
  });
  const recruits = await res.json();
  return recruits;
};

// 応募した募集を取得するコンポーネント
const AppliedRecruitsIndex = async () => {
  const recruits = await getAppliedRecruits();

  return recruits.length > 0 ? (
    <AppliedRecruitList recruits={recruits} />
  ) : (
    <NoAppliedRecruitMessage />
  );
};

export const dynamic = "force-dynamic";

export default AppliedRecruitsIndex;
