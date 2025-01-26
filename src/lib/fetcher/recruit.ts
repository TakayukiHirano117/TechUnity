// 本番環境・開発環境のURLを切り替える
const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

// 募集を作成
/**
 * 
 * @param data 募集タイトル、内容、公開設定
 * @returns 作成した募集データ
 */
export const createRecruit = async (data: {
  title: string;
  content: string;
  isPublished: boolean;
}) => {
  const res = await fetch("/api/recruits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// 募集を削除
/**
 * 
 * @param id 募集ID
 * @returns 削除した募集データ
 */
export const deleteRecruit = async (id: string) => {
  const response = await fetch(`/api/recruits/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return response.json();
};

// 募集を更新
/**
 * 
 * @param id 募集ID
 * @param data 募集タイトル、内容、公開設定
 * @returns 更新した募集データ
 */
export const updateRecruit = async (
  id: string,
  data: {
    title: string;
    content: string;
    isPublished: boolean;
  },
) => {
  const res = await fetch(`/api/recruits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// 募集一覧を取得
/**
 * 
 * @returns 募集一覧
 */
export const getAllRecruits = async () => {
  const res = await fetch(`${baseURL}/api/recruits`, {
    cache: "no-store",
  });

  return res.json();
};

// 編集対象の募集詳細を取得
/**
 * 
 * @param id 募集ID
 * @returns 募集詳細
 */
export const getEditRecruitDetail = async (id: string) => {
  const res = await fetch(`${baseURL}/api/recruit/${id}/edit`, {
    cache: "no-store",
    // headers: Object.fromEntries(headers()),
  });

  const data = await res.json();

  if (data.redirect) {
    return { redirect: data.redirect };
  }

  return data;
};

// 募集詳細を取得
/**
 * 
 * @param id 募集ID
 * @returns 募集詳細
 */
export const getRecruitDetail = async (id: string) => {
  const response = await fetch(`${baseURL}/api/recruits/${id}`, {
    cache: "no-cache",
  });
  return response.json();
};
