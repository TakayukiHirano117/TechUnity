// 本番環境・開発環境のURLを切り替える
const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

// 募集を作成
export const createRecruit = async (data: {
  title: string;
  content: string;
  isPublished: boolean;
}) => {
  await fetch("/api/recruits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 募集を削除
export const deleteRecruit = async (id: string) => {
  const response = await fetch(`/api/recruit/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return response.json();
};

// 募集を更新
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
export const getAllRecruits = async () => {
  const res = await fetch(`${baseURL}/api/recruits`, {
    cache: "no-store",
  });

  return res.json();
};

// 編集対象の募集詳細を取得
export const getEditRecruitDetail = async (id: string) => {
  const response = await fetch(`/api/recruit/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  return response.json();
};

// 募集詳細を取得
export const getRecruitDetail = async (id: string) => {
  const response = await fetch(`${baseURL}/api/recruits/${id}`, {
    cache: "no-cache",
  });
  return response.json();
};
