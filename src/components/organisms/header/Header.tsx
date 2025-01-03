"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import React, { memo } from "react";
import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import GitHubIcon from "@/components/atoms/Icon/GitHubIcon";
import GoogleIcon from "@/components/atoms/Icon/GoogleIcon";
import SearchIcon from "@/components/atoms/SearchIcon";
import MainDialog from "@/components/molecules/dialog/MainDialog";
import MainDropdown from "@/components/molecules/dropdown/MainDropdown";

// propsを受け取ってないのでmemo化する意味はないが今後渡すかもしれないので忘れないうちにとりあえずやっとく。
const Header: React.FC = memo(() => {
	// sessionから取得するとDBの情報が取れない可能性あり。
	const { data: session, status } = useSession();
	// console.log(session);

	return (
		<header className="border-b">
			<div className="container mx-auto lg:px-20 py-3">
				<div className="flex justify-between items-center">
					<div>
						<Link href="/recruits">
							{/* svgにしたいな、WIX課金か？ */}
							<Image src="/Preview.png" alt="logo" width={120} height={120} />
						</Link>
					</div>
					<div className="flex items-center gap-4">
						<Link href={"/search"}>
							<SearchIcon className="hover:opacity-70 w-6 h-6 font-bold cursor-pointer" />
						</Link>
						{session ? (
							<div className="flex items-center gap-4">
								<MainDropdown username={session.user.name!}>
									<button>
										<AvatarIcon
											className="cursor-pointer"
											// 画像がundefinedの場合にダミー画像を出す
											ImageSrc={session.user.image!}
											fallbackText={session.user.name!}
										/>
									</button>
								</MainDropdown>
								<MainButton className="rounded-full font-bold">
									<Link href={"/recruits/create"}>募集する</Link>
								</MainButton>
							</div>
						) : (
							<MainDialog
								title="TechUnity"
								description="TechUnityはチーム開発メンバーの募集をお手伝いする、チーム開発メンバー募集プラットフォームです。"
								trigger={
									<MainButton className="rounded-full font-bold">
										ログイン
									</MainButton>
								}
							>
								<MainButton
									className="rounded-full font-bold"
									variant="outline"
									onClick={() => signIn("github")}
								>
									<GitHubIcon />
									GitHubでログイン
								</MainButton>
								<MainButton
									className="rounded-full font-bold"
									variant="outline"
									onClick={() => signIn("google")}
								>
									<GoogleIcon />
									Googleでログイン
								</MainButton>
							</MainDialog>
						)}
					</div>
				</div>
			</div>
		</header>
	);
});

Header.displayName = "Header";

export default Header;
