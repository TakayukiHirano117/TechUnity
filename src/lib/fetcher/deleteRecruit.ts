export const deleteRecruit = async (id: string) => {
  const response = await fetch(`/api/recruit/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return response.json();
};
