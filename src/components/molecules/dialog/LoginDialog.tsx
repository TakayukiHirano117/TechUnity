import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { memo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import { signInFormSchema } from "@/lib/schema/formSchema";

import MainDialog from "./MainDialog";

const LoginDialog = memo(({ trigger }: { trigger: React.ReactNode }) => {
  const router = useRouter();

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = signInForm;

  // credentials認証のログイン処理
  const onSignInSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!res?.ok) {
        toast.error(res!.error);
      } else {
        toast.success("ログインしました。");
      }

      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MainDialog
      title="TechUnity"
      description="TechUnityはチーム開発メンバーの募集をお手伝いする、チーム開発メンバー募集プラットフォームです。"
      trigger={trigger}
    >
      <h3 className="text-center font-bold text-2xl">
        メールアドレスでログイン
      </h3>
      <Form {...signInForm}>
        <form
          onSubmit={handleSubmit(onSignInSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  メールアドレス(テストユーザー：testuser@test.com)
                </FormLabel>
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
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード(テストユーザー: testuser)</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <MainButton type="submit" className="rounded-full font-bold">
            {isSubmitting ? "ログイン中..." : "ログイン"}
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
  );
});

LoginDialog.displayName = "LoginDialog";

export default LoginDialog;
