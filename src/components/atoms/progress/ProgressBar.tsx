"use client";

import { AppProgressBar } from "next-nprogress-bar";
import React from "react";

const ProgressBar = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			{children}
			<AppProgressBar
				height="2px"
				color="#00bfff"
				options={{ showSpinner: false }}
				shallowRouting
			/>
		</div>
	);
};

export default ProgressBar;
