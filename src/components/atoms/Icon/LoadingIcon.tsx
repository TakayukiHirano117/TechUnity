import React from "react";

const LoadingIcon = ({
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
      <path
        fill="currentColor"
        d="M11.5 4A8.5 8.5 0 0 0 3 12.5H2A9.5 9.5 0 0 1 11.5 3v1Z"
      />
    </svg>
  );
};

export default LoadingIcon;
