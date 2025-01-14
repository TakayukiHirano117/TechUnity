import { zodResolver } from "@hookform/resolvers/zod";
import { DialogContent } from "@radix-ui/react-dialog";
import React from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

import SearchIcon from "@/components/atoms/SearchIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import MainDialog from "../dialog/MainDialog";

const searchRecruitSchema = z.object({
  query: z
    .string()
    .min(1, { message: "検索ワードは1文字以上で入力してください" }),
});

const onSubmit = async (data: { query: string }) => {
	console.log(data)
};

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
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <SearchIcon className="w-6 h-6 font-bold sm:absolute sm:top-2 sm:left-2 cursor-pointer hover:opacity-70 text-slate-600" />
        <span className="sm:block hidden">
          <Input placeholder="募集を検索" className="pl-10" />
        </span>
      </form> */}
      <MainDialog
      title="募集を検索"
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
              {...register("query")}
            />
          </span>
        </form>
      </MainDialog>
    </div>
  );
};

export default SearchBar;
