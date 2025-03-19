import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// HeaderIndexコンポーネントをモック
vi.mock("@/components/organisms/header/HeaderIndex", () => ({
  __esModule: true,
  default: () => <div data-testid="header-index-mock">HeaderIndex Mock</div>,
}));

// Next.jsのコンポーネントをモック
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
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

// react-hot-toastのモック
vi.mock("react-hot-toast", () => ({
  Toaster: () => <div data-testid="toaster-mock">Toaster Mock</div>,
}));

// 実際のHeaderコンポーネントをインポート
import Header from "@/components/organisms/header/Header";

describe("Header Component", () => {
  it("renders the header with logo and navigation", () => {
    render(<Header />);
    
    // ロゴが表示されていることを確認
    const logoImage = screen.getByTestId("next-image");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/Logo.png");
    expect(logoImage).toHaveAttribute("alt", "logo");
    
    // リンクが正しく設定されていることを確認
    const logoLink = screen.getByTestId("next-link");
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
    
    // Toasterコンポーネントが表示されていることを確認
    const toaster = screen.getByTestId("toaster-mock");
    expect(toaster).toBeInTheDocument();
  });

  it("renders the HeaderIndex component inside Suspense", () => {
    render(<Header />);
    
    // HeaderIndexコンポーネントがレンダリングされていることを確認
    const headerIndex = screen.getByTestId("header-index-mock");
    expect(headerIndex).toBeInTheDocument();
    expect(headerIndex).toHaveTextContent("HeaderIndex Mock");
  });
});
