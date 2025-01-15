"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { z } from "zod";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import DashBoardSideBar from "@/components/molecules/DashBoardSideBar";
import ImageUpload from "@/components/molecules/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SidebarItems } from "@/config/dashboard/SidebarItems";

const items = SidebarItems;

const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "名前は必須です")
    .max(50, "名前は50文字以内で入力してください"),
  description: z
    .string()
    .max(200, "自己紹介文は200文字以内で入力してください")
    .optional(),
  image: z.string().url("有効な画像URLを入力してください").optional(),
});

const getProfile = async () => {
  const res = await fetch("/api/dashboard/profiles");
  const profile = await res.json();
  return profile;
};

type ProfileFormValues = z.infer<typeof editProfileSchema>;

const ProfileSettingsPage = () => {
  const router = useRouter();

  const {
    data: profile,
    error,
    isLoading,
  } = useSWR("/api/dashboard/profiles", getProfile);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: profile?.name || "",
      description: profile?.description || "",
      image: profile?.image || "",
    },
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onInsertImage = (name: string, url: string) => {
    setUploadedImage(url);
    setValue("image", url);
  };

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("description", profile.description || "");
      setValue("image", profile.image || "");
    }
  }, [profile, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await fetch("/api/dashboard/profiles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("プロフィールを更新しました。");
      router.refresh();
    } catch (err) {
      toast.error("プロフィールを更新に失敗しました");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-8 py-14 flex justify-between container mx-auto gap-12 max-w-[1080px]">
        {!profile || isLoading ? (
          <div className="mx-auto space-y-3 h-screen">
            <LoadingIcon
              width="40"
              height="40"
              className="animate-spin text-slate-600"
            />
          </div>
        ) : (
          <>
            <DashBoardSideBar items={items} />
            <div className="flex flex-col gap-4 sm:w-9/12 w-full">
              <h1 className="font-bold text-3xl">プロフィール</h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col sm:flex-row gap-8 mt-4">
                  <ImageUpload folder="recruits" onInsertImage={onInsertImage}>
                    {(open) => (
                      <button
                        type="button"
                        className="flex flex-col items-center gap-1"
                        onClick={() => open()}
                      >
                        <AvatarIcon
                          className="w-20 h-20 border"
                          ImageSrc={uploadedImage || profile.image}
                          fallbackText={profile.name}
                        />
                        <span className="text-sm text-slate-600">変更する</span>
                      </button>
                    )}
                  </ImageUpload>

                  <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="name"
                        className="text-slate-600 font-bold"
                      >
                        名前
                      </Label>
                      <Input
                        {...register("name")}
                        placeholder="ユーザー名"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="bio" className="text-slate-600 font-bold">
                        自己紹介
                      </Label>
                      <Textarea
                        {...register("description")}
                        placeholder="自己紹介文"
                        className={`resize-none ${errors.description ? "border-red-500" : ""}`}
                      />
                      {errors.description && (
                        <span className="text-red-500 text-sm">
                          {errors.description.message}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <MainButton
                        className="font-bold rounded-full"
                        type="submit"
                      >
                        更新する
                      </MainButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
        <Toaster />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
