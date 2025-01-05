import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextAuthSessionProvider from "@/components/atoms/auth/NextAuthSessionProvider";
import ProgressBar from "@/components/atoms/progress/ProgressBar";
import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";
import DefaultLayout from "@/components/templates/DefaultLayout";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "TechUnity | チーム開発メンバー募集プラットフォーム",
	description: "TechUnityはチーム開発メンバー募集プラットフォームです。",
	icons: {
		icon: "/favicon.ico",
	},
	keywords: [
		"TechUnity",
		"チーム開発",
		"メンバー募集",
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"React",
		"Vercel",
		"Prisma",
	],
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "https://techunity.vercel.app/",
		siteName: "TechUnity",
		images: [
			// {
			// 	url: "https://techunity.vercel.app/ogp.png",
			// 	width: 1200,
			// 	height: 630,
			// 	alt: "TechUnity",
			// },
		],
	},
	twitter: {
		site: "@TechUnity",
		card: "summary_large_image",
		images: [],
		creator: "TakayukiHirano117"
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-[screen]`}
			>
				<DefaultLayout>{children}</DefaultLayout>
			</body>
		</html>
	);
}
