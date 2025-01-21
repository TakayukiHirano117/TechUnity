import { Recruit } from "@prisma/client";
import React, { Suspense } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";

const getUserProfile = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();
  return data;
};

const ProfileWithRecruits = React.lazy(
  () => import("@/components/organisms/profiles/ProfileWithRecruits"),
);

type UserProfile = {
  image?: string;
  name?: string;
  description?: string;
  recruits_creator: Recruit[];
};

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
