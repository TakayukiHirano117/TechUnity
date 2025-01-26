import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    
    // tokenがあるかどうかで認証状態を判定しisAuthに真偽値で格納
    const isAuth = !!token;

    // const isAuthPage =
    //   req.nextUrl.pathname.startsWith("/login") ||
    //   req.nextUrl.pathname.startsWith("/register");

    // if (isAuthPage) {
    //   if (isAuth) {
    //     return NextResponse.redirect(new URL("/", req.url));
    //   }

    //   return null;
    // }

    if (!isAuth) {
      // 401ページにリダイレクトさせるのは各route.tsで行う。
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

// 募集一覧・募集詳細・検索結果ページは認証不要
export const config = {
  matcher: ["/recruits/create", "/recruits/:path*/edit", "/dashboard/:path*"],
};
