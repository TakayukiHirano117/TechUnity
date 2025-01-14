"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { memo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";
import MainButton from "@/components/atoms/button/MainButton";
import GitHubIcon from "@/components/atoms/Icon/GitHubIcon";
import GoogleIcon from "@/components/atoms/Icon/GoogleIcon";
import MainDialog from "@/components/molecules/dialog/MainDialog";
import MainDropdown from "@/components/molecules/dropdown/MainDropdown";
import SearchBar from "@/components/molecules/search/SearchBar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpFormSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8),
});

// propsを受け取ってないのでmemo化する意味はないが今後渡すかもしれないので忘れないうちにとりあえずやっとく。
const Header: React.FC = memo(() => {
  // console.log("header: " + user.name)
  const router = useRouter();

  // DBから取得する方式に変える。
  const { data: session, status } = useSession();

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSignInSubmit: SubmitHandler<FieldValues> = async (data) => {
    // ログイン
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      // console.log(res);

      if (!res?.ok) {
        toast.error(res!.error);
      }

      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const onSignUpSubmit: SubmitHandler<FieldValues> = async (data) => {
    await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    await signIn("credentials", {
      ...data,
      redirect: false,
    });

    router.refresh();
  };

  return (
    <header className="border-b px-2">
      <div className="container mx-auto lg:px-20 py-3">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image src="/Logo.png" alt="logo" width={120} height={120} />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
            {status === "loading" ? (
              <Skeleton className="w-40 h-10 rounded-full" />
            ) : !session ? (
              <>
                <MainDialog
                  title="TechUnity"
                  description="TechUnityはチーム開発メンバーの募集をお手伝いする、チーム開発メンバー募集プラットフォームです。"
                  trigger={
                    <MainButton className="rounded-full font-bold">
                      ログイン
                    </MainButton>
                  }
                >
                  <h3 className="text-center font-bold text-2xl">
                    メールアドレスでログイン
                  </h3>
                  <Form {...signInForm}>
                    <form
                      onSubmit={signInForm.handleSubmit(onSignInSubmit)}
                      className="flex flex-col gap-2"
                    >
                      <FormField
                        control={signInForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="aaa@example.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signInForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>パスワード</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <MainButton
                        type="submit"
                        className="rounded-full font-bold"
                      >
                        ログインする
                      </MainButton>
                    </form>
                  </Form>
                  <p className="text-sm text-slate-600 text-center">または</p>
                  <MainButton
                    className="rounded-full font-bold"
                    variant="outline"
                    onClick={() => signIn("github")}
                  >
                    <GitHubIcon />
                    GitHubでログイン
                  </MainButton>
                  <MainButton
                    className="rounded-full font-bold"
                    variant="outline"
                    onClick={() => signIn("google")}
                  >
                    <GoogleIcon />
                    Googleでログイン
                  </MainButton>
                </MainDialog>
                <MainDialog
                  title="TechUnity"
                  description="TechUnityはチーム開発メンバーの募集をお手伝いする、チーム開発メンバー募集プラットフォームです。"
                  trigger={
                    <MainButton
                      className="rounded-full font-bold"
                      variant={"outline"}
                    >
                      新規登録
                    </MainButton>
                  }
                >
                  <h3 className="text-center font-bold text-2xl">
                    メールアドレスで登録
                  </h3>
                  <Form {...signUpForm}>
                    <form
                      onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                      className="flex flex-col gap-2"
                    >
                      <FormField
                        control={signUpForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="aaa@example.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signUpForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ユーザー名</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Taro Yamada"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signUpForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>パスワード</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <MainButton
                        type="submit"
                        className="rounded-full font-bold"
                      >
                        新規登録する
                      </MainButton>
                    </form>
                  </Form>
                  <p className="text-sm text-slate-600 text-center">または</p>
                  <MainButton
                    className="rounded-full font-bold"
                    variant="outline"
                    onClick={() => signIn("github")}
                  >
                    <GitHubIcon />
                    GitHubで登録
                  </MainButton>
                  <MainButton
                    className="rounded-full font-bold"
                    variant="outline"
                    onClick={() => signIn("google")}
                  >
                    <GoogleIcon />
                    Googleで登録
                  </MainButton>
                </MainDialog>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <MainDropdown username={session.user.name!}>
                  <button>
                    <AvatarIcon
                      className="cursor-pointer border"
                      ImageSrc={session.user.image!}
                      fallbackText={session.user.name!}
                    />
                  </button>
                </MainDropdown>
                <MainButton className="rounded-full font-bold hidden sm:block">
                  <Link href={"/recruits/create"}>募集する</Link>
                </MainButton>
              </div>
            )}
          </div>
          <Toaster />
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
