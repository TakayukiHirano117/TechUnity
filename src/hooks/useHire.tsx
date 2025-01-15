import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

// const HireUserForRecruit = async (url: string) => {
//   const response = await fetch(url, {
//     method: "POST",
//     cache: "no-store",
//   });
//   if (!response.ok) throw new Error("Failed to hire for the recruit");
//   return response.json();
// };

export const useHire = (id: string, handleHire: () => void) => {
  const { trigger: toggleHire, isMutating: isHireMutating } = useSWRMutation(
    `/api/recruits/${id}/hire`,
    handleHire,
    {
      onSuccess: () => {
        mutate(`/api/dashboard/recruits`);
      },
    },
  );

  return { toggleHire, isHireMutating };
};
