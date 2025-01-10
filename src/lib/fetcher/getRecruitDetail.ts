export const getRecruitDetail = async (id: string) => {
  const response = await fetch(`/api/recruit/${id}`);
  return response.json();
};
