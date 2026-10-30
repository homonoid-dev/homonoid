"use client";

import { usePathname } from "next/navigation";
import { Shell } from "./shell";
import { Nav } from "@/components/ui/sidebar";
import { TocProvider, Toc } from "@/components/ui/toc";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <Shell>
        <Shell.Main>{children}</Shell.Main>
      </Shell>
    );
  }

  return (
    <Shell>
      <Shell.Sidebar>
        <Nav />
      </Shell.Sidebar>
      <Shell.Main>
        <TocProvider>
          <div className="flex justify-between w-full min-h-full">
            <div className="flex-1 min-w-0">{children}</div>
            <Toc />
          </div>
        </TocProvider>
      </Shell.Main>
    </Shell>
  );
}

