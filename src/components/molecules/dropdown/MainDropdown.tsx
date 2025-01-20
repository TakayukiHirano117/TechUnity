import Link from "next/link";
import { signOut } from "next-auth/react";
import React, { memo, ReactNode } from "react";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RecruitIcon from "@/components/atoms/Icon/RecruitIcon";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import GearIcon from "@/components/atoms/Icon/GearIcon";
import LogoutIcon from "@/components/atoms/Icon/LogoutIcon";

const MainDropdown = memo(
  ({ children, username }: { children: ReactNode; username: string }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 21 21"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 4.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
                <path d="M17.5 3.467a1.462 1.462 0 0 1-.017 2.05L10.5 12.5l-3 1l1-3l6.987-7.046a1.409 1.409 0 0 1 1.885-.104zm-2 2.033l.953 1" />
              </g>
            </svg>
            <Link href={"/recruits/create"}>募集する</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <RecruitIcon width="20" height="20" />
            <Link href={"/dashboard/recruits"}>募集の管理</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HeartIcon width="20" height="20" />
            <Link href={"/dashboard/liked-recruits"}>いいねした募集</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ApplyIcon width="20" height="20" />
            <Link href={"/dashboard/applied-recruits"}>応募した募集</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GearIcon width="20" height="20" />
            <Link href={"/dashboard/profiles"}>アカウント設定</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutIcon width="20" height="20" />
            <span>
              <button onClick={() => signOut()}>ログアウト</button>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

MainDropdown.displayName = "MainDropdown";

export default MainDropdown;
