"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import GitHubIcon from "@/components/atoms/Icon/GitHubIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { editProfileSchema } from "@/lib/schema/formSchema";
import ImageUpload from "../ImageUpload";

type ProfileFormValues = z.infer<typeof editProfileSchema>;

// プロフィール確認・編集ページ
const DashBoardProfiles = memo(
  ({
    profile,
  }: {
    profile: {
      id: string;
      name: string;
      githubUrl: string;
      description: string;
      image: string;
    };
  }) => {
    const router = useRouter();

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<ProfileFormValues>({
      resolver: zodResolver(editProfileSchema),
      defaultValues: {
        name: profile?.name || "",
        githubUrl: profile?.githubUrl || "",
        description: profile?.description || "",
        image: profile?.image || "",
      },
    });

    // 更新処理の有無にかかわらず、画像をアバターに反映するためのstate
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    // 画像アップロード時の処理
    const onInsertImage = (name: string, url: string) => {
      setUploadedImage(url);
      setValue("image", url);
    };

    // プロフィール情報をフォームにセット
    useEffect(() => {
      if (profile) {
        setValue("name", profile.name || "");
        setValue("githubUrl", profile.githubUrl || "");
        setValue("description", profile.description || "");
        setValue("image", profile.image || "");
      }
    }, [profile, setValue]);

    // プロフィール更新関数
    const onSubmit = async (data: ProfileFormValues) => {
      try {
        // 分離したい
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row gap-8 mt-4">
          <div className="flex justify-center">
            <ImageUpload
              folder="recruits"
              onInsertImage={onInsertImage}
              isCropping={true}
            >
              {(open) => (
                <button
                  type="button"
                  className="flex flex-col items-center gap-1"
                  onClick={() => open()}
                >
                  <AvatarIcon
                    className="w-20 h-20 border bg-white"
                    ImageSrc={uploadedImage || profile.image}
                    fallbackText={profile.name}
                  />
                  <span className="text-sm text-slate-600">変更する</span>
                </button>
              )}
            </ImageUpload>
          </div>

          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-slate-600 font-bold">
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
              <Label
                htmlFor="githubUrl"
                className="text-slate-600 font-bold flex items-center gap-2"
              >
                <GitHubIcon width="20" height="20" />
                <span>GitHub URL</span>
              </Label>
              <Input
                {...register("githubUrl")}
                placeholder="GitHub URL"
                className={errors.githubUrl ? "border-red-500" : ""}
              />
              {errors.githubUrl && (
                <span className="text-red-500 text-sm">
                  {errors.githubUrl.message}
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
                className={`resize-none ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <MainButton className="font-bold rounded-full" type="submit">
                更新する
              </MainButton>
            </div>
          </div>
        </div>
      </form>
    );
  },
);

DashBoardProfiles.displayName = "DashBoardProfiles";

export default DashBoardProfiles;
