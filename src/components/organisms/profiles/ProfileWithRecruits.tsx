import React, { memo } from "react";

import ProfilesRecruitList from "@/components/molecules/profiles/ProfilesRecruitList";
import UserProfileHeader from "@/components/molecules/profiles/UserProfileHeader";
import { getRecruitsWithProfile } from "@/lib/fetcher/profile";

const ProfileWithRecruits = memo(async ({ id }: { id: string }) => {
  const profile = await getRecruitsWithProfile(id);

  return (
    <>
      <UserProfileHeader profile={profile} className="my-8" variant="default" />
      <ProfilesRecruitList recruits={profile.recruits_creator} />
    </>
  );
});

ProfileWithRecruits.displayName = "ProfileWithRecruits";

export default ProfileWithRecruits;
