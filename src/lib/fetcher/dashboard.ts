import { headers } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const getRecruitsWithUser = async () => {
  const res = await fetch(
    `${baseURL}/api/dashboard/recruits`,
    {
      // headers情報がないからgetTokenできなかったっぽい。
      headers: Object.fromEntries(headers()),
    },
  );
  // console.log(Object.fromEntries(headers()));
  const recruits = await res.json();
  // console.log(recruits)
  return recruits;
};
