export const getProfile = async () => {
  const res = await fetch(
    "https://tech-unity-mfceb5s69-takayukihirano117s-projects-caaa37ec.vercel.app/api/dashboard/profiles",
  );
  const profile = await res.json();
  return profile;
};

export const getRecruitsWithProfile = async (id: string) => {
  const res = await fetch(
    `https://tech-unity-mfceb5s69-takayukihirano117s-projects-caaa37ec.vercel.app/api/profiles/${id}`,
  );
  return res.json();
};
