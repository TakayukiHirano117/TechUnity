import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
	async function middleware(req) {
		const token = await getToken({ req });
		// console.log(token);
		const isAuth = !!token;
		const isAuthPage =
			req.nextUrl.pathname.startsWith("/login") ||
			req.nextUrl.pathname.startsWith("/register");

		// console.log(req.url);

		if (isAuthPage) {
			if (isAuth) {
				return NextResponse.redirect(new URL("/", req.url));
			}

			return null;
		}

		if (!isAuth) {
			// 401ページにリダイレクトさせたい。
			return NextResponse.redirect(new URL("/unauthorized", req.url));
		}

		// 認証されていない場合はリダイレクト
		// if (!isAuth) {
		// 	return NextResponse.redirect(new URL("/", req.url));
		// }
	},
	{
		callbacks: {
			async authorized() {
				// if(token.role === "admin") true;
				return true;
			},
		},
	},
);

export const config = {
	// 一覧ページ・詳細ページなどは認証不要にすること。
	matcher: ["/recruits/create", "/recruits/[id]/edit", "/dashboard/:path*"],
};

// 