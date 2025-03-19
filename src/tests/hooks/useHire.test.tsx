import { renderHook, act } from "@testing-library/react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useHire, HireResponse } from "@/hooks/useHire";

// swrのmutateをモック化
vi.mock("swr", () => ({
  mutate: vi.fn(),
}));

// useSWRMutationをモック化
vi.mock("swr/mutation", () => ({
  default: vi.fn(),
}));

describe("useHire hook", () => {
  const recruitId = "abc123";
  const userId = "user123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return toggleHire and isHireMutating", () => {
    // 成功時の trigger のモック
    const triggerMock = vi.fn(() => Promise.resolve({ success: true, isHired: true }));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useHire(recruitId));

    // toggleHire と isHireMutating が返されることを確認
    expect(result.current).toHaveProperty("toggleHire");
    expect(result.current).toHaveProperty("isHireMutating");
    expect(typeof result.current.toggleHire).toBe("function");
    expect(typeof result.current.isHireMutating).toBe("boolean");
  });

  it("should call useSWRMutation with correct parameters", () => {
    // useSWRMutation の呼び出しをモック
    const triggerMock = vi.fn(() => Promise.resolve({ success: true, isHired: true }));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    renderHook(() => useHire(recruitId));

    // useSWRMutation が正しいパラメータで呼ばれることを確認
    expect(useSWRMutation).toHaveBeenCalledWith(
      `/api/recruits/${recruitId}/hire`,
      expect.any(Function),
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );
  });

  it("should call mutate when toggleHire is successful", async () => {
    // onSuccess コールバックを取得するための変数
    let onSuccessCallback: (() => void) | undefined;
    
    // useSWRMutation の実装をモック
    (useSWRMutation as unknown as vi.Mock).mockImplementation(
      (url: string, fetcher: () => Promise<HireResponse>, options: { onSuccess: () => void }) => {
        onSuccessCallback = options.onSuccess;
        return {
          trigger: vi.fn(() => Promise.resolve({ success: true, isHired: true })),
          isMutating: false,
        };
      }
    );

    renderHook(() => useHire(recruitId));

    // onSuccess コールバックが設定されていることを確認
    expect(onSuccessCallback).toBeDefined();
    
    // onSuccess コールバックを実行
    if (onSuccessCallback) {
      onSuccessCallback();
    }

    // mutate が正しいパラメータで呼ばれることを確認
    expect(mutate).toHaveBeenCalledWith(`/api/dashboard/recruits`);
  });

  it("should call trigger with userId when toggleHire is called", async () => {
    // 成功時の trigger のモック
    const triggerMock = vi.fn(() => Promise.resolve({ success: true, isHired: true }));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useHire(recruitId));

    // toggleHire を呼び出す
    await act(async () => {
      await result.current.toggleHire({ userId });
    });

    // trigger が正しいパラメータで呼ばれることを確認
    expect(triggerMock).toHaveBeenCalledWith({ userId });
  });

  it("should handle error when toggleHire fails", async () => {
    // エラー時の trigger のモック
    const error = new Error("Failed to hire user");
    const triggerMock = vi.fn(() => Promise.reject(error));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useHire(recruitId));

    // toggleHire を呼び出し、エラーをキャッチ
    let caughtError;
    await act(async () => {
      try {
        await result.current.toggleHire({ userId });
      } catch (err) {
        caughtError = err;
      }
    });

    // エラーが発生することを確認
    expect(caughtError).toBe(error);
    
    // trigger が呼ばれることを確認
    expect(triggerMock).toHaveBeenCalled();
  });
});
