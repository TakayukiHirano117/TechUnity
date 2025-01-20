"use client";

import { AppProgressBar } from "next-nprogress-bar";
import React, { memo } from "react";

const ProgressBar = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <AppProgressBar
        height="2px"
        color="#00bfff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
