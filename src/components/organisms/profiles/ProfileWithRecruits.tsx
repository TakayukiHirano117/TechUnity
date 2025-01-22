import React from "react";

import ProfilesRecruitList from "@/components/molecules/profiles/ProfilesRecruitList";
import UserProfileHeader from "@/components/molecules/profiles/UserProfileHeader";
import { getRecruitsWithProfile } from "@/lib/fetcher/profile";

const ProfileWithRecruits = async ({ id }: { id: string }) => {
  const profile = await getRecruitsWithProfile(id);

  return (
    <>
      <UserProfileHeader profile={profile} className="my-8" />
      <ProfilesRecruitList recruits={profile.recruits_creator} />
    </>
  );
};

export default ProfileWithRecruits;
