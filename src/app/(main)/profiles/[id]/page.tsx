import { Recruit } from "@prisma/client";
import React, { Suspense } from "react";
import useSWR from "swr";

import AvatarIcon from "@/components/atoms/avatar/AvatarIcon";

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
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileWithRecruits id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
