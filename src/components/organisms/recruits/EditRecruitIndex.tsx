import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { memo } from "react";

import EditRecruit from "@/components/molecules/EditRecruit";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const getEditRecruitDetail = async (id: string) => {
  const response = await fetch(`${baseURL}/api/recruits/${id}/edit`, {
    cache: "no-store",
    headers: Object.fromEntries(headers()),
  });
  return response.json();
};

const EditRecruitIndex = memo(async ({ id }: { id: string }) => {
  const recruit = await getEditRecruitDetail(id);

  if (recruit.redirect) {
    redirect(recruit.redirect);
  }

  return <EditRecruit recruit={recruit} />;
});

EditRecruitIndex.displayName = "EditRecruitIndex";

export default EditRecruitIndex;
