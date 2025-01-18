import React from "react";

import DashBoardRecruitCard from "./card/DashBoardRecruitCard";

const DashBoardRecruitList = ({
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
  console.log(recruits);
  return (
    <>
      {recruits.map((recruit) => (
        <DashBoardRecruitCard key={recruit.id} recruit={recruit} />
      ))}
    </>
  );
};

export default DashBoardRecruitList;
