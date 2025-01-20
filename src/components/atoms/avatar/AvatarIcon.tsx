import React, { forwardRef, memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIconProps } from "@/types/types";

const AvatarIcon = memo(
  forwardRef<HTMLDivElement, AvatarIconProps>(
    ({ className, ImageSrc, fallbackText }, ref) => {
      return (
        <Avatar ref={ref} className={className}>
          <AvatarImage src={ImageSrc} />
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </Avatar>
      );
    },
  ),
);

AvatarIcon.displayName = "AvatarIcon";

export default AvatarIcon;
