import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar/sidebar";

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
            <Sidebar></Sidebar>
          </Shell.Side>
          <Shell.Main>
            {children}
          </Shell.Main>
        </Shell>
      </body>
    </html>
  );
}
