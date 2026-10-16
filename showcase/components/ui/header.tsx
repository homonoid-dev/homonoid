"use client";

import Link from "next/link";

export function Header() {
  return (
    <div className="h-15 w-full border-b-[0.5px] border-border/50 px-layout-x">
      <div className="h-full mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          <span>Harmonia</span>
        </Link>
      </div>
    </div>
  );
}