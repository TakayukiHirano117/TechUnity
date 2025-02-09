import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import Footer from "@/components/organisms/footer/Footer";

describe(Footer, () => {
  it("Footer", () => {
    render(<Footer />);
  });
  // ロゴが表示されるか
  it("ロゴが表示されるか", () => {
    render(<Footer />);
    // alt属性が "logo" の画像が存在するか確認
    const logoImage = screen.getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
  });
  // ロゴをクリックしたらトップページに遷移するか

  it("ロゴをクリックしたらトップページに遷移するか", async () => {
    render(<Footer />);
    const logoLink = screen.getByRole("link", { name: /logo/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });
  // フッターのaboutのリンクが正しいか
  it("フッターのaboutのリンクが正しいか", () => {
    render(<Footer />);
    const aboutLink = screen.getByRole("link", { name: /TechUnityについて/i });
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  // フッターにコピーライトがあるか
  it("フッターにコピーライトがあるか", () => {
    render(<Footer />);
    const copyRight = screen.getByText(/TakayukiHirano117/i);
    expect(copyRight).toBeInTheDocument();
  });

  // コピーライトのhrefが正しいか
  it("コピーライトのhrefが正しいか", () => {
    render(<Footer />);
    const authorName = screen.getByRole("link", { name: /TakayukiHirano117/i });
    expect(authorName).toHaveAttribute(
      "href",
      "https://github.com/TakayukiHirano117",
    );
  });
});
