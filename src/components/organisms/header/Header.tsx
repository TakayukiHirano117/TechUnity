import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import { Skeleton } from "@/components/ui/skeleton";

import HeaderIndex from "./HeaderIndex";

const Header: React.FC = () => {
  return (
    <header className="border-b px-2 ">
      <div className="container mx-auto lg:px-20 py-3">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image src="/Logo.png" alt="logo" width={120} height={120} />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Suspense
              fallback={<Skeleton className="w-40 h-10 rounded-full" />}
            >
              <HeaderIndex />
            </Suspense>
          </div>
          <Toaster />
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
