import { renderHook, act } from "@testing-library/react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useApply } from "@/hooks/useApply";

// swrのmutateをモック化
vi.mock("swr", () => ({
  mutate: vi.fn(),
}));

// useSWRMutationをモック化
vi.mock("swr/mutation", () => ({
  default: vi.fn(),
}));

describe("useApply hook", () => {
  const recruitId = "abc123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return toggleApply and isApplyMutating", () => {
    // 成功時の trigger のモック
    const triggerMock = vi.fn(() => Promise.resolve({ success: true }));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useApply(recruitId));

    // toggleApply と isApplyMutating が返されることを確認
    expect(result.current).toHaveProperty("toggleApply");
    expect(result.current).toHaveProperty("isApplyMutating");
    expect(typeof result.current.toggleApply).toBe("function");
    expect(typeof result.current.isApplyMutating).toBe("boolean");
  });

  it("should call useSWRMutation with correct parameters", () => {
    // useSWRMutation の呼び出しをモック
    const triggerMock = vi.fn(() => Promise.resolve({ success: true }));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    renderHook(() => useApply(recruitId));

    // useSWRMutation が正しいパラメータで呼ばれることを確認
    expect(useSWRMutation).toHaveBeenCalledWith(
      `/api/recruits/${recruitId}/apply`,
      expect.any(Function),
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );
  });

  it("should call mutate when toggleApply is successful", async () => {
    // onSuccess コールバックを取得するための変数
    let onSuccessCallback: (() => void) | undefined;
    
    // useSWRMutation の実装をモック
    (useSWRMutation as unknown as vi.Mock).mockImplementation(
      (url: string, fetcher: () => Promise<{ success: boolean }>, options: { onSuccess: () => void }) => {
        onSuccessCallback = options.onSuccess;
        return {
          trigger: vi.fn(() => Promise.resolve({ success: true })),
          isMutating: false,
        };
      }
    );

    renderHook(() => useApply(recruitId));

    // onSuccess コールバックが設定されていることを確認
    expect(onSuccessCallback).toBeDefined();
    
    // onSuccess コールバックを実行
    if (onSuccessCallback) {
      onSuccessCallback();
    }

    // mutate が正しいパラメータで呼ばれることを確認
    expect(mutate).toHaveBeenCalledWith(`/api/recruits/${recruitId}`);
  });

  it("should call trigger when toggleApply is called", async () => {
    // 成功時の trigger のモック
    const triggerMock = vi.fn(() => Promise.resolve({ success: true }));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useApply(recruitId));

    // toggleApply を呼び出す
    await act(async () => {
      await result.current.toggleApply();
    });

    // trigger が呼ばれることを確認
    expect(triggerMock).toHaveBeenCalled();
  });
});
