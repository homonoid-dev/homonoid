import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/shell";
import { AppSidebar } from "@/components/ui/sidebar";
import { TocProvider, Toc } from "@/components/ui/toc";

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
        <Shell>
          <Shell.Sidebar>
            <AppSidebar />
          </Shell.Sidebar>
          <Shell.Main>
            <TocProvider>
              <div className="flex justify-between w-full min-h-full">
                <div className="flex-1 min-w-0">
                  {children}
                </div>
                <Toc />
              </div>
            </TocProvider>
          </Shell.Main>
        </Shell>
      </body>
    </html>
  );
}
