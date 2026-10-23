"use client";

import {
  Popover,
  Button,
  Description,
  Heading,
  Card,
  Input,
} from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  POPOVER_SECTIONS,
  POPOVER_SECTIONS_LIST,
  POPOVER_DEFAULT_CODE_SAMPLE,
  POPOVER_PLACEMENTS_CODE_SAMPLE,
  POPOVER_VARIANTS_CODE_SAMPLE,
  POPOVER_SIZES_CODE_SAMPLE,
  POPOVER_FORM_CODE_SAMPLE,
} from "./model";

const PLACEMENTS = [
  { side: "top" as const, label: "Top" },
  { side: "bottom" as const, label: "Bottom" },
  { side: "left" as const, label: "Left" },
  { side: "right" as const, label: "Right" },
];

const VARIANTS = [
  { variant: "surface" as const, label: "Surface" },
  { variant: "primary" as const, label: "Primary" },
  { variant: "inverted" as const, label: "Inverted" },
];

const SIZES = [
  { size: "sm" as const, label: "Small" },
  { size: "md" as const, label: "Medium" },
  { size: "lg" as const, label: "Large" },
];

export function PopoverView() {
  useToc(POPOVER_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Popover</Heading>
          <Description>
            A popover presents rich interactive content within a transient floating surface anchored to an interactive trigger element.
          </Description>
        </div>
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
          className="font-mono text-xs"
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

      {/* Placements Section */}
      <section
        id={POPOVER_SECTIONS.placements.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={POPOVER_SECTIONS.placements.icon} />
          <Heading size="md" as="h2">
            {POPOVER_SECTIONS.placements.label}
          </Heading>
        </div>

        <Stage code={POPOVER_PLACEMENTS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-4 p-6">
            {PLACEMENTS.map((item) => (
              <Popover key={item.side} side={item.side}>
                <Button variant="outlined">{item.label}</Button>
                <Popover.Content className="max-w-56">
                  <Popover.Dialog>
                    <Popover.Heading size="sm">{item.label} Placement</Popover.Heading>
                    <p className="mt-1 text-xs text-muted">
                      Anchored to the {item.side} side of the trigger element.
                    </p>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
            ))}
          </div>
        </Stage>
      </section>

      {/* Variants Section */}
      <section
        id={POPOVER_SECTIONS.variants.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={POPOVER_SECTIONS.variants.icon} />
          <Heading size="md" as="h2">
            {POPOVER_SECTIONS.variants.label}
          </Heading>
        </div>

        <Stage code={POPOVER_VARIANTS_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-4 p-6">
            {VARIANTS.map((item) => (
              <Popover key={item.variant}>
                <Button variant="outlined">{item.label}</Button>
                <Popover.Content className="max-w-64">
                  <Popover.Dialog variant={item.variant}>
                    <Popover.Heading size="sm">{item.label} Theme</Popover.Heading>
                    <p className="mt-1 text-xs opacity-80">
                      Dialog surface consuming {item.variant} design tokens.
                    </p>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
            ))}
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={POPOVER_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={POPOVER_SECTIONS.sizes.icon} />
          <Heading size="md" as="h2">
            {POPOVER_SECTIONS.sizes.label}
          </Heading>
        </div>

        <Stage code={POPOVER_SIZES_CODE_SAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-4 p-6">
            {SIZES.map((item) => (
              <Popover key={item.size}>
                <Button variant="outlined">{item.label}</Button>
                <Popover.Content>
                  <Popover.Dialog size={item.size}>
                    <Popover.Heading size="sm">{item.label} Dimension</Popover.Heading>
                    <p className="mt-1 text-xs text-muted">
                      Structured popover container maintaining stable dimensional width.
                    </p>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
            ))}
          </div>
        </Stage>
      </section>

      {/* Form Actions Section */}
      <section
        id={POPOVER_SECTIONS.form.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={POPOVER_SECTIONS.form.icon} />
          <Heading size="md" as="h2">
            {POPOVER_SECTIONS.form.label}
          </Heading>
        </div>

        <Stage code={POPOVER_FORM_CODE_SAMPLE}>
          <div className="flex items-center justify-center p-6">
            <Popover>
              <Button variant="contained">Filter Settings</Button>
              <Popover.Content className="w-80">
                <Popover.Dialog className="gap-3">
                  <div className="flex flex-col gap-1">
                    <Popover.Heading size="sm">Display Options</Popover.Heading>
                    <Description>Adjust presentation criteria and tags.</Description>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input placeholder="Enter tag name" size="sm" />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Button size="sm" variant="plain">
                      Reset
                    </Button>
                    <Button size="sm" variant="contained">
                      Apply
                    </Button>
                  </div>
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
        <Heading size="md" as="h2">
          {POPOVER_SECTIONS.continuity.label}
        </Heading>

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
        <Heading size="md" as="h2">
          {POPOVER_SECTIONS.accessibility.label}
        </Heading>

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
        <Heading size="md" as="h2">
          {POPOVER_SECTIONS.tokens.label}
        </Heading>

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
        <Heading size="md" as="h2">
          {POPOVER_SECTIONS.styleReference.label}
        </Heading>

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
