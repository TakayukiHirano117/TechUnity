"import server-only";

export const getUserProfile = async (id: string) => {
	const res = await fetch(`http://localhost:3000/api/profiles/${id}`);
	return res.json();
};
