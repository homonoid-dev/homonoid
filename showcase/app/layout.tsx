import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar";
import { TocProvider, Toc } from "@/components/ui/toc";
import { SHOWCASE_COMPONENTS } from "@/config/components";

export const metadata: Metadata = {
  title: "Harmonia — Component System",
  description: "Harmonia Design System Component Showcase",
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
              {children}
            </Shell.Main>
            <Toc />
          </Shell>
        </TocProvider>
      </body>
    </html>
  );
}
