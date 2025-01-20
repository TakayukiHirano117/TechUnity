import { headers } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const getProfile = async () => {
  const res = await fetch(`${baseURL}/api/dashboard/profiles`, {
    headers: Object.fromEntries(headers()),
  });
  const profile = await res.json();
  return profile;
};

export const getRecruitsWithProfile = async (id: string) => {
  const res = await fetch(`${baseURL}/api/profiles/${id}`, {
    cache: "no-cache",
  });
  return res.json();
};
