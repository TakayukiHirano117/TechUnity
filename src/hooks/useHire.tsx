import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

// APIリクエスト関数
const hireUserForRecruit = async (
  url: string,
  { arg }: { arg: { userId: string } },
) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg), // 引数を直接渡す
    });

    if (!res.ok) {
      throw new Error(`Failed to hire user: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error; // エラーを上位でキャッチ
  }
};

// カスタムフック
export const useHire = (id: string) => {
  const { trigger: toggleHire, isMutating: isHireMutating } = useSWRMutation(
    `/api/recruits/${id}/hire`,
    hireUserForRecruit,
    {
      onSuccess: () => {
        mutate(`/api/dashboard/recruits`); // 成功時にキャッシュを更新
      },
    },
  );

  // 関数と状態を返す
  return { toggleHire, isHireMutating };
};
