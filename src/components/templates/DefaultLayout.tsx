import React, { ReactNode } from "react";
import NextAuthSessionProvider from "../atoms/auth/NextAuthSessionProvider";
import ProgressBar from "../atoms/progress/ProgressBar";
import Footer from "../organisms/footer/Footer";
import Header from "../organisms/header/Header";
import { Toaster } from "../ui/toaster";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<NextAuthSessionProvider>
				<Header />
				<ProgressBar>
					{children}
					<Toaster />
				</ProgressBar>
				<Footer />
			</NextAuthSessionProvider>
		</>
	);
};

export default DefaultLayout;
