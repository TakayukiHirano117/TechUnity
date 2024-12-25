import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIconProps } from "@/types/types";
import React from "react";

const AvatarIcon = ({className, ImageSrc, fallbackText}: AvatarIconProps) => {
	return (
		<Avatar className={className}>
			<AvatarImage src={ImageSrc} />
			<AvatarFallback>{fallbackText}</AvatarFallback>
		</Avatar>
	);
};

export default AvatarIcon;