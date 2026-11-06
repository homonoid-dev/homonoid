import type { ReactNode } from "react";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar";
import { Inspector } from "@/components/ui/inspector";

export interface ComponentsLayoutProps {
  children: ReactNode;
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  return (
    <Shell>
      <Sidebar />
      <Shell.Main>
        {children}
      </Shell.Main>
      <Inspector />
    </Shell>
  );
}

