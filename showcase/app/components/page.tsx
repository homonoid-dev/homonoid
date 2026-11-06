"use client";

import Link from "next/link";
import { Resource } from "@/components/ui/resource";
import { COMPONENTS } from "@/config/components";
import {
  Card,
  Label,
  Heading,
  Description,
} from "@homonoid/react";

export default function Page() {

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-surface">
        {COMPONENTS.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="cursor-pointer block"
          >
            <Card className="aspect-square flex justify-center items-center rounded-3xl">
              <Label>{component.name}</Label>
            </Card>
          </Link>
        ))}
      </div>

      {/* Homonoid Core Values and Considerations */}
      <div className="flex flex-col pt-layout-y gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="md" as="h2">Object Continuity</Heading>
          <Description>
            Interfaces behave as coherent systems where every component maintains permanence and spatial identity. State transitions evolve smoothly rather than reconstructing elements abruptly, ensuring users preserve visual orientation during interaction.
          </Description>
        </div>

        <div className="flex flex-col gap-control-gap">
          <Heading size="md" as="h2">Physical Motion</Heading>
          <Description>
            Motion in Homonoid is never decorative filler. Fluid spring curves and micro scale compressions convey tactile feedback, communicate hierarchy shifts, and reinforce physical manipulation across every interaction.
          </Description>
        </div>

        <div className="flex flex-col gap-control-gap">
          <Heading size="md" as="h2">Inclusive Architecture</Heading>
          <Description>
            Native accessibility is engineered directly into component foundations. Complete semantic landmarks, compliant contrast ratios, and intuitive keyboard navigation ensure every interface adapts effortlessly across assistive technologies.
          </Description>
        </div>

        <div className="flex flex-col gap-control-gap">
          <Heading size="md" as="h2">Token Hierarchy</Heading>
          <Description>
            All styling consumes standardized spatial, typographic, and surface tokens with zero hardcoded values. Design tokens adapt dynamically across light and dark modes while maintaining rigorous aesthetic harmony.
          </Description>
        </div>
      </div>
    </div>
  );
}
