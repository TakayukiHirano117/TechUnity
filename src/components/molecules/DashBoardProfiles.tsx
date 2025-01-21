"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { editProfileSchema } from "@/lib/formSchema";

import AvatarIcon from "../atoms/avatar/AvatarIcon";
import MainButton from "../atoms/button/MainButton";
import GitHubIcon from "../atoms/Icon/GitHubIcon";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import ImageUpload from "./ImageUpload";

type ProfileFormValues = z.infer<typeof editProfileSchema>;

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

    console.log(profile)

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

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const onInsertImage = (name: string, url: string) => {
      setUploadedImage(url);
      setValue("image", url);
    };

    useEffect(() => {
      if (profile) {
        setValue("name", profile.name || "");
        setValue("githubUrl", profile.githubUrl || "");
        setValue("description", profile.description || "");
        setValue("image", profile.image || "");
      }
    }, [profile, setValue]);

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
          <div>
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
                    className="w-20 h-20 border"
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
                htmlFor="github_url"
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
