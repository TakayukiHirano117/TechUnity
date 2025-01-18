export const getProfile = async () => {
  const res = await fetch(
    "https://tech-unity.vercel.app/api/dashboard/profiles",
  );
  const profile = await res.json();
  return profile;
};

export const getRecruitsWithProfile = async (id: string) => {
  const res = await fetch(
    `https://tech-unity.vercel.app/api/profiles/${id}`,
  );
  return res.json();
};
