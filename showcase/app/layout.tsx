import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Shell } from "@/components/layout/shell";
import { Sidebar, Destination } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Harmonia — Component System",
  description: "Harmonia Design System Component Showcase",
};

const components = [
  { name: "Button", href: "/button" },
  { name: "Input", href: "/input" },
  { name: "Spinner", href: "/spinner" },
];

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
            <Sidebar className="gap-surface-gap flex flex-col py-surface">
              {components.map((component) => (
                <Destination
                  key={component.href}
                  href={component.href}
                >
                  {component.name}
                </Destination>
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
