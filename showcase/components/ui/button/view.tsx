import { Label } from "@harmonia/react";
import { Description } from "@/components/ui/description";

export function ButtonView() {
  return (
    <div className="flex flex-col px-layout-x pt-layout-y gap-control-gap max-w-4xl">
      <Label size="lg">Button</Label>
      <Description>
        A button communicates an action and allows users to trigger that action with a single interaction.
      </Description>
    </div>
  );
}
