export const getRecruitDetail = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/recruits/${id}`, {
    cache: "no-cache",
  });
  return response.json();
};
