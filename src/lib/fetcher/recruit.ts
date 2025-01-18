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

export const updateRecruit = async (
  id: string,
  data: {
    title: string;
    content: string;
    isPublished: boolean;
  },
) => {
  const res = await fetch(`/api/recruits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getAllRecruits = async () => {
  const res = await fetch("https://tech-unity.vercel.app/api/recruits", {
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
  const response = await fetch(
    `https://tech-unity.vercel.app/api/recruits/${id}`,
    {
      cache: "no-cache",
    },
  );
  return response.json();
};
