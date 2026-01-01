"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <Image src={"error.svg"} alt="error" width={300} height={300} />
      <h2 className="text-slate-600 font-bold">エラーが発生しました！</h2>
      <Button type="button" onClick={() => reset()} className="font-bold rounded-full">
        もう一度実行する
      </Button>
    </div>
  );
}
