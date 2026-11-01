"use client";

import { useState, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, ChevronsUpDown, ChevronRight, Plus, Bell } from "lucide-react";
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
  Tooltip,
  Badge,
  Breadcrumb,
  Stepper,
  Textarea,
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
  Accordion: (
    <Card padding="none" variant="filled" className="p-2 rounded-lg">
      <div className="flex flex-col gap-1 w-20">
        <div className="flex items-center justify-between">
          <div className="w-12 h-1.5 rounded-full bg-muted/40" />
          <ChevronDown className="size-2 text-muted" />
        </div>
        <div className="w-full h-px bg-border/40" />
        <div className="flex items-center justify-between">
          <div className="w-10 h-1.5 rounded-full bg-muted/40" />
          <ChevronDown className="size-2 text-muted" />
        </div>
      </div>
    </Card>
  ),
  Autocomplete: (
    <div className="flex flex-col gap-1.5">
      <Card padding="none" variant="filled" className="flex flex-col p-2 gap-1.5 rounded-lg">
        <div className="flex flex-row gap-0.5 items-center w-20">
          <div className="h-1.5 shrink-0 aspect-square rounded-full bg-muted/30" />
          <div className="w-full h-1.5 rounded-full bg-muted/30" />
        </div>
      </Card>
      <Card padding="none" variant="filled" className="flex flex-col p-2 gap-1.5 rounded-lg">
        <div className="w-full h-1.5 rounded-full bg-muted/20" />
        <div className="w-3/4 h-1.5 rounded-full bg-muted/20" />
      </Card>
    </div>
  ),
  Badge: (
    <Badge size="sm" count={3} placement="top-right" color="destructive">
      <Button size="sm" layout="icon" variant="outlined" color="surface">
        <Bell className="size-3" />
      </Button>
    </Badge>
  ),
  Breadcrumb: (
    <div className="flex items-center gap-1">
      <div className="w-5 h-1.5 rounded-full bg-muted/40" />
      <ChevronRight className="size-2 text-muted/40" />
      <div className="w-7 h-1.5 rounded-full bg-muted/40" />
      <ChevronRight className="size-2 text-muted/40" />
      <div className="w-6 h-1.5 rounded-full bg-foreground" />
    </div>
  ),
  Button: (<Button size="sm" variant="contained">Action</Button>),
  Card: (
    <Card padding="sm" variant="filled" className="rounded-xl" >
      <div className="flex flex-col gap-1 w-20">
        <div className="w-full h-1.5 rounded-full bg-muted/30" />
        <div className="w-3/4 h-1.5 rounded-full bg-muted/15" />
      </div>
    </Card>
  ),
  Checkbox: <Checkbox defaultChecked />,
  Description: (
    <div className="flex flex-col gap-1 w-30 p-surface-sm">
      <div className="w-full h-1.5 rounded-full bg-muted/40" />
      <div className="w-3/4 h-1.5 rounded-full bg-muted/20" />
    </div>
  ),
  Dropdown: (
    <Card padding="none" variant="filled" className="p-2 rounded-lg">
      <div className="flex flex-col gap-1 w-20">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-row gap-0.5 items-center">
            <div className="h-1.5 shrink-0 aspect-square rounded-full bg-muted/30" />
            <div className="w-full h-1.5 rounded-full bg-muted/30" />
          </div>
        ))}
      </div>
    </Card>
  ),
  Input: <Input size="sm" placeholder="Text..." className="w-28 text-xs" readOnly />,
  Kbd: <Kbd keyValue="command" content="K" />,
  Label: <Label size="sm" className="font-semibold">Headline</Label>,
  Modal: (
    <Card padding="sm" variant="filled" className="rounded-xl" >
      <div className="flex flex-col gap-1 w-20">
        <div className="w-full h-1.5 rounded-full bg-muted/30" />
        <div className="w-3/4 h-1.5 rounded-full bg-muted/15" />
        <div className="w-3/8 h-1.5 rounded-full bg-primary" />
      </div>
    </Card>
  ),
  Popover: (
    <Card padding="sm" variant="filled" className="rounded-xl" >
      <div className="flex flex-col gap-1 w-20">
        <div className="w-full h-1.5 rounded-full bg-muted/30" />
        <div className="w-3/4 h-1.5 rounded-full bg-muted/15" />
        <div className="w-3/8 h-1.5 rounded-full bg-muted/15" />
      </div>
    </Card>
  ),
  Searchbar: <Searchbar size="sm" placeholder="Search..." className="w-28 text-xs" readOnly />,
  Select: (
    <Button size="sm" radius="md" variant="outlined" color="surface" trailing={<ChevronsUpDown className="size-3" />}>
      Select
    </Button>
  ),
  Separator: <div className="w-20 h-[0.5px] bg-border" />,
  Spinner: <Spinner size="md" />,
  Stepper: (
    <Stepper
      size="sm"
      defaultValue={1}
      steps={[{ value: 1 }, { value: 2 }]}
      className="pointer-events-none [&_*]:!pointer-events-none"
    />
  ),
  Switch: <Switch defaultChecked />,
  Textarea: <Textarea size="sm" placeholder="Text..." rows={2} className="w-28 text-xs" readOnly />,
  Tile: (
    <Tile size="sm" variant="contained" className="w-30">
      Item
    </Tile>
  ),
  Tooltip: (
    <Tooltip open side="bottom" content="Tooltip">
      <Button size="sm" variant="contained" layout="icon">
        <Plus className="size-3" />
      </Button>
    </Tooltip>
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
