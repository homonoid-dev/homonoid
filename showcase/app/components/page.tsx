"use client";

import { useState, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { Resource } from "@/components/ui/resource";
import { Exhibit } from "@/components/ui/exhibit";
import { SHOWCASE_COMPONENTS } from "@/config/components";
import {
  Card,
  Label,
  Heading,
  Description,
  Button,
  Checkbox,
  Input,
  Kbd,
  Searchbar,
  Spinner,
  Switch,
  Tile,
} from "@homonoid/react";

const CATEGORIES = [
  "All",
  "Actions",
  "Inputs",
  "Layout",
  "Overlays",
  "Typography",
  "Feedback",
] as const;

const PREVIEWS: Record<string, ReactNode> = {
  Button: (
    <Button size="sm" variant="contained">
      Action
    </Button>
  ),
  Card: (
    <div className="w-16 h-12 rounded-xl border border-border bg-surface flex items-center justify-center shadow-xs">
      <div className="w-8 h-1.5 rounded-full bg-muted/40" />
    </div>
  ),
  Checkbox: <Checkbox defaultChecked size="sm" />,
  Description: (
    <div className="flex flex-col gap-1 w-20">
      <div className="w-full h-1.5 rounded-full bg-muted/40" />
      <div className="w-3/4 h-1.5 rounded-full bg-muted/20" />
    </div>
  ),
  Dropdown: (
    <Button size="sm" radius="md" variant="outlined" color="surface" trailing={<ChevronDown className="size-3" />}>
      Menu
    </Button>
  ),
  Input: <Input size="sm" placeholder="Text..." className="w-28 text-xs" readOnly />,
  Kbd: <Kbd keyValue="command" content="K" />,
  Label: <Label size="sm" className="font-semibold">Headline</Label>,
  Modal: (
    <div className="w-20 h-14 rounded-lg border border-border bg-surface shadow-md flex flex-col p-1.5 gap-1.5">
      <div className="w-10 h-1.5 rounded bg-foreground/60" />
      <div className="w-14 h-1 rounded bg-muted/30" />
    </div>
  ),
  Popover: (
    <div className="px-2.5 py-1.5 rounded-lg border border-border bg-surface text-xs shadow-sm">
      Popup
    </div>
  ),
  Searchbar: <Searchbar size="sm" placeholder="Search..." className="w-28 text-xs" readOnly />,
  Select: (
    <Button size="sm" radius="md" variant="outlined" color="surface" trailing={<ChevronsUpDown className="size-3" />}>
      Select
    </Button>
  ),
  Separator: <div className="w-20 h-[0.5px] bg-border" />,
  Spinner: <Spinner size="md" />,
  Switch: <Switch defaultChecked size="sm" />,
  Tile: (
    <Tile size="sm" variant="contained" radius="md" className="w-28 text-xs">
      Item
    </Tile>
  ),
  Tooltip: (
    <div className="px-2.5 py-1 rounded-md bg-foreground text-background text-[11px] font-medium shadow-sm">
      Tooltip
    </div>
  ),
};

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredComponents = useMemo(() => {
    if (activeCategory === "All") return SHOWCASE_COMPONENTS;
    return SHOWCASE_COMPONENTS.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col px-layout-x pt-layout-y pb-layout-y gap-layout-gap w-full">
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Components</Heading>
          <Description>
            Explore the foundational building blocks of the Homonoid Design System.
          </Description>
        </div>
        <div className="flex items-center gap-surface-gap">
          <Resource type="github" />
          <Resource type="npm" />
        </div>
        <Description>
          Every component is engineered with strict design token hierarchy, continuous state transitions, and native platform accessibility across every surface. They are designed to preserve spatial identity and dimensional stability throughout complex workflows, giving interfaces a refined feel that adapts effortlessly to user interactions.
        </Description>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center gap-control-gap flex-wrap">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "contained" : "plain"}
            color="surface"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-surface">
        {filteredComponents.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="cursor-pointer block"
          >
            <Card
              className="aspect-square rounded-3xl flex flex-col justify-between cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center pointer-events-none select-none">
                {PREVIEWS[component.name]}
              </div>
              <Label size="md" className="self-start">
                {component.name}
              </Label>
            </Card>
          </Link>
        ))}
      </div>

      {/* Homonoid Core Values and Considerations */}
      <div className="flex flex-col pt-layout-y">
        <Exhibit.Section title="Object Continuity">
          <Description>
            Interfaces behave as coherent systems where every component maintains permanence and spatial identity. State transitions evolve smoothly rather than reconstructing elements abruptly, ensuring users preserve visual orientation during interaction.
          </Description>
        </Exhibit.Section>

        <Exhibit.Section title="Physical Motion">
          <Description>
            Motion in Homonoid is never decorative filler. Fluid spring curves and micro scale compressions convey tactile feedback, communicate hierarchy shifts, and reinforce physical manipulation across every interaction.
          </Description>
        </Exhibit.Section>

        <Exhibit.Section title="Inclusive Architecture">
          <Description>
            Native accessibility is engineered directly into component foundations. Complete semantic landmarks, compliant contrast ratios, and intuitive keyboard navigation ensure every interface adapts effortlessly across assistive technologies.
          </Description>
        </Exhibit.Section>

        <Exhibit.Section title="Token Hierarchy">
          <Description>
            All styling consumes standardized spatial, typographic, and surface tokens with zero hardcoded values. Design tokens adapt dynamically across light and dark modes while maintaining rigorous aesthetic harmony.
          </Description>
        </Exhibit.Section>
      </div>
    </div>
  );
}
