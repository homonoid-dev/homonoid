import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar";
import { Inspector } from "@/components/ui/inspector";

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
        <div className="flex justify-between w-full min-h-full">
          <div className="flex-1 min-w-0">{children}</div>
          <Inspector />
        </div>
      </Shell.Main>
    </Shell>
  );
}
