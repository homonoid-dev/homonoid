import { Resource } from "@/components/ui/resource";
import { Heading, Description } from "@homonoid/react";

export default function ComponentsPage() {
  return (
    <div className="flex flex-col px-layout-x pt-layout-y gap-surface-gap max-w-4xl">
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
    </div>
  );
}

