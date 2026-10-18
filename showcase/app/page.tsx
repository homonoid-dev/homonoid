import { Resource } from "@/components/ui/resource";
import { Label, Description } from "@homonoid/react";

export default function Page() {
  return (
    <div className="flex flex-col px-layout-x pt-layout-y gap-surface-gap max-w-4xl">
      <Label size="lg">Components</Label>
      <div className="flex flex-col gap-layout-gap">
        <Description>
          Explore the foundational building blocks of the Homonoid Design System.
        </Description>
        <Resource type="github" />
        <Description>
          Every component is engineered with strict design token hierarchy, continuous state transitions, and native platform accessibility across every surface. They are designed to preserve spatial identity and dimensional stability throughout complex workflows, giving interfaces a refined feel that adapts effortlessly to user interactions.
        </Description>
      </div>
    </div>
  );
}
