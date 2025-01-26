"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SearchIcon from "@/components/atoms/Icon/SearchIcon";
import { Input } from "@/components/ui/input";

import MainDialog from "../dialog/MainDialog";

const searchRecruitSchema = z.object({
  q: z.string().min(1, { message: "検索ワードは1文字以上で入力してください" }),
});

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof searchRecruitSchema>
  >({
    resolver: zodResolver(searchRecruitSchema),
    defaultValues: {
      q: "",
    },
  });

  const onSubmit = (data: { q: string }) => {
    router.push(`/search?q=${encodeURIComponent(data.q)}`);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2 relative">
      <MainDialog
        title="募集を検索"
        onOpenChange={setOpen}
        isOpen={open}
        trigger={
          <button type="button" className="relative">
            <SearchIcon className="w-6 h-6 font-bold cursor-pointer hover:opacity-70 text-slate-600" />
          </button>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <SearchIcon className="w-6 h-6 font-bold absolute top-2 left-2 cursor-pointer hover:opacity-70 text-slate-600" />
          <span className="">
            <Input
              placeholder="募集を検索"
              className="pl-10"
              {...register("q")}
            />
          </span>
        </form>
      </MainDialog>
    </div>
  );
};

export default SearchBar;
