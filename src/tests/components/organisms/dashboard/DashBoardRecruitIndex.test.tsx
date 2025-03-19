import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// getRecruitsWithUserをモック
vi.mock("@/lib/fetcher/dashboard", () => ({
  getRecruitsWithUser: vi.fn(),
}));

// DashBoardRecruitListコンポーネントをモック
vi.mock("@/components/molecules/dashboard/DashBoardRecruitList", () => ({
  __esModule: true,
  default: ({ recruits }: { recruits: Array<{ id: string; title: string }> }) => (
    <div data-testid="dashboard-recruit-list">
      {recruits.map((recruit) => (
        <div key={recruit.id} data-testid={`recruit-item-${recruit.id}`}>
          {recruit.title}
        </div>
      ))}
    </div>
  ),
}));

// NoDashboardRecruitsMessageコンポーネントをモック
vi.mock("@/components/organisms/dashboard/NoDashboardRecruitsMessage", () => ({
  __esModule: true,
  default: () => <div data-testid="no-dashboard-recruits-message">募集がありません</div>,
}));

// 実際のDashBoardRecruitIndexコンポーネントをインポート
import DashBoardRecruitIndex from "@/components/organisms/dashboard/DashBoardRecruitIndex";
import { getRecruitsWithUser } from "@/lib/fetcher/dashboard";

describe("DashBoardRecruitIndex Component", () => {
  it("renders the dashboard recruit list when recruits exist", async () => {
    // モックの実装を設定
    (getRecruitsWithUser as ReturnType<typeof vi.fn>).mockResolvedValue([
      {
        id: "1",
        title: "React Developer",
        content: "React Developer wanted",
        description: "React Developer wanted",
        created_at: "2022-01-01T00:00:00.000Z",
        updated_at: "2022-01-01T00:00:00.000Z",
        creatorId: "user1",
        is_published: true,
      },
      {
        id: "2",
        title: "Vue Developer",
        content: "Vue Developer wanted",
        description: "Vue Developer wanted",
        created_at: "2022-01-02T00:00:00.000Z",
        updated_at: "2022-01-02T00:00:00.000Z",
        creatorId: "user1",
        is_published: true,
      },
    ]);
    
    render(await DashBoardRecruitIndex());
    
    // DashBoardRecruitListコンポーネントが表示されていることを確認
    const recruitList = screen.getByTestId("dashboard-recruit-list");
    expect(recruitList).toBeInTheDocument();
    
    // モックデータの各募集が表示されていることを確認
    const recruitItem1 = screen.getByTestId("recruit-item-1");
    expect(recruitItem1).toBeInTheDocument();
    expect(recruitItem1).toHaveTextContent("React Developer");
    
    const recruitItem2 = screen.getByTestId("recruit-item-2");
    expect(recruitItem2).toBeInTheDocument();
    expect(recruitItem2).toHaveTextContent("Vue Developer");
    
    // NoDashboardRecruitsMessageコンポーネントは表示されていないことを確認
    const noRecruitsMessage = screen.queryByTestId("no-dashboard-recruits-message");
    expect(noRecruitsMessage).not.toBeInTheDocument();
  });
  
  it("renders the no dashboard recruits message when no recruits exist", async () => {
    // モックの実装を設定
    (getRecruitsWithUser as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    
    render(await DashBoardRecruitIndex());
    
    // NoDashboardRecruitsMessageコンポーネントが表示されていることを確認
    const noRecruitsMessage = screen.getByTestId("no-dashboard-recruits-message");
    expect(noRecruitsMessage).toBeInTheDocument();
    
    // DashBoardRecruitListコンポーネントは表示されていないことを確認
    const recruitList = screen.queryByTestId("dashboard-recruit-list");
    expect(recruitList).not.toBeInTheDocument();
  });
});
