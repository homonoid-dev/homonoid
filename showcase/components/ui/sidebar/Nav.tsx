"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Searchbar } from "@homonoid/react";
import { Sidebar } from "./Sidebar";
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
    <Sidebar>
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
      {filteredComponents.map((component) => (
        <Sidebar.Item
          key={component.href}
          href={component.href}
          onClick={() => setQuery("")}
        >
          {component.name}
        </Sidebar.Item>
      ))}
    </Sidebar>
  );
}

