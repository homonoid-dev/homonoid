import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Harmonia — Component System",
  description: "Harmonia Design System Component Showcase",
};

const components = [
  { name: "Button", href: "/button" },
  { name: "Input", href: "/input" },
  { name: "Spinner", href: "/spinner" },
  { name: "Label", href: "/label" },
  { name: "Card", href: "/card" },
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
          <Shell.Side>
            <Sidebar>
              <div className="flex flex-col gap-surface-gap px-layout-x py-surface">
                {components.map((component) => (
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
        </Shell>
      </body>
    </html>
  );
}
