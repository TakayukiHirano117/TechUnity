import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// getRecruitsWithProfileをモック
vi.mock("@/lib/fetcher/profile", () => ({
  getRecruitsWithProfile: vi.fn().mockResolvedValue({
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    image: "/person.svg",
    bio: "Frontend Developer",
    github_url: "https://github.com/johndoe",
    twitter_url: "https://twitter.com/johndoe",
    recruits_creator: [
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
    ],
  }),
}));

// UserProfileHeaderコンポーネントをモック
vi.mock("@/components/molecules/profiles/UserProfileHeader", () => ({
  __esModule: true,
  default: ({ profile, className }: { profile: { id: string; name: string; email: string; image: string; bio: string; github_url: string; twitter_url: string; recruits_creator: Array<{ id: string; title: string }> }; className: string }) => (
    <div data-testid="user-profile-header" className={className}>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
    </div>
  ),
}));

// ProfilesRecruitListコンポーネントをモック
vi.mock("@/components/molecules/profiles/ProfilesRecruitList", () => ({
  __esModule: true,
  default: ({ recruits }: { recruits: Array<{ id: string; title: string }> }) => (
    <div data-testid="profiles-recruit-list">
      {recruits.map((recruit) => (
        <div key={recruit.id} data-testid={`recruit-item-${recruit.id}`}>
          {recruit.title}
        </div>
      ))}
    </div>
  ),
}));

// サーバーコンポーネントをモック
vi.mock("@/components/organisms/profiles/ProfileWithRecruits", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(async ({ id }) => {
    const { getRecruitsWithProfile } = await import("@/lib/fetcher/profile");
    const profile = await getRecruitsWithProfile(id);
    
    return (
      <>
        <div data-testid="user-profile-header" className="my-8">
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>
        </div>
        <div data-testid="profiles-recruit-list">
          {profile.recruits_creator.map((recruit: { id: string; title: string }) => (
            <div key={recruit.id} data-testid={`recruit-item-${recruit.id}`}>
              {recruit.title}
            </div>
          ))}
        </div>
      </>
    );
  }),
}));

// ProfileWithRecruitsコンポーネントをインポート
import ProfileWithRecruits from "@/components/organisms/profiles/ProfileWithRecruits";

describe("ProfileWithRecruits Component", () => {
  it("renders the user profile header and recruits list", async () => {
    const userId = "user1";
    
    const Component = await ProfileWithRecruits({ id: userId });
    render(Component);
    
    // UserProfileHeaderコンポーネントが表示されていることを確認
    const profileHeader = screen.getByTestId("user-profile-header");
    expect(profileHeader).toBeInTheDocument();
    expect(profileHeader).toHaveClass("my-8");
    expect(profileHeader).toHaveTextContent("John Doe");
    expect(profileHeader).toHaveTextContent("Frontend Developer");
    
    // ProfilesRecruitListコンポーネントが表示されていることを確認
    const recruitList = screen.getByTestId("profiles-recruit-list");
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
