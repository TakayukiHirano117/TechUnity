import { getServerSession } from "next-auth";
import { encode } from "next-auth/jwt";
import React, { Suspense } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import TipsIcon from "@/components/atoms/Icon/TipsIcon";
import RecruitsIndex from "@/components/organisms/recruits/RecruitsIndex";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { authOptions } from "@/lib/auth";

const TopPage = async () => {
  const session = await getServerSession(authOptions);

  let jwt: string | null = null;

  if (session?.user) {
    jwt = await encode({
      token: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        picture: session.user.image,
      },
      secret: process.env.NEXTAUTH_SECRET!,
    });

    console.log(jwt);
  }

  return (
    <div className="bg-slate-100">
      <div className="container max-w-[960px] min-h-screen mx-auto p-8 flex flex-col gap-8">
        <div className="flex items-end gap-1">
          <h1 className="text-4xl font-bold">Recruits</h1>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button type="button">
                <TipsIcon className="mb-2 hover:opacity-70 cursor-pointer" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="p-2 text-sm text-slate-600">
              ユーザーが投稿した募集一覧です。
              タイトルをクリックして内容を見てみましょう✨
            </HoverCardContent>
          </HoverCard>
        </div>
        <Suspense
          fallback={
            <div className="flex flex-col space-y-3 z-50 h-screen items-center mt-3">
              <LoadingIcon
                width="40"
                height="40"
                className="animate-spin text-slate-600"
              />
            </div>
          }
        >
          <RecruitsIndex jwt={jwt} />
        </Suspense>
      </div>
    </div>
  );
};

export default TopPage;
