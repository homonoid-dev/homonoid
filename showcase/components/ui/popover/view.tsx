"use client";

import { Popover, Button, Label, Description, Card } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  POPOVER_SECTIONS,
  POPOVER_SECTIONS_LIST,
  POPOVER_DEFAULT_CODE_SAMPLE,
} from "./model";

export function PopoverView() {
  useToc(POPOVER_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Popover</Label>
        <Description>
          A popover presents rich interactive content within a transient floating surface anchored to an interactive trigger element.
        </Description>
        <Description>
          Popovers provide contextual overlays such as filter menus, property pickers, or rich confirmation forms without navigating away from the current canvas.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="popover" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Popover } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={POPOVER_DEFAULT_CODE_SAMPLE}>
          <div className="flex items-center justify-center p-6">
            <Popover>
              <Button variant="contained">Click me</Button>
              <Popover.Content className="max-w-64">
                <Popover.Dialog>
                  <Popover.Heading size="sm">Popover Title</Popover.Heading>
                  <p className="mt-2 text-sm text-muted">
                    This is the popover content. You can put any content here.
                  </p>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={POPOVER_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {POPOVER_SECTIONS.continuity.label}
        </Label>

        <Description>
          Floating popover dialog surfaces preserve dimensional stability and spatial continuity across enter and exit transitions without geometric jitter.
        </Description>

        <Description>
          Outer coordinate positioning is strictly isolated from inner entrance scale and opacity transitions, preventing transform origin conflicts.
        </Description>

        <Description>
          Smooth entrance scaling from 0.96 to 1.0 reinforces physical proximity to the trigger anchor while maintaining visual stability.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={POPOVER_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {POPOVER_SECTIONS.accessibility.label}
        </Label>

        <Description>
          Floating surfaces expose semantic dialog roles, establish accessible boundary signals, and coordinate native keyboard navigation.
        </Description>

        <Description>
          Interactive triggers bind automatically to floating reference targets, supplying appropriate popup and expanded ARIA descriptors.
        </Description>

        <Description>
          Focus management directs keyboard focus smoothly into the dialog upon activation and restores focus cleanly upon dismissal.
        </Description>

        <Description>
          Dismissal triggers listen for outside pointer presses and escape key events, guaranteeing prompt and predictable closure.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={POPOVER_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {POPOVER_SECTIONS.tokens.label}
        </Label>

        <Description>
          Surface elevations consume surface, border, and foreground tokens dynamically across light and dark modes with zero arbitrary values.
        </Description>

        <Description>
          Spatial padding maps to consistent token scales, balancing readable content typography with compact floating proportions.
        </Description>

        <Description>
          Animation parameters consume fast motion durations and organic easing curves from Homonoid design tokens.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={POPOVER_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {POPOVER_SECTIONS.styleReference.label}
        </Label>

        <Description>
          Direct trigger elements bind automatically to floating reference targets without intermediate artificial wrapper containers.
        </Description>

        <Description>
          Portal mounting isolates popover surfaces from parent overflow clipping, guaranteeing consistent rendering above all stacking contexts.
        </Description>

        <Description>
          Boundary collision detection automatically shifts and flips positioning axes to keep the floating surface completely within view.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
