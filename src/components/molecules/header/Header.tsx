import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import SampleButton from "@/components/atoms/button/SampleButton";
import SearchIcon from "@/components/atoms/SearchIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
	return (
		<header className="container mx-auto lg:px-20 py-3">
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
					{/* 通知アイコンを後でおく */}

                    {/* クリックしたらドロップダウン */}
					<AvatarIcon
						className="cursor-pointer"
						ImageSrc="https://github.com/shadcn.png"
						fallbackText="CN"
					/>
					<SampleButton className="rounded-full font-bold">募集する</SampleButton>
				</div>
			</div>
		</header>
	);
};

export default Header;
