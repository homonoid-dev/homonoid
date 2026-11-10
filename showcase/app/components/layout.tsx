import type { ReactNode } from "react";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/app-sidebar";
import { Inspector, InspectorProvider } from "@/components/ui/inspector";

export interface ComponentsLayoutProps {
  children: ReactNode;
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  return (
    <InspectorProvider>
      <Shell>
        <Sidebar />
        <Shell.Main>
          {children}
        </Shell.Main>
        <Inspector />
      </Shell>
    </InspectorProvider>
  );
}

