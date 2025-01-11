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
