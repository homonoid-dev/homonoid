"use client";

import { useState, useMemo } from "react";
import { Resource } from "@/components/ui/resource";
import { SHOWCASE_COMPONENTS } from "@/config/components";
import { Card, Label, Heading, Description, Button, cond } from "@homonoid/react";

const CATEGORIES = [
  "All",
  "Actions",
  "Inputs",
  "Layout",
  "Overlays",
  "Typography",
  "Feedback",
] as const;

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
          <Card
            key={component.name}
            padding="sm"
            className="aspect-square rounded-3xl flex items-center justify-center text-center"
          >
            <Label size="md">{component.name}</Label>
          </Card>
        ))}
      </div>
    </div>
  );
}
