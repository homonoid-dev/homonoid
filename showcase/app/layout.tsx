import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header";

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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
