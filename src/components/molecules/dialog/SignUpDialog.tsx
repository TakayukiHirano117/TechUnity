import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { memo, ReactNode } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import MainButton from "@/components/atoms/button/MainButton";
import GitHubIcon from "@/components/atoms/Icon/GitHubIcon";
import GoogleIcon from "@/components/atoms/Icon/GoogleIcon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema } from "@/lib/schema/formSchema";

import MainDialog from "./MainDialog";

const SignUpDialog = memo(({ trigger }: { trigger: ReactNode }) => {
  const router = useRouter();

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

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
    <MainDialog
      title="TechUnity"
      description="TechUnityはチーム開発メンバーの募集をお手伝いする、チーム開発メンバー募集プラットフォームです。"
      trigger={trigger}
    >
      <h3 className="text-center font-bold text-2xl">メールアドレスで登録</h3>
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
                  <Input placeholder="Taro Yamada" type="text" {...field} />
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
          <MainButton type="submit" className="rounded-full font-bold">
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
  );
});

SignUpDialog.displayName = "SignUpDialog";

export default SignUpDialog;
