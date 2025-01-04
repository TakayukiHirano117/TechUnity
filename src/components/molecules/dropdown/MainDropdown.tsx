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
						<RecruitIcon width="20" height="20" />
						<Link href={"/dashboard/recruits"}>募集の管理</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<HeartIcon width="20" height="20" />
						<Link href={"/dashboard/liked-recruits"}>いいねした募集</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ApplyIcon width="20" height="20" />
						<span>応募した募集</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<GearIcon width="20" height="20" />
						<span>アカウント設定</span>
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
