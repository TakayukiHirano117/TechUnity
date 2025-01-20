import EditRecruit from "@/components/molecules/EditRecruit";
import { headers } from "next/headers";
import React from "react";

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const getEditRecruitDetail = async (id: string) => {
  const response = await fetch(`${baseURL}/api/recruits/${id}/edit`, {
    cache: "no-store",
    headers: Object.fromEntries(headers()),
  });
  return response.json();
};

const EditRecruitIndex = async ({ id }: { id: string }) => {
  const recruit = await getEditRecruitDetail(id);

  return <EditRecruit recruit={recruit} />;
};

export default EditRecruitIndex;
