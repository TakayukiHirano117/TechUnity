import React from "react";

const GearIcon = ({
	width,
	height,
	className,
}: {
	width: string;
	height: string;
	className?: string;
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			className={className}
		>
			<g fill="currentColor">
				<path d="M12 4a1 1 0 0 0-1 1c0 1.692-2.046 2.54-3.243 1.343a1 1 0 1 0-1.414 1.414C7.54 8.954 6.693 11 5 11a1 1 0 1 0 0 2c1.692 0 2.54 2.046 1.343 3.243a1 1 0 0 0 1.414 1.414C8.954 16.46 11 17.307 11 19a1 1 0 1 0 2 0c0-1.692 2.046-2.54 3.243-1.343a1 1 0 1 0 1.414-1.414C16.46 15.046 17.307 13 19 13a1 1 0 1 0 0-2c-1.692 0-2.54-2.046-1.343-3.243a1 1 0 0 0-1.414-1.414C15.046 7.54 13 6.693 13 5a1 1 0 0 0-1-1zm-2.992.777a3 3 0 0 1 5.984 0a3 3 0 0 1 4.23 4.231a3 3 0 0 1 .001 5.984a3 3 0 0 1-4.231 4.23a3 3 0 0 1-5.984 0a3 3 0 0 1-4.231-4.23a3 3 0 0 1 0-5.984a3 3 0 0 1 4.231-4.231z" />
				<path d="M12 10a2 2 0 1 0 0 4a2 2 0 0 0 0-4zm-2.828-.828a4 4 0 1 1 5.656 5.656a4 4 0 0 1-5.656-5.656z" />
			</g>
		</svg>
	);
};

export default GearIcon;
