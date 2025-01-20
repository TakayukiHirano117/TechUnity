import React, { memo } from "react";

import DashBoardRecruitCard from "./card/DashBoardRecruitCard";

const DashBoardRecruitList = memo(
  ({
    recruits,
  }: {
    recruits: {
      id: string;
      title: string;
      createdAt: string;
      isPublished: boolean;
      creator: {
        id: string;
      };
      likes: {
        userId: string;
      }[];
      applications: {
        user: {
          id: string;
          name: string;
          image: string | null;
        };
      }[];
      hires: {
        userId: string;
        user: {
          id: string;
          name: string;
          image: string | null;
        };
      }[];
    }[];
  }) => {
    return (
      <>
        {recruits.map((recruit) => (
          <DashBoardRecruitCard key={recruit.id} recruit={recruit} />
        ))}
      </>
    );
  },
);

DashBoardRecruitList.displayName = "DashBoardRecruitList";

export default DashBoardRecruitList;
