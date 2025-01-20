export const searchRecruits = async (q: string) => {
  const res = await fetch(
    `http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
  );

  return res.json();
};
