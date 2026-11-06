"use client";

import { usePathname } from "next/navigation";
import { Sidebar as _Sidebar } from "@homonoid/react";
import { cn } from "@homonoid/react/cn";

export interface InspectorProps {
  className?: string;
  children?: React.ReactNode;
}

export function Inspector({ className, children }: InspectorProps) {
  const pathname = usePathname();

  if (pathname === "/components") {
    return null;
  }

  return (
    <_Sidebar
      side="right"
      width="w-58"
      className={cn(
        "sticky top-0 self-start h-screen shrink-0 hidden md:flex select-none",
        className
      )}
    >
      <_Sidebar.Content>{children}</_Sidebar.Content>
    </_Sidebar>
  );
}