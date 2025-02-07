import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecruitCard from "@/components/molecules/card/RecruitCard";
import { RecruitCardProps } from "@/types/types";

describe("RecruitCard Component", () => {
  const props: RecruitCardProps = {
    id: 1,
    title: "募集タイトル",
    authorName: "テストユーザー",
    avatarImageSrc: "/avatar.png",
    publishedAt: "2024-02-01",
    likes: [{ id: "1", userId: "1", recruitId: "1" }],
    authorId: "user123",
    applications: [{ id: "1", userId: "1", recruitId: "1" }],
    hires: [{ id: "1", userId: "1", recruitId: "1" }],
  };

  it("正常にレンダリングされる", () => {
    render(<RecruitCard {...props} />);
    expect(screen.getByText("募集タイトル")).toBeInTheDocument();
  });

  it("タイトルのリンクが正しく表示される", () => {
    render(<RecruitCard {...props} />);
    const titleLink = screen.getByRole("link", { name: "募集タイトル" });
    expect(titleLink).toHaveAttribute("href", "/recruits/1");
  });

  it("著者名とプロフィールページのリンクが正しく表示される", () => {
    render(<RecruitCard {...props} />);
    const authorLink = screen.getByRole("link", { name: "テストユーザー" });
    expect(authorLink).toHaveAttribute("href", "/profiles/user123");
  });

  it("投稿日が yyyy/MM/dd 形式で表示される", () => {
    render(<RecruitCard {...props} />);
    expect(screen.getByText("2024/02/01")).toBeInTheDocument();
  });

  //   it("応募数、いいね数、採用数が正しく表示される", () => {
  //     render(<RecruitCard {...props} />);

  //     // 応募数
  //     expect(screen.getByText("1")).toBeInTheDocument();

  //     // いいね数
  //     expect(screen.getByText("1")).toBeInTheDocument();

  //     // 採用数
  //     expect(screen.getByText("1")).toBeInTheDocument();
  //   });
});
