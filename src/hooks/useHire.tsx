import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

// 成功時のレスポンス型
export type HireResponseSuccess = {
  success: true;
  isHired: boolean;
};

// エラー時のレスポンス型
export type HireResponseError = {
  success?: false;
  error: string;
};

export type HireResponse = HireResponseSuccess | HireResponseError;

const hireUserForRecruit = async (
  url: string,
  { arg }: { arg: { userId: string } },
): Promise<HireResponse> => {
  console.log(arg.userId)
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Unknown error");
    }

    return res.json(); // レスポンスを返却
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useHire = (id: string) => {
  const { trigger: toggleHire, isMutating: isHireMutating } = useSWRMutation<
    HireResponse,
    Error,
    `/api/recruits/${string}/hire`,
    { userId: string }
  >(`/api/recruits/${id}/hire`, hireUserForRecruit, {
    onSuccess: () => {
      mutate(`/api/dashboard/recruits`);
    },
  });

  return { toggleHire, isHireMutating };
};
