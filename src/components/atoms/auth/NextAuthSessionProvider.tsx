"use client";

import { SessionProvider } from "next-auth/react";
import React, { memo, ReactNode } from "react";

const NextAuthSessionProvider = memo(
  ({ children }: { children: ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>;
  },
);

NextAuthSessionProvider.displayName = "NextAuthSessionProvider";

export default NextAuthSessionProvider;
