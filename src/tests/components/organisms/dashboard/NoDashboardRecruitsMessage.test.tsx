import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Next.jsのコンポーネントをモック
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="next-image"
    />
  ),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}));

// MainButtonコンポーネントをモック
vi.mock("@/components/atoms/button/MainButton", () => ({
  __esModule: true,
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button className={className} data-testid="main-button">
      {children}
    </button>
  ),
}));

// 実際のNoDashboardRecruitsMessageコンポーネントをインポート
import NoDashboardRecruitsMessage from "@/components/organisms/dashboard/NoDashboardRecruitsMessage";

describe("NoDashboardRecruitsMessage Component", () => {
  it("renders the no dashboard recruits message with image and button", () => {
    render(<NoDashboardRecruitsMessage />);
    
    // メッセージが表示されていることを確認
    const heading = screen.getByText("まだ募集がありません。");
    expect(heading).toBeInTheDocument();
    
    const subText = screen.getByText("募集を作成してみましょう!");
    expect(subText).toBeInTheDocument();
    
    // イメージが表示されていることを確認
    const image = screen.getByTestId("next-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/undraw_engineering-team_13ax.svg");
    expect(image).toHaveAttribute("alt", "no-recruits");
    expect(image).toHaveAttribute("width", "300");
    expect(image).toHaveAttribute("height", "300");
    expect(image).toHaveClass("my-8");
    
    // ボタンが表示されていることを確認
    const button = screen.getByTestId("main-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("font-bold");
    
    // リンクが正しく設定されていることを確認
    const link = screen.getByTestId("next-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/recruits/create");
    expect(link).toHaveTextContent("募集する");
  });
});
