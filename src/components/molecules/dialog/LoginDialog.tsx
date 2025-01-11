import { signIn } from "next-auth/react";
import React from "react";

import MainButton from "@/components/atoms/button/MainButton";
import GitHubIcon from "@/components/atoms/Icon/GitHubIcon";
import GoogleIcon from "@/components/atoms/Icon/GoogleIcon";

import MainDialog from "./MainDialog";

const LoginDialog = ({ trigger }) => {
  return (
    <MainDialog
      title="TechUnity"
      description="TechUnityはチーム開発メンバーの募集をお手伝いする、チーム開発メンバー募集プラットフォームです。"
      trigger={trigger}
    >
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
};

export default LoginDialog;
