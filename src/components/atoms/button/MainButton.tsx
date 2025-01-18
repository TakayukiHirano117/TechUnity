import React, { forwardRef, memo } from "react";

import { Button } from "@/components/ui/button";
import { MainButtonProps } from "@/types/types";

// React.forwardRefを使ってrefを受け渡す
const MainButton = memo(
  forwardRef<HTMLButtonElement, MainButtonProps>(
    ({ children, className, variant, ...props }, ref) => {
      return (
        <Button ref={ref} className={className} variant={variant} {...props}>
          {children}
        </Button>
      );
    },
  ),
);

// 名前付きエクスポートの表示名を設定（デバッグ時に役立つ）
MainButton.displayName = "MainButton";

export default MainButton;
