import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar";
import { TocProvider, Toc } from "@/components/ui/toc";
import { SHOWCASE_COMPONENTS } from "@/config/components";

export const metadata: Metadata = {
  title: "Homonoid",
  description: "Homonoid Design System",
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
            <Shell.Sidebar>
              <Sidebar>
                {SHOWCASE_COMPONENTS.map((component) => (
                  <Sidebar.Item
                    key={component.href}
                    href={component.href}
                  >
                    {component.name}
                  </Sidebar.Item>
                ))}
              </Sidebar>
            </Shell.Sidebar>
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
