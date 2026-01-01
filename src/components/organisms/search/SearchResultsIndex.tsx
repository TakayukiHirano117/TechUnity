import React, { memo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { searchRecruits } from "@/lib/fetcher/search";

import RecruitList from "../../molecules/recruits/RecruitList";

export const revalidate = 0;

// 検索結果を表示するコンポーネント
// q: 検索クエリ, page: 現在のページ番号（文字列）
const SearchResultsIndex = memo(
  async ({ q, page }: { q: string; page: string }) => {
    const { recruits, totalPages } =
      await searchRecruits(q, page);
    const parsedPage = parseInt(page, 10);

    // 不正なページ番号の場合はエラーメッセージを表示
    if (parsedPage < 1 || parsedPage > totalPages) {
      return <p className="text-center">不正なページ番号です。</p>;
    }

    // 総ページ数に応じたページ番号のリストを生成する関数
    const getPages = (current: number, total: number) => {
      let pages: (number | "ellipsis")[] = [];
      if (total <= 5) {
        // 総ページ数が5以下なら全ページ表示
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // 5ページ以上の場合のパターン
        if (current <= 3) {
          // 先頭寄りの場合：1,2,3,4, …, 最終ページ
          pages = [1, 2, 3, 4, "ellipsis", total];
        } else if (current >= total - 2) {
          // 末尾寄りの場合：1, …, 最終ページの4つ前から最終ページまで
          pages = [1, "ellipsis", total - 3, total - 2, total - 1, total];
        } else {
          // 中間の場合：1, …, 前後1ページずつ, …, 最終ページ
          pages = [
            1,
            "ellipsis",
            current - 1,
            current,
            current + 1,
            "ellipsis",
            total,
          ];
        }
      }
      return pages;
    };

    const pages = getPages(parsedPage, totalPages);

    return (
      <>
        <RecruitList recruits={recruits} />

        {/* 総ページが1以上の場合のみページネーションを表示 */}
        {recruits && totalPages > 1 && (
          <Pagination className="bg-white p-2 w-auto rounded-md mt-auto">
            <PaginationContent>
              {/* 1ページ目でなければ Previous を表示 */}
              {parsedPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/search?q=${q}&page=${parsedPage - 1}`}
                  />
                </PaginationItem>
              )}

              {/* ページ番号リンクの表示 */}
              {pages.map((pageItem, index) => (
                <PaginationItem
                  key={index}
                  className={
                    pageItem === parsedPage ? "bg-accent rounded-md" : ""
                  }
                >
                  {pageItem === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink href={`/search?q=${q}&page=${pageItem}`}>
                      {pageItem}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* 最終ページでなければ Next を表示 */}
              {parsedPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={`/search?q=${q}&page=${parsedPage + 1}`}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  },
);

SearchResultsIndex.displayName = "SearchResultsIndex";

export const dynamic = "force-dynamic";

export default SearchResultsIndex;
