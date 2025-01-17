import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

const hireUserForRecruit = async (
  url: string,
  { arg }: { arg: { userId: string } }, // SWRMutation が期待する型に合わせる
) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg), // arg のまま送信
    });

    if (!res.ok) {
      throw new Error(`Failed to hire user: ${res.statusText}`);
    }

    console.log("ToggleHire called with:", arg);

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// カスタムフック
export const useHire = (id: string) => {
  const { trigger: toggleHire, isMutating: isHireMutating } = useSWRMutation<
    any,
    any,
    `/api/recruits/${string}/hire`,
    { userId: string }
  >(`/api/recruits/${id}/hire`, hireUserForRecruit, {
    onSuccess: () => {
      mutate(`/api/dashboard/recruits`);
    },
  });

  return { toggleHire, isHireMutating };
};