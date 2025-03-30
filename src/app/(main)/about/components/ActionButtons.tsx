"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";
import LoginDialog from "@/components/molecules/dialog/LoginDialog";

const ActionButtons = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        プロジェクトを探す
      </Link>

      {session ? (
        <Link href={"/recruits/create"}>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            メンバーを探す
          </button>
        </Link>
      ) : (
        <LoginDialog
          trigger={
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              メンバーを探す
            </button>
          }
        />
      )}
    </div>
  );
};

export default ActionButtons;
