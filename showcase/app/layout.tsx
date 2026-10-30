import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/layout";

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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
