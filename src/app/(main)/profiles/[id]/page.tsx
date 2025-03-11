import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";

const ProfileWithRecruits = dynamic(
  () => import("@/components/organisms/profiles/ProfileWithRecruits"),
);

// プロフィールページ（だれでも閲覧可能）
/**
 *
 * @param id string ユーザーid
 * @returns ユーザー情報
 */
const ProfilePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <div className="bg-slate-100 min-h-screen py-4 p-8">
      <div className="container mx-auto max-w-[960px]">
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
          <ProfileWithRecruits id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
