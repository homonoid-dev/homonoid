"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Destination({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${isSelected ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
    >
      {children}
    </Link>
  );
}
