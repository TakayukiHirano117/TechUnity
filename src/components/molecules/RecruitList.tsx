import { Application, Hire, Like } from "@prisma/client";
import Image from "next/image";
import React, { memo } from "react";

import RecruitCard from "@/components/molecules/card/RecruitCard";

const RecruitList = memo(
  ({
    recruits,
  }: {
    recruits: {
      id: number;
      title: string;
      content: string;
      creator: {
        id: string;
        name: string;
        image: string;
      };
      createdAt: string;
      updatedAt: string;
      isPublished: boolean;
      likes: Like[];
      applications: Application[];
      hires: Hire[];
    }[];
  }) => {

    console.log(recruits)

    return (
      <>
        {recruits?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {recruits.map((recruit) => (
              <RecruitCard
                key={recruit.id}
                id={recruit.id}
                title={recruit.title}
                description={recruit.content}
                authorName={recruit?.creator?.name || "匿名"}
                authorId={recruit?.creator?.id || ""}
                avatarImageSrc={
                  recruit?.creator?.image || "/default-avatar.png"
                }
                publishedAt={recruit.createdAt}
                likes={recruit.likes || []}
                applications={recruit.applications || []}
                hires={recruit.hires || []}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 justify-center text-gray-500">
            <Image
              src="/undraw_empty_4zx0.svg"
              width={300}
              height={300}
              alt="no data"
            />
            <h2>該当する募集が見つかりませんでした。</h2>
          </div>
        )}
      </>
    );
  },
);

RecruitList.displayName = "RecruitList";

export default RecruitList;
