"use client";

import { Button, Label, Description, Card } from "@harmonia/react";
import { Circle } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { ButtonProvider } from "./provider";
import { useButton } from "./use-button";

export function ButtonViewContent() {
  const { containedCodeSample, outlinedCodeSample } = useButton();

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
      <a
        href="https://github.com/lumunar/harmonia/tree/main/packages/react"
        target="_blank"
        rel="noreferrer"
        className="w-fit"
      >
        <Button
          variant="outlined"
          color="surface"
          shape="circle"
          leading={<GithubIcon className="size-3.5" />}
        >
          Source
        </Button>
      </a>

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
