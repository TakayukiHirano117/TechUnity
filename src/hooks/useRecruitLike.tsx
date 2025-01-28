import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

// いいねAPIをたたく関数
const likeRecruit = async (url: string) => {
  const response = await fetch(url, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to like recruit");
  return response.json();
};

// いいね機能のカスタムフック
export const useRecruitLike = (id: string) => {
  const { trigger: toggleRecruitLike, isMutating: isLikeRecruitMutating } =
    useSWRMutation(`/api/recruits/${id}/like`, likeRecruit, {
      onSuccess: () => {
        mutate(`/api/recruits/${id}`);
      },
    });

  const toggleLikeWithOptimisticUpdate = async (currentData: {
    creator: { id: string };
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
              (like: { userId: string }) =>
                like.userId !== currentData.creator.id,
            )
          : [...currentData.likes, { userId: currentData.creator.id }],
      },
      false, // 再フェッチを防ぐ
    );

    try {
      await toggleRecruitLike();
    } catch (error) {
      // リクエスト失敗時はキャッシュを元に戻す
      mutate(`/api/recruits/${id}`);
      console.error("Failed to toggle like:", error);
    }
  };

  return { toggleLikeWithOptimisticUpdate, isLikeRecruitMutating };
};
