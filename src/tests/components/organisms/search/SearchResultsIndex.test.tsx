import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

// searchRecruitsをモック
vi.mock("@/lib/fetcher/search", () => ({
  searchRecruits: vi.fn().mockImplementation((q, page) => {
    // ページ番号が不正な場合
    if (page === "0" || page === "999") {
      return {
        recruits: [],
        totalCount: 20,
        totalPages: 2,
        currentPage: parseInt(page, 10),
      };
    }
    
    // 正常なページ番号の場合
    return {
      recruits: [
        {
          id: "1",
          title: "React Developer",
          content: "React Developer wanted",
          description: "React Developer wanted",
          created_at: "2022-01-01T00:00:00.000Z",
          updated_at: "2022-01-01T00:00:00.000Z",
          creatorId: "1",
          is_published: true,
        },
        {
          id: "2",
          title: "Vue Developer",
          content: "Vue Developer wanted",
          description: "Vue Developer wanted",
          created_at: "2022-01-02T00:00:00.000Z",
          updated_at: "2022-01-02T00:00:00.000Z",
          creatorId: "2",
          is_published: true,
        },
      ],
      totalCount: 20,
      totalPages: 2,
      currentPage: parseInt(page, 10),
    };
  }),
}));

// RecruitListコンポーネントをモック
vi.mock("@/components/molecules/recruits/RecruitList", () => ({
  __esModule: true,
  default: ({ recruits }: { recruits: Array<{ id: string; title: string; content: string; description: string; created_at: string; updated_at: string; creatorId: string; is_published: boolean }> }) => (
    <div data-testid="recruit-list-mock">
      {recruits.map((recruit: { id: string; title: string }) => (
        <div key={recruit.id} data-testid={`recruit-item-${recruit.id}`}>
          {recruit.title}
        </div>
      ))}
    </div>
  ),
}));

// Reactのmemoをモック
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    memo: (component: React.ComponentType) => component,
  };
});

// Paginationコンポーネントをモック
vi.mock("@/components/ui/pagination", () => ({
  Pagination: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="pagination" className={className}>
      {children}
    </div>
  ),
  PaginationContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pagination-content">{children}</div>
  ),
  PaginationItem: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="pagination-item" className={className}>
      {children}
    </div>
  ),
  PaginationLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="pagination-link">
      {children}
    </a>
  ),
  PaginationEllipsis: () => <span data-testid="pagination-ellipsis">...</span>,
  PaginationNext: ({ href }: { href: string }) => (
    <a href={href} data-testid="pagination-next">
      Next
    </a>
  ),
  PaginationPrevious: ({ href }: { href: string }) => (
    <a href={href} data-testid="pagination-previous">
      Previous
    </a>
  ),
}));

// SearchResultsIndexコンポーネントをインポート
import SearchResultsIndex from "@/components/organisms/search/SearchResultsIndex";

describe("SearchResultsIndex Component", () => {
  it("renders the search results with pagination for valid page", async () => {
    const q = "react";
    const page = "1";
    
    const Component = await SearchResultsIndex({ q, page });
    render(Component);
    
    // RecruitListコンポーネントが表示されていることを確認
    const recruitList = screen.getByTestId("recruit-list-mock");
    expect(recruitList).toBeInTheDocument();
    
    // モックデータの各募集が表示されていることを確認
    const recruitItem1 = screen.getByTestId("recruit-item-1");
    expect(recruitItem1).toBeInTheDocument();
    expect(recruitItem1).toHaveTextContent("React Developer");
    
    const recruitItem2 = screen.getByTestId("recruit-item-2");
    expect(recruitItem2).toBeInTheDocument();
    expect(recruitItem2).toHaveTextContent("Vue Developer");
    
    // ページネーションが表示されていることを確認
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveClass("bg-white p-2 w-auto rounded-md mt-auto");
    
    // ページネーションのリンクが表示されていることを確認
    const paginationLinks = screen.getAllByTestId("pagination-link");
    expect(paginationLinks.length).toBeGreaterThan(0);
    
    // 次のページへのリンクが表示されていることを確認
    const nextLink = screen.getByTestId("pagination-next");
    expect(nextLink).toBeInTheDocument();
    expect(nextLink).toHaveAttribute("href", `/search?q=${q}&page=2`);
  });
  
  it("renders the search results with pagination for second page", async () => {
    const q = "react";
    const page = "2";
    
    const Component = await SearchResultsIndex({ q, page });
    render(Component);
    
    // RecruitListコンポーネントが表示されていることを確認
    const recruitList = screen.getByTestId("recruit-list-mock");
    expect(recruitList).toBeInTheDocument();
    
    // ページネーションが表示されていることを確認
    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    
    // 前のページへのリンクが表示されていることを確認
    const previousLink = screen.getByTestId("pagination-previous");
    expect(previousLink).toBeInTheDocument();
    expect(previousLink).toHaveAttribute("href", `/search?q=${q}&page=1`);
  });
  
  it("renders error message for invalid page number", async () => {
    const q = "react";
    const page = "0"; // 不正なページ番号
    
    const Component = await SearchResultsIndex({ q, page });
    render(Component);
    
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.getByText("不正なページ番号です。");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-center");
    
    // RecruitListコンポーネントは表示されていないことを確認
    const recruitList = screen.queryByTestId("recruit-list-mock");
    expect(recruitList).not.toBeInTheDocument();
    
    // ページネーションは表示されていないことを確認
    const pagination = screen.queryByTestId("pagination");
    expect(pagination).not.toBeInTheDocument();
  });
});
