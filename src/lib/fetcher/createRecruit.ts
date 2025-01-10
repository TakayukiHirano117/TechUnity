export const createRecruit = async (data: {
	title: string;
	content: string;
	isPublished: boolean;
}) => {
	await fetch("/api/recruits", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};
