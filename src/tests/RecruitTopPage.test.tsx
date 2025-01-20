import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import RecruitTopPage from "@/components/pages/RecruitTopPage";
import { server } from "./mocks/server";

describe(RecruitTopPage, () => {
  test("テスト", () => {
    render(<RecruitTopPage />);
  });
  server.listen();
});
