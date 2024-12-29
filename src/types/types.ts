import { ReactNode } from "react";

export type MainButtonProps = {
	children: React.ReactNode;
	className?: string;
	variant?:
		| "outline"
		| "link"
		| "default"
		| "destructive"
		| "secondary"
		| "ghost"
		| null
		| undefined;
	onClick?: () => void;
};

export type SearchIconProps = {
	className?: string;
};

export type AvatarIconProps = {
	className?: string;
	ImageSrc: string;
	fallbackText: string;
};

export type MainDialogProps = {
	title: string;
	description: string;
	trigger: ReactNode;
	children: ReactNode;
};
