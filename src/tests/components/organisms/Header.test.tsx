import { render } from "@testing-library/react";
import Header from "@/components/organisms/header/Header";

// 認証されてるかされてないか
// 認証されてるとき、ロゴ・アバター・募集するボタン・虫眼鏡アイコンが表示されるか
// 認証されてないとき、ロゴ・ログインボタン・新規登録ボタン・虫眼鏡ボタンが表示されるか
// 虫眼鏡アイコンをクリックしたらダイアログが出るか
// ログインボタンをクリックしたらログインダイアログが出現するか
// 新規登録ボタンをクリックしたら新規登録ダイアログが出現するか
// アバターをクリックしたらドロップダウンが表示されるか

describe("Header", () => {
  it("Header", () => {
    render(<Header />);
  });
});
