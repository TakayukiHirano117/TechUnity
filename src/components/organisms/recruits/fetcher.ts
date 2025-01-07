"import server-only";

export const getAllRecruits = async () => {
	const res = await fetch("http://localhost:3000/api/recruits");
	return res.json();
};
