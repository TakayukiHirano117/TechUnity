import useSWR, { mutate } from "swr";

// POSTリクエストを送信するヘルパー関数
const toggleLike = async (url: string) => {
	const response = await fetch(url, { method: "POST" });
	console.log(response);
	if (!response.ok) {
		throw new Error("Failed to toggle like");
	}
	return response.json();
};

// いいね状態を取得および管理するカスタムフック
export const useLike = (id: string) => {
	const toggle = async () => {
		await toggleLike(`/api/recruits/${id}/like`);
		mutate(`/api/recruits/${id}/like`); // いいね状態を更新
	};

	return {
		toggle,
	};
};
