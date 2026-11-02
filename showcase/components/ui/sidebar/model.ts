import type { LucideIcon } from "lucide-react";
import {
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface SidebarSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const SIDEBAR_SECTIONS: Record<string, SidebarSectionItem> = {
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Infinity,
  },
  accessibility: {
    id: "accessibility",
    label: "Accessibility",
    icon: Accessibility,
  },
  tokens: {
    id: "design-tokens",
    label: "Design Tokens",
    icon: Palette,
  },
  styleReference: {
    id: "style-reference",
    label: "Style Reference",
    icon: BookOpen,
  },
};

export const SIDEBAR_SECTIONS_LIST: SidebarSectionItem[] =
  Object.values(SIDEBAR_SECTIONS);

export const SIDEBAR_LIVE_CODE_SAMPLE = `"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Searchbar, Sidebar } from "@homonoid/react";
import { SHOWCASE_COMPONENTS } from "@/config/components";

export function Nav() {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setQuery("");
  }, [pathname]);

  const filteredComponents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SHOWCASE_COMPONENTS;
    return SHOWCASE_COMPONENTS.filter((component) =>
      component.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Sidebar width="w-58" className="select-none">
      <Sidebar.Header sticky>
        <Searchbar
          size="sm"
          radius="lg"
          variant="contained"
          placeholder="Search components"
          leading={<Search className="size-3.5 text-muted shrink-0" />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </Sidebar.Header>
      <Sidebar.Content className="gap-control-gap px-surface-sm pb-surface-sm">
        {filteredComponents.map((component) => (
          <Sidebar.Item
            key={component.href}
            as={Link}
            href={component.href}
            active={pathname === component.href}
            onClick={() => setQuery("")}
          >
            {component.name}
          </Sidebar.Item>
        ))}
      </Sidebar.Content>
    </Sidebar>
  );
}`;

export const SIDEBAR_DEFAULT_CODE_SAMPLE = SIDEBAR_LIVE_CODE_SAMPLE;

