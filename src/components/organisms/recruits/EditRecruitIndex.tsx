import EditRecruit from "@/components/molecules/EditRecruit";
import { getEditRecruitDetail } from "@/lib/fetcher/recruit";
import React from "react";

const EditRecruitIndex = async ({ id }: { id: string }) => {
  const recruit = await getEditRecruitDetail(id);

  return <EditRecruit recruit={recruit} />;
};

export default EditRecruitIndex;
