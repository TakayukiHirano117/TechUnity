import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

const Footer: React.FC = memo(() => {
  return (
    <footer className="border-t">
      <div className="pt-12 container mt-auto max-w-[960px] mx-auto">
        <div className="mx-6 px-6 pb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-8">
            {/* ロゴと説明 */}
            <div className="flex flex-col items-center sm:items-start max-w-[250px] gap-2 mx-auto sm:mx-0">
              <Link href="/">
                <Image src="/Logo.png" alt="logo" width={100} height={100} />
              </Link>
              <p className="text-xs text-slate-600 text-center sm:text-left">
                チーム開発メンバー募集プラットフォーム
              </p>
            </div>
            {/* 各セクション */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto justify-between">
              {/* About */}
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold text-lg">About</h4>
                <Link href={"/about"} className="hover:underline text-sm">
                  TechUnityについて
                </Link>
              </div>
              {/* Guides */}
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold text-lg">Guides</h4>
                <Link href={"/about"} className="hover:underline text-sm">
                  使い方
                </Link>
              </div>
              {/* Links */}
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold text-lg">Links</h4>
                <Link
                  href={"https://github.com/TakayukiHirano117/TechUnity"}
                  className="hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </div>
              {/* Legal */}
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold text-lg">Legal</h4>
                <Link href={"/about"} className="hover:underline text-sm">
                  利用規約
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ボトムライン */}
        <div className="w-full border-t">
          <div className="container mx-auto text-center py-8">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()}{" "}
              <Link
                href={"https://github.com/TakayukiHirano117"}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                TakayukiHirano117
              </Link>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
