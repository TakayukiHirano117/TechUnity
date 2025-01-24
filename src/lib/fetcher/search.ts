const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const searchRecruits = async (q: string) => {
  const res = await fetch(`${baseURL}/api/search?q=${encodeURIComponent(q)}`);
  console.log(baseURL)

  return res.json();
};
