import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar";
import { TocProvider, Toc } from "@/components/ui/toc";
import { SHOWCASE_COMPONENTS } from "@/config/components";

export const metadata: Metadata = {
  title: "Homonoid — Component System",
  description: "Homonoid Design System Component Showcase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>
        <TocProvider>
          <Shell>
            <Shell.Side>
              <Sidebar>
                <div className="flex flex-col gap-surface-gap px-layout-x py-surface">
                  {SHOWCASE_COMPONENTS.map((component) => (
                    <Sidebar.Destination
                      key={component.href}
                      href={component.href}
                    >
                      {component.name}
                    </Sidebar.Destination>
                  ))}
                </div>
              </Sidebar>
            </Shell.Side>
            <Shell.Main>
              <div className="flex justify-between w-full min-h-full">
                <div className="flex-1 min-w-0">
                  {children}
                </div>
                <Toc />
              </div>
            </Shell.Main>
          </Shell>
        </TocProvider>
      </body>
    </html>
  );
}
