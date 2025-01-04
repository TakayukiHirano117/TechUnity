import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

// propsを受け取ってないのでmemo化する意味はないが今後渡すかもしれないので忘れないうちにとりあえずやっとく。
const Footer: React.FC = memo(() => {
	return (
		<footer className="pt-[3rem] container mt-auto">
			<div className="mx-[3rem] px-[3rem] pb-[3rem]">
				<div className="flex items-center justify-between">
					<div className="flex flex-col max-w-[250px] gap-2">
						<Link href="/">
							<Image src="/Logo.png" alt="logo" width={100} height={100} />
						</Link>
						<p className="text-xs text-slate-600">
							チーム開発メンバー募集プラットフォーム
						</p>
					</div>
					<div className="flex flex-col">
						<h4 className="font-bold text-lg">About</h4>
						<Link href={"/about"} className="hover:underline">
							TechUnityについて
						</Link>
					</div>
					<div className="flex flex-col">
						<h4 className="font-bold text-lg">Guides</h4>
						<Link href={"/about"} className="hover:underline">
							使い方
						</Link>
					</div>
					<div className="flex flex-col">
						<h4 className="font-bold text-lg">Links</h4>
						<Link href={"/about"} className="hover:underline">
							GitHub
						</Link>
					</div>
					<div className="flex flex-col">
						<h4 className="font-bold text-lg">Legal</h4>
						<Link href={"/about"} className="hover:underline">
							利用規約
						</Link>
					</div>
				</div>
			</div>
			<div className="w-full border-t">
				<div className="container mx-auto text-center py-[2rem] ">
					<p className="text-xs text-slate-600">
						&copy; {new Date().getFullYear()}{" "}
						<Link
							href={"https://github.com/TakayukiHirano117"}
							className="hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							TakayukiHirano117
						</Link>
						. All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
});

Footer.displayName = "Footer";

export default Footer;
