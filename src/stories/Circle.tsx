import React from "react";
import { tv } from "tailwind-variants";

const circleVariants = tv({
  base: "w-14 h-14 p-2 rounded-full",
  variants: {
    variant: {
      orange: "bg-orange-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
    },
  },
  defaultVariants: {
    variant: "orange",
  },
});

interface CircleProps {
  variant?: "orange" | "green" | "yellow";
}

/**
 * 円コンポーネントです。
 * @param variant - 円の色
 * @returns 円コンポーネント
 */
const Circle = ({ variant }: CircleProps) => {
  return <div className={circleVariants({ variant })}></div>;
};

export default Circle;
