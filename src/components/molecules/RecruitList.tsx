import { Application, Like } from "@prisma/client";
import Image from "next/image";
import React from "react";

import RecruitCard from "@/components/molecules/card/RecruitCard";

const RecruitList = ({
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
    // remainingCount: number;
  }[];
}) => {
  console.log(recruits);

  return (
    <>
      {recruits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {recruits.map((recruit) => (
            <RecruitCard
              key={recruit.id}
              id={recruit.id}
              title={recruit.title}
              description={recruit.content}
              authorName={recruit?.creator.name}
              authorId={recruit?.creator.id}
              avatarImageSrc={recruit?.creator.image}
              publishedAt={recruit.createdAt}
              likes={recruit.likes}
              applications={recruit.applications}
              // remainingCount={recruit?.remainingCount}
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
};

export default RecruitList;
