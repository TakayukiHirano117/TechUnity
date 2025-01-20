import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

const likeRecruit = async (url: string) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to like recruit");
  return response.json();
};

export const useRecruitLike = (id: string) => {
  const { trigger: toggleRecruitLike, isMutating: isLikeRecruitMutating } =
    useSWRMutation(`/api/recruits/${id}/like`, likeRecruit, {
      onSuccess: () => {
        mutate(`/api/recruits/${id}`);
      },
    });

  return { toggleRecruitLike, isLikeRecruitMutating };
};
