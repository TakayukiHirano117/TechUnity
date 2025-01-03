import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const deleteRecruit = async (
	id: number,
	router: AppRouterInstance,
	endpoint: string,
) => {
	await fetch(`/api/recruits/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	router.push(endpoint);
};
