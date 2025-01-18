"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { memo } from "react";
import { Toaster } from "react-hot-toast";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import LoginDialog from "@/components/molecules/dialog/LoginDialog";
import SignUpDialog from "@/components/molecules/dialog/SignUpDialog";
import MainDropdown from "@/components/molecules/dropdown/MainDropdown";
import SearchBar from "@/components/molecules/search/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";

// propsを受け取ってないのでmemo化する意味はないが今後渡すかもしれないので忘れないうちにとりあえずやっとく。
// DBから取得したユーザー情報をここでpropsとして受け取るように変更する。
const Header: React.FC = memo(() => {
  // DBから取得する方式に変える。
  const { data: session, status } = useSession();

  return (
    <header className="border-b px-2">
      <div className="container mx-auto lg:px-20 py-3">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image src="/Logo.png" alt="logo" width={120} height={120} />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
            {status === "loading" ? (
              <Skeleton className="w-40 h-10 rounded-full" />
            ) : !session ? (
              <>
                <LoginDialog
                  trigger={
                    <MainButton className="rounded-full font-bold">
                      ログイン
                    </MainButton>
                  }
                />
                <SignUpDialog
                  trigger={
                    <MainButton
                      className="rounded-full font-bold"
                      variant={"outline"}
                    >
                      新規登録
                    </MainButton>
                  }
                />
              </>
            ) : (
              <div className="flex items-center gap-4">
                <MainDropdown username={session.user.name!}>
                  <button>
                    <AvatarIcon
                      className="cursor-pointer border"
                      ImageSrc={session.user.image!}
                      fallbackText={session.user.name!}
                    />
                  </button>
                </MainDropdown>
                <MainButton className="rounded-full font-bold hidden sm:block">
                  <Link href={"/recruits/create"}>募集する</Link>
                </MainButton>
              </div>
            )}
          </div>
          <Toaster />
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
