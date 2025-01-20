import React from "react";

const PencilIcon = ({
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
      <g
        id="feEdit0"
        fill="none"
        fillRule="evenodd"
        stroke="none"
        strokeWidth="1"
      >
        <g id="feEdit1" fill="currentColor">
          <path
            id="feEdit2"
            d="M5 20h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm-1-5L14 5l3 3L7 18H4v-3ZM15 4l2-2l3 3l-2.001 2.001L15 4Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default PencilIcon;
