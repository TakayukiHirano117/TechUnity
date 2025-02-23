import { renderHook, act } from "@testing-library/react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { describe, it, expect, beforeEach } from "vitest";
import { useRecruitLike } from "@/hooks/useRecruitLike";

// swrのmutateをモック化
vi.mock("swr", () => ({
  mutate: vi.fn(),
}));

// useSWRMutationをモック化
vi.mock("swr/mutation", () => ({
  default: vi.fn(),
}));

describe("useRecruitLike hook", () => {
  const recruitId = "abc123";
  // currentDataのサンプル
  const currentData = {
    creator: { id: "creator1" },
    isLiked: false,
    likes: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should optimistically update and trigger like API successfully", async () => {
    // 成功時の trigger のモック
    const triggerMock = vi.fn(() => Promise.resolve({ success: true }));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useRecruitLike(recruitId));

    await act(async () => {
      await result.current.toggleLikeWithOptimisticUpdate(currentData);
    });

    // 楽観的にキャッシュを更新する mutate の呼び出しを検証
    expect(mutate).toHaveBeenCalledWith(
      `/api/recruits/${recruitId}`,
      {
        ...currentData,
        isLiked: !currentData.isLiked, // false -> true
        likes: [...currentData.likes, { userId: currentData.creator.id }],
      },
      false, // 再フェッチを抑制
    );

    // trigger が呼ばれていることを検証
    expect(triggerMock).toHaveBeenCalled();
  });

  it("should roll back update when trigger fails", async () => {
    const error = new Error("Failed to like recruit");
    // エラー時の trigger のモック
    const triggerMock = vi.fn(() => Promise.reject(error));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useRecruitLike(recruitId));

    await act(async () => {
      await result.current.toggleLikeWithOptimisticUpdate(currentData);
    });

    // trigger 失敗時はロールバックとして mutate が再度呼ばれる
    expect(mutate).toHaveBeenCalledWith(`/api/recruits/${recruitId}`);
  });
});
