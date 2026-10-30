import { Shell } from "@/components/layout/shell";
import { Nav } from "@/components/ui/sidebar";
import { TocProvider, Toc } from "@/components/ui/toc";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

