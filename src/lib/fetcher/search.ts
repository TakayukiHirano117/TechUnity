const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

// 募集を検索するフェッチ関数
/**
 * 
 * @param q 検索クエリ
 * @returns 検索結果
 */
export const searchRecruits = async (q: string) => {
  const res = await fetch(`${baseURL}/api/search?q=${encodeURIComponent(q)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const recruits = await res.json();
  
  return recruits;
};
