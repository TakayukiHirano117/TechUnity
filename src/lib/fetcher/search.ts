const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

// 募集を検索するフェッチ関数
/**
 * 
 * @param q 検索クエリ
 * @param page ページ番号
 * @returns 検索結果
 */
export const searchRecruits = async (q: string, page: string) => {
  const res = await fetch(`${baseURL}/api/search?q=${encodeURIComponent(q)}&page=${encodeURIComponent(page)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const recruits = await res.json();
  
  return recruits;
};
