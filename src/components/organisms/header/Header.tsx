"use client";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import SearchIcon from "@/components/atoms/SearchIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import MainButton from "@/components/atoms/button/MainButton";
import MainDialog from "@/components/molecules/dialog/MainDialog";
import GoogleIcon from "@/components/atoms/Icon/GoogleIcon";
import GitHubIcon from "@/components/atoms/Icon/GitHubIcon";

const Header = () => {
	// sessionから取得するとDBの情報が取れない可能性あり。
	const { data: session, status } = useSession();
	console.log(session);

	return (
		<header className="border-b">
			<div className="container mx-auto lg:px-20 py-3">
				<div className="flex justify-between items-center">
					<div>
						<Link href="/">
							{/* svgにしたいな、WIX課金か？ */}
							<Image src="/Preview.png" alt="logo" width={100} height={100} />
						</Link>
					</div>
					<div className="flex items-center gap-4">
						<Link href={"/search"}>
							<SearchIcon className="hover:opacity-70 w-6 h-6 font-bold cursor-pointer" />
						</Link>
						{session ? (
							<div className="flex items-center gap-4">
								<AvatarIcon
									className="cursor-pointer"
									// 画像がundefinedの場合にダミー画像を出す
									ImageSrc={session.user.image!}
									fallbackText={session.user.name!}
								/>
								<MainButton className="rounded-full font-bold">
									募集する
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
};

export default Header;
