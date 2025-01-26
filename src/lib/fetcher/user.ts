import { headers } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

/**
 * 
 * @returns ログインしているユーザー情報
 */
export const getUser = async () => {
  const res = await fetch(`${baseURL}/api/user`, {
    cache: "no-store",
    headers: Object.fromEntries(headers()),
  });

  return res.json();
};
