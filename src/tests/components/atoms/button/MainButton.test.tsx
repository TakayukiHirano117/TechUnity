import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import MainButton from "@/components/atoms/button/MainButton";

describe("MainButton Component", () => {
  it("正常にボタンがレンダリングされる", () => {
    render(<MainButton>Test</MainButton>);
    expect(screen.getByRole("button", { name: "Test" })).toBeInTheDocument();
  });

  it("classNameとvariantをpropsから渡せるか", () => {
    render(
      <MainButton className="custom-class" variant="outline">
        Test
      </MainButton>,
    );
    const button = screen.getByRole("button", { name: "Test" });

    expect(button).toHaveClass("custom-class"); // Tailwindクラスなどが適用されるか
  });

  it("クリックしたらonClickが実行されるか", async () => {
    const handleClick = vi.fn();
    render(<MainButton onClick={handleClick}>Click</MainButton>);

    await userEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("refを正常に渡せるか", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<MainButton ref={ref}>Ref Test</MainButton>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
