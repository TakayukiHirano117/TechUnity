import { headers } from "next/headers";

export const getProfile = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL + "api/dashboard/profiles" ||
      "http://localhost:3000/api/dashboard/profiles",
    {
      headers: Object.fromEntries(headers()),
    },
  );
  const profile = await res.json();
  return profile;
};

export const getRecruitsWithProfile = async (id: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL + `api/profiles/${id}` ||
      `http://localhost:3000/api/profiles/${id}`,
  );
  return res.json();
};
