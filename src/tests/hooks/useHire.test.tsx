import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useHire } from "@/hooks/useHire";
import useSWRMutation from "swr/mutation";
import * as swrModule from "swr"; // mutate を監視するために swrModule をインポート

// ファイルのトップレベルで1回だけスパイを定義する
const mutateSpy = vi
  .spyOn(swrModule, "mutate")
  .mockImplementation(() => Promise.resolve());

describe("useHire hook", () => {
  const recruitId = "1";
  const userId = "123";

  beforeEach(() => {
    vi.clearAllMocks();
    // ※ ここで再度 vi.spyOn は呼ばない
  });

  it("should call API successfully and trigger mutate", async () => {
    // 成功時の trigger のモック
    const triggerMock = vi.fn(() =>
      Promise.resolve({ success: true, isHired: true }),
    );
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useHire(recruitId));

    await act(async () => {
      await result.current.toggleHire({ userId });
    });

    // APIが正しく呼ばれたことを確認
    expect(triggerMock).toHaveBeenCalledWith({ userId });

    // mutate が呼ばれるまで待機して検証
    await waitFor(() => {
      expect(mutateSpy).toHaveBeenCalledWith("/api/dashboard/recruits");
    });
  });

  it("should not call mutate when API request fails", async () => {
    const error = new Error("Failed to hire user");
    // 失敗時の trigger のモック
    const triggerMock = vi.fn(() => Promise.reject(error));
    (useSWRMutation as unknown as vi.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => useHire(recruitId));

    await act(async () => {
      try {
        await result.current.toggleHire({ userId });
      } catch (err) {
        // エラーをキャッチしてスルー
      }
    });

    // APIが呼ばれたことを確認
    expect(triggerMock).toHaveBeenCalledWith({ userId });

    // mutate が **呼ばれていない** ことを検証
    expect(mutateSpy).not.toHaveBeenCalled();
  });
});
