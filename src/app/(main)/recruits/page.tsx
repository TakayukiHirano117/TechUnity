import RecruitCard from "@/components/molecules/card/RecruitCard";
import React from "react";

const AllRecruits = () => {
	return (
		<div className="bg-slate-100">
			<div className="container max-w-[960px] mx-auto p-8 flex flex-col gap-8">
				<h1 className="text-3xl font-bold">Recruits</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
					<RecruitCard
						title="ReactでSNSアプリを作りたい!"
						description="
								ReactでSNSアプリを作成したいです。具体的には、Reactで状態管理しつつwebsocketを活用してリアルタイム通信を行うことを想定しています。そして、、、、、、"
						authorName="shadcn"
						publishedAt="1日前"
						goodCount={5}
						remainingCount={3}
					/>
					<RecruitCard
						title="ReactでSNSアプリを作りたい!"
						description="
								ReactでSNSアプリを作成したいです。具体的には、Reactで状態管理しつつwebsocketを活用してリアルタイム通信を行うことを想定しています。そして、、、、、、"
						authorName="shadcn"
						publishedAt="1日前"
						goodCount={5}
						remainingCount={3}
					/>
					<RecruitCard
						title="ReactでSNSアプリを作りたい!"
						description="
								ReactでSNSアプリを作成したいです。具体的には、Reactで状態管理しつつwebsocketを活用してリアルタイム通信を行うことを想定しています。そして、、、、、、"
						authorName="shadcn"
						publishedAt="1日前"
						goodCount={5}
						remainingCount={3}
					/>
					<RecruitCard
						title="ReactでSNSアプリを作りたい!"
						description="
								ReactでSNSアプリを作成したいです。具体的には、Reactで状態管理しつつwebsocketを活用してリアルタイム通信を行うことを想定しています。そして、、、、、、"
						authorName="shadcn"
						publishedAt="1日前"
						goodCount={5}
						remainingCount={3}
					/>
					<RecruitCard
						title="ReactでSNSアプリを作りたい!"
						description="
								ReactでSNSアプリを作成したいです。具体的には、Reactで状態管理しつつwebsocketを活用してリアルタイム通信を行うことを想定しています。そして、、、、、、"
						authorName="shadcn"
						publishedAt="1日前"
						goodCount={5}
						remainingCount={3}
					/>
					<RecruitCard
						title="ReactでSNSアプリを作りたい!"
						description="
								ReactでSNSアプリを作成したいです。具体的には、Reactで状態管理しつつwebsocketを活用してリアルタイム通信を行うことを想定しています。そして、、、、、、"
						authorName="shadcn"
						publishedAt="1日前"
						goodCount={5}
						remainingCount={3}
					/>
				</div>
			</div>
		</div>
	);
};

export default AllRecruits;
