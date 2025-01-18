export const getProfile = async () => {
  const res = await fetch("http://localhost:3000/api/dashboard/profiles");
  const profile = await res.json();
  return profile;
};

export const getRecruitsWithProfile = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/profiles/${id}`);
  return res.json();
};
