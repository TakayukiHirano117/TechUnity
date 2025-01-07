import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import SearchIcon from "@/components/atoms/SearchIcon";
import { Input } from "@/components/ui/input";

const searchRecruitSchema = z.object({
	query: z
		.string()
		.min(1, { message: "検索ワードは1文字以上で入力してください" }),
});

const onSubmit = async (data: { query: string }) => {};

const SearchBar = () => {
	const { register, handleSubmit, setValue, watch, formState } = useForm<
		z.infer<typeof searchRecruitSchema>
	>({
		resolver: zodResolver(searchRecruitSchema),
		defaultValues: {
			query: "",
		},
	});

	return (
		<div className="flex items-center gap-2 relative">
			<form onSubmit={handleSubmit(onSubmit)}>
				<SearchIcon className="w-6 h-6 font-bold absolute top-2 left-2 text-slate-600" />
				<Input placeholder="募集を検索" className="pl-10" />
			</form>
		</div>
	);
};

export default SearchBar;
