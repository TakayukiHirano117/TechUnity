import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// getAllRecruitsをモック
vi.mock("@/lib/fetcher/recruit", () => ({
  getAllRecruits: vi.fn().mockResolvedValue([
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
  ]),
}));

// RecruitListコンポーネントをモック
vi.mock("@/components/molecules/recruits/RecruitList", () => ({
  __esModule: true,
  default: ({ recruits }: { recruits: Array<{ id: string; title: string; content: string; description: string; created_at: string; updated_at: string; creatorId: string; is_published: boolean }> }) => (
    <div data-testid="recruit-list-mock">
      {recruits.map((recruit) => (
        <div key={recruit.id} data-testid={`recruit-item-${recruit.id}`}>
          {recruit.title}
        </div>
      ))}
    </div>
  ),
}));

// 実際のRecruitsIndexコンポーネントをインポート
import RecruitsIndex from "@/components/organisms/recruits/RecruitsIndex";

describe("RecruitsIndex Component", () => {
  it("renders the RecruitList with fetched recruits", async () => {
    render(await RecruitsIndex());
    
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
  });

});
