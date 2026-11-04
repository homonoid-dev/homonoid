import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar";
import { Inspector } from "@/components/ui/inspector";
import { TocProvider, Dock } from "@/components/ui/toc";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Shell>
      <Shell.Sidebar>
        <Sidebar />
      </Shell.Sidebar>
      <Shell.Main>
        <TocProvider>
          <div className="flex justify-between w-full min-h-full">
            <div className="flex-1 min-w-0">{children}</div>
            <Inspector />
          </div>
          <Dock />
        </TocProvider>
      </Shell.Main>
    </Shell>
  );
}
