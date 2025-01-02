import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashBoardSideBar = ({
	items,
}: {
	items: {
		id: number;
		href: string;
		icon: React.ReactNode;
		text: string;
	}[];
}) => {
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-4 sticky top-[120px]">
			{items.map((item) => (
				<Link
					key={item.id}
					href={item.href}
					className={`flex gap-2 rounded-full hover:bg-slate-200 py-2 px-4 font-bold text-slate-600 ${pathname === item.href ? "bg-blue-100" : ""}`}
				>
					{item.icon}
					{item.text}
				</Link>
			))}
		</div>
	);
};

export default DashBoardSideBar;