"use client";

import Link from "next/link";
import React, { memo } from "react";
import SearchBar from "../search/SearchBar";
import LoginDialog from "../dialog/LoginDialog";
import MainButton from "@/components/atoms/button/MainButton";
import SignUpDialog from "../dialog/SignUpDialog";
import MainDropdown from "../dropdown/MainDropdown";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";


const HeaderContent = memo(
  ({
    user,
  }: {
    user: {
      name: string;
      image: string;
      email: string;
      id: string;
    };
  }) => {
    return (
      <>
        <SearchBar />
        {!user ? (
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
          <>
            <MainDropdown username={user.name!}>
              <button>
                <AvatarIcon
                  className="cursor-pointer border"
                  ImageSrc={user.image!}
                  fallbackText={user.name!}
                />
              </button>
            </MainDropdown>
            <MainButton className="rounded-full font-bold hidden sm:block">
              <Link href={"/recruits/create"}>募集する</Link>
            </MainButton>
          </>
        )}
      </>
    );
  },
);

HeaderContent.displayName = "HeaderContent";

export default HeaderContent;
