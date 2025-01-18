import { headers } from "next/headers";

export const getProfile = async () => {
  const res = await fetch(
    "https://tech-unity.vercel.app/api/dashboard/profiles",
    {
      // headers情報がないからgetTokenできなかったっぽい。
      headers: Object.fromEntries(headers()),
    },
  );
  const profile = await res.json();
  return profile;
};

export const getRecruitsWithProfile = async (id: string) => {
  const res = await fetch(`https://tech-unity.vercel.app/api/profiles/${id}`, {
    // headers情報がないからgetTokenできなかったっぽい。
    headers: Object.fromEntries(headers()),
  });
  return res.json();
};
