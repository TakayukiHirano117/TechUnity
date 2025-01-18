import { headers } from "next/headers";

export const getRecruitsWithUser = async () => {
  const res = await fetch(
    "https://tech-unity-mfceb5s69-takayukihirano117s-projects-caaa37ec.vercel.app/api/dashboard/recruits",
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
