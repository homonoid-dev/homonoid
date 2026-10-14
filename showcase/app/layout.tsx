import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar";

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
        <Shell>
          <Shell.Head>
            <Header />
          </Shell.Head>
          <Shell.Side>
            <Sidebar>
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="py-control-y text-base font-medium text-muted hover:text-foreground transition-colors cursor-pointer">
                  Item {i + 1}
                </p>
              ))}
            </Sidebar>
          </Shell.Side>
          <Shell.Main>
            {children}
          </Shell.Main>
        </Shell>
      </body>
    </html>
  );
}
