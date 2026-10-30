import { Resource } from "@/components/ui/resource";
import { SHOWCASE_COMPONENTS } from "@/config/components";
import { Card, Label, Heading, Description } from "@homonoid/react";

export default function ComponentsPage() {
  return (
    <div className="flex flex-col px-layout-x pt-layout-y pb-layout-y gap-layout-gap w-full">
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Components</Heading>
          <Description>
            Explore the foundational building blocks of the Homonoid Design System.
          </Description>
        </div>
        <Resource type="github" />
        <Description>
          Every component is engineered with strict design token hierarchy, continuous state transitions, and native platform accessibility across every surface. They are designed to preserve spatial identity and dimensional stability throughout complex workflows, giving interfaces a refined feel that adapts effortlessly to user interactions.
        </Description>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-surface">
        {SHOWCASE_COMPONENTS.map((component) => (
          <Card
            key={component.name}
            className="aspect-square rounded-3xl flex items-center justify-center text-center p-surface-sm"
          >
            <Label size="md">{component.name}</Label>
          </Card>
        ))}
      </div>
    </div>
  );
}
