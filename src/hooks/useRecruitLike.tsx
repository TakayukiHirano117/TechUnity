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

  const toggleLikeWithOptimisticUpdate = async (currentData: {
    isLiked: boolean;
    likes: { userId: string }[];
  }) => {
    // 楽観的UI更新: 現在のキャッシュを手動で更新
    mutate(
      `/api/recruits/${id}`,
      {
        ...currentData,
        isLiked: !currentData.isLiked, // 「いいね」をトグル
        likes: currentData.isLiked
          ? currentData.likes.filter(
              (like: { userId: string }) => like.userId !== "currentUserId",
            )
          : [...currentData.likes, { userId: "currentUserId" }],
      },
      false, // 再フェッチを防ぐ
    );

    try {
      // サーバーにリクエスト
      await toggleRecruitLike();
    } catch (error) {
      // リクエスト失敗時はキャッシュを元に戻す
      mutate(`/api/recruits/${id}`);
      console.error("Failed to toggle like:", error);
    }
  };

  return { toggleLikeWithOptimisticUpdate, isLikeRecruitMutating };
};
