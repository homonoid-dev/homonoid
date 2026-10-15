"use client";

import { Input, Label, Description, Card } from "@harmonia/react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Pagination } from "@/components/ui/pagination";
import { INPUT_DEFAULT_CODE_SAMPLE } from "./model";

export function InputView() {
  return (
    <div className="flex justify-between w-full min-h-full">
      {/* Content Column */}
      <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl flex-1 min-w-0">
        {/* View Header */}
        <div className="flex flex-col gap-control-gap">
          <Label size="lg">Input</Label>
          <Description>
            An input allows users to enter, edit, and submit text data through direct keyboard entry.
          </Description>

          <Description>
            Inputs are foundational interface controls for capturing structured and unstructured user data while maintaining dimensional stability and visual continuity across interactive states.
          </Description>
        </div>

        {/* Resources */}
        <div className="flex items-center gap-surface-gap">
          <Resource type="github" component="input" />
          <Resource type="figma" href="https://www.figma.com/@lumunar" />
        </div>

        {/* Component Area */}
        <section className="flex flex-col gap-surface-gap pb-layout-y">
          {/* Subtle Import Card */}
          <Card
            color="subtle"
            variant="filled"
            className="flex items-center justify-between font-mono text-xs select-text"
          >
            <code>{highlighter('import { Input } from "@harmonia/react";')}</code>
          </Card>

          {/* Default Stage */}
          <Stage code={INPUT_DEFAULT_CODE_SAMPLE}>
            <Input placeholder="Enter text..." className="max-w-sm" />
          </Stage>
        </section>

        {/* Object Continuity Section */}
        <section className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
          <Label size="lg" as="h2">Continuity</Label>

          <Description>
            Harmonia requires that state transitions preserve component identity without abrupt dimensional shifts. The container outer bounds and border radius remain constant when switching between rest, hover, focus, and invalid states.
          </Description>

          <Description>
            Accommodating leading or trailing elements preserves container boundaries and vertical alignment without layout shift.
          </Description>

          <Description>
            Color transitions for background and border interpolate smoothly using defined motion duration and standard easing curve tokens.
          </Description>
        </section>

        {/* Component Pagination Navigation */}
        <Pagination />
      </div>
    </div>
  );
}
