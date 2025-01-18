import React from "react";

import ProfilesRecruitList from "@/components/molecules/ProfilesRecruitList";
import { getRecruitsWithProfile } from "@/lib/fetcher/profile";
import UserProfileHeader from "@/components/molecules/UserProfileHeader";

const ProfileWithRecruits = async ({ id }: { id: string }) => {
  const profile = await getRecruitsWithProfile(id);

  console.log(profile);

  return (
    <>
      <UserProfileHeader profile={profile} className="my-8" />
      <ProfilesRecruitList recruits={profile.recruits_creator} />
    </>
  );
};

export default ProfileWithRecruits;