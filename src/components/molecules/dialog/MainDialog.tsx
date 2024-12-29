import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { MainDialogProps } from "@/types/types";
import React, { ReactNode } from "react";

const MainDialog = ({
	title,
	description,
	trigger,
	children,
}: MainDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center sm:text-2xl md:text-3xl lg:text-4xl">
						{title}
					</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default MainDialog;
