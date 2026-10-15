"use client";

import { Button, Label, Description, Card } from "@harmonia/react";
import { Circle, Plus } from "lucide-react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { ButtonProvider } from "./provider";
import { useButton } from "./use-button";

export function ButtonViewContent() {
  const { containedCodeSample, outlinedCodeSample, iconCodeSample } = useButton();

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Button</Label>
        <Description>
          A button communicates an action and allows users to trigger that action with a single interaction.
        </Description>

        <Description>
          Harmonia structures button hierarchy through three deliberate tiers contained for primary focus, outlined for secondary choices, and plain for utilities while maintaining strict object continuity by preserving fixed dimensions and fluid micro-transitions across hover, press, and loading states.
        </Description>

      </div>

      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="button" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Component Area */}
      <section className="flex flex-col gap-surface-gap">
        {/* Subtle Import Card */}
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Button } from "@harmonia/react";')}</code>
        </Card>

        {/* Contained Stage */}
        <Stage code={containedCodeSample}>
          <Button variant="contained" shape="circle">
            Click me
          </Button>
        </Stage>
      </section>

      {/* Outlined Section */}
      <section className="flex flex-col gap-surface-gap py-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <div className="size-control-md rounded-full border border-border flex items-center justify-center shrink-0">
            <Circle className="size-4" />
          </div>
          <Label size="lg" as="h2">Outlined</Label>
        </div>

        {/* Outlined Stage */}
        <Stage code={outlinedCodeSample}>
          <Button variant="outlined" shape="circle">
            Click me
          </Button>
        </Stage>
      </section>

      {/* Icon Section */}
      <section className="flex flex-col gap-surface-gap py-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <div className="size-control-md rounded-full border border-border flex items-center justify-center shrink-0">
            <Plus className="size-4" />
          </div>
          <Label size="lg" as="h2">Icon</Label>
        </div>

        {/* Icon Stage */}
        <Stage code={iconCodeSample}>
          <Button
            layout="icon"
            variant="contained"
            shape="circle"
            aria-label="Add item"
          >
            <Plus className="size-4" />
          </Button>
        </Stage>
      </section>
    </div>
  );
}

export function ButtonView() {
  return (
    <ButtonProvider>
      <ButtonViewContent />
    </ButtonProvider>
  );
}
