"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 px-layout-x border-b border-border/50 bg-background backdrop-blur ">
      <div className="h-15 mx-auto flex  items-center justify-between">
        <Link href="/" className="text-lg font-bold" >
          <span>Harmonia</span>
        </Link>
      </div>
    </header>
  );
}