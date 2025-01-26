import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import React, { memo, ReactNode } from "react";
import ApplyIcon from "@/components/atoms/Icon/ApplyIcon";
import GearIcon from "@/components/atoms/Icon/GearIcon";
import HeartIcon from "@/components/atoms/Icon/HeartIcon";
import LogoutIcon from "@/components/atoms/Icon/LogoutIcon";
import RecruitIcon from "@/components/atoms/Icon/RecruitIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  children: ReactNode;
  username: string;
}

const HeaderDropdown = memo(({ children, username }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/recruits/create"
            className="flex items-center"
            onPointerDown={(e) => {
              e.currentTarget.click();
            }}
          >
            <PencilIcon width="20" height="20" className="mr-2" />
            募集する
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/recruits"
            className="flex items-center"
            onPointerDown={(e) => e.currentTarget.click()}
          >
            <RecruitIcon width="20" height="20" className="mr-2" />
            募集の管理
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/liked-recruits"
            className="flex items-center"
            onPointerDown={(e) => e.currentTarget.click()}
          >
            <HeartIcon width="20" height="20" className="mr-2" />
            いいねした募集
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/applied-recruits"
            className="flex items-center"
            onPointerDown={(e) => e.currentTarget.click()}
          >
            <ApplyIcon width="20" height="20" className="mr-2" />
            応募した募集
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/profiles"
            className="flex items-center"
            onPointerDown={(e) => e.currentTarget.click()}
          >
            <GearIcon width="20" height="20" className="mr-2" />
            アカウント設定
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => signOut()}>
          <LogoutIcon width="20" height="20" className="mr-2" />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

HeaderDropdown.displayName = "HeaderDropdown";
export default HeaderDropdown;
