import React from "react";

const LogoutIcon = ({
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
        d="m21.207 11.793l-5.914 5.914l-1.414-1.414l3.5-3.5H7.793v-2h9.586l-3.5-3.5l1.414-1.414l5.914 5.914Zm-11.414-7.5h-5v15h5v2h-7v-19h7v2Z"
      />
    </svg>
  );
};

export default LogoutIcon;
