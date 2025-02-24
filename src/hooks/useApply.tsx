import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

// 応募APIをたたく関数
const applyForApplication = async (url: string) => {
  const response = await fetch(url, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to apply for the recruit");
  return response.json();
};

export const useApply = (id: string) => {
  const { trigger: toggleApply, isMutating: isApplyMutating } = useSWRMutation(
    `/api/recruits/${id}/apply`,
    applyForApplication,
    {
      onSuccess: () => {
        mutate(`/api/recruits/${id}`);
      },
    },
  );

  return { toggleApply, isApplyMutating };
};
