import React, { Suspense } from "react";

import LoadingIcon from "@/components/atoms/Icon/LoadingIcon";
import EditRecruitIndex from "@/components/organisms/recruits/EditRecruitIndex";

const EditRecruitPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="bg-slate-100 w-full">
      <div className="max-w-[960px] mx-auto p-8 container">
        <Suspense
          fallback={
            <div className="flex space-y-3 justify-between">
              <div className="mx-auto h-screen mt-3">
                <LoadingIcon
                  width="40"
                  height="40"
                  className="animate-spin text-slate-600"
                />
              </div>
            </div>
          }
        >
          <EditRecruitIndex id={params.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default EditRecruitPage;
