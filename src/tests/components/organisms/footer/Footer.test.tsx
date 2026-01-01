import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Next.jsのコンポーネントをモック
/* eslint-disable @next/next/no-img-element */
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
/* eslint-enable @next/next/no-img-element */

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, target, rel }: { href: string; children: React.ReactNode; target?: string; rel?: string }) => (
    <a href={href} target={target} rel={rel} data-testid="next-link">
      {children}
    </a>
  ),
}));

// 実際のFooterコンポーネントをインポート
import Footer from "@/components/organisms/footer/Footer";

describe("Footer Component", () => {
  it("renders the footer with logo and links", () => {
    render(<Footer />);
    
    // ロゴが表示されていることを確認
    const logoImage = screen.getByTestId("next-image");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/Logo.png");
    expect(logoImage).toHaveAttribute("alt", "logo");
    
    // リンクが正しく設定されていることを確認
    const links = screen.getAllByTestId("next-link");
    expect(links.length).toBeGreaterThan(0);
    
    // ホームへのリンクが存在することを確認
    const homeLink = links.find(link => link.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
    
    // GitHubへのリンクが存在することを確認
    const githubLink = links.find(link => link.getAttribute("href") === "https://github.com/TakayukiHirano117/TechUnity");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the footer sections with correct headings", () => {
    render(<Footer />);
    
    // 各セクションのヘッダーが表示されていることを確認
    const aboutHeading = screen.getByText("About");
    expect(aboutHeading).toBeInTheDocument();
    
    const guidesHeading = screen.getByText("Guides");
    expect(guidesHeading).toBeInTheDocument();
    
    const linksHeading = screen.getByText("Links");
    expect(linksHeading).toBeInTheDocument();
    
    const legalHeading = screen.getByText("Legal");
    expect(legalHeading).toBeInTheDocument();
  });

  it("renders the copyright information with current year", () => {
    render(<Footer />);
    
    // 著作権情報の一部が表示されていることを確認
    // 著作権情報を含むテキストを検索
    const copyrightText = screen.getByText((content) => {
      return /©/.test(content);
    });
    expect(copyrightText).toBeInTheDocument();
    
    // 著作者へのリンクが正しく設定されていることを確認
    const authorLink = screen.getByText("TakayukiHirano117");
    expect(authorLink).toBeInTheDocument();
    expect(authorLink.closest("a")).toHaveAttribute("href", "https://github.com/TakayukiHirano117");
    expect(authorLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(authorLink.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
    
    // "All Rights Reserved"のテキストが表示されていることを確認
    const rightsText = screen.getByText((content) => content.includes("All Rights Reserved"));
    expect(rightsText).toBeInTheDocument();
  });
});
