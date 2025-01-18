import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const deleteRecruit = async (
	id: string,
	router: AppRouterInstance,
) => {
	await fetch(`/api/recruits/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	router.refresh();
};
