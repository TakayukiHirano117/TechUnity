import React from "react";
import { Button } from "@/components/ui/button";
import { SampleButtonProps } from "@/types/types";

// React.forwardRefを使ってrefを受け渡す
const SampleButton = React.forwardRef<HTMLButtonElement, SampleButtonProps>(
	({ children, className, variant, ...props }, ref) => {
		return (
			<Button ref={ref} className={className} variant={variant} {...props}>
				{children}
			</Button>
		);
	},
);

// 名前付きエクスポートの表示名を設定（デバッグ時に役立つ）
SampleButton.displayName = "SampleButton";

export default SampleButton;
