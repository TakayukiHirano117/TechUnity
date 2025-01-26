import { headers } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

/**
 * 
 * @returns ユーザーが投稿した募集一覧
 */
export const getRecruitsWithUser = async () => {
  const res = await fetch(`${baseURL}/api/dashboard/recruits`, {
    // headers情報がないからgetTokenできなかったっぽい。
    headers: Object.fromEntries(headers()),
  });
  const recruits = await res.json();
  return recruits;
};
