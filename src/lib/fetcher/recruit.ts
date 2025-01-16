import { DashBoardRecruits } from "@/types/types";

export const createRecruit = async (data: {
  title: string;
  content: string;
  isPublished: boolean;
}) => {
  await fetch("/api/recruits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteRecruit = async (id: string) => {
  const response = await fetch(`/api/recruit/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return response.json();
};

export const getAllRecruits = async () => {
  const res = await fetch("http://localhost:3000/api/recruits", {
    cache: "no-store",
  });
  
  return res.json();
};


export const getEditRecruitDetail = async (id: string) => {
  const response = await fetch(`/api/recruit/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  return response.json();
};

export const getRecruitDetail = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/recruits/${id}`, {
    cache: "no-cache",
  });
  return response.json();
};


// ユーザーを採用する
// export const hireUser = async (recruitId: string, userId: string) => {
//   await fetch(`/api/recruit/${recruitId}/hire`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

export const getRecruitsWithUser = async (): Promise<DashBoardRecruits[]> => {
  const res = await fetch("/api/dashboard/recruits");
  const recruits = await res.json();
  return recruits;
};