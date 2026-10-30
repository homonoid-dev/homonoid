"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Searchbar } from "@homonoid/react";
import { Sidebar } from "./Sidebar";
import { SHOWCASE_COMPONENTS } from "@/config/components";

export function AppSidebar() {
  const [query, setQuery] = useState("");

  const filteredComponents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SHOWCASE_COMPONENTS;
    return SHOWCASE_COMPONENTS.filter((component) =>
      component.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Sidebar>
      <Sidebar.Header sticky>
        <Searchbar
          size="sm"
          placeholder="Search..."
          radius="lg"
          leading={<Search className="size-3.5 text-muted shrink-0" />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </Sidebar.Header>
      {filteredComponents.map((component) => (
        <Sidebar.Item key={component.href} href={component.href}>
          {component.name}
        </Sidebar.Item>
      ))}
    </Sidebar>
  );
}
