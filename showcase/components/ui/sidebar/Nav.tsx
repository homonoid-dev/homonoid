"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Searchbar, Sidebar } from "@homonoid/react";
import { COMPONENTS } from "@/config/components";

export function Nav() {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setQuery("");
  }, [pathname]);

  const filteredComponents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMPONENTS;
    return COMPONENTS.filter((component) =>
      component.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Sidebar width="w-58" className="select-none">
      <Sidebar.Header sticky>
        <Searchbar
          size="sm"
          radius="lg"
          placeholder="Search components"
          leading={<Search className="size-3.5 text-muted shrink-0" />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full backdrop-blur-sm"
        />
      </Sidebar.Header>
      <Sidebar.Content>
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
}
