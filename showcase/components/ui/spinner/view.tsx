"use client";

import { Spinner, Button, Input, Label, Description, Card } from "@harmonia/react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { Pagination } from "@/components/ui/pagination";
import { useToc } from "@/components/ui/toc";
import { InteractiveStates } from "@/components/ui/interactive-states";
import {
  SPINNER_SECTIONS,
  SPINNER_SECTIONS_LIST,
  SPINNER_INTERACTIVE_STATES,
  SPINNER_DEFAULT_CODE_SAMPLE,
  SPINNER_ANIMATIONS_CODE_SAMPLE,
  SPINNER_SIZES_CODE_SAMPLE,
  SPINNER_COLORS_CODE_SAMPLE,
  SPINNER_EMBEDDED_CODE_SAMPLE,
} from "./model";

export function SpinnerView() {
  useToc(SPINNER_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Spinner</Label>
        <Description>
          A spinner provides non blocking indeterminate progress feedback, communicating that a background process is active while preserving spatial and visual continuity.
        </Description>

        <Description>
          Spinners indicate that an operation is underway without requiring precise completion time estimations, integrating seamlessly into buttons, inputs, and modal containers.
        </Description>
      </div>

      {/* Resources */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="spinner" />
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
          <code>{highlighter('import { Spinner } from "@harmonia/react";')}</code>
        </Card>

        {/* Default Stage */}
        <Stage code={SPINNER_DEFAULT_CODE_SAMPLE}>
          <Spinner size="md" />
        </Stage>
      </section>

      {/* Animations Section */}
      <section
        id={SPINNER_SECTIONS.animations.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SPINNER_SECTIONS.animations.icon} />
          <Label size="lg" as="h2">
            {SPINNER_SECTIONS.animations.label}
          </Label>
        </div>

        <Stage code={SPINNER_ANIMATIONS_CODE_SAMPLE}>
          <div className="flex flex-row items-center gap-12">
            <div className="flex flex-col items-center gap-2">
              <Spinner animation="border" size="md" />
              <span className="text-xs text-muted">Border</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner animation="grow" size="md" />
              <span className="text-xs text-muted">Grow</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner animation="orbit" size="md" />
              <span className="text-xs text-muted">Orbit</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner animation="dash" size="md" />
              <span className="text-xs text-muted">Dash</span>
            </div>
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={SPINNER_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SPINNER_SECTIONS.sizes.icon} />
          <Label size="lg" as="h2">
            {SPINNER_SECTIONS.sizes.label}
          </Label>
        </div>

        <Stage code={SPINNER_SIZES_CODE_SAMPLE}>
          <div className="flex flex-row items-center gap-surface-gap">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </Stage>
      </section>

      {/* Colors Section */}
      <section
        id={SPINNER_SECTIONS.colors.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SPINNER_SECTIONS.colors.icon} />
          <Label size="lg" as="h2">
            {SPINNER_SECTIONS.colors.label}
          </Label>
        </div>

        <Stage code={SPINNER_COLORS_CODE_SAMPLE}>
          <div className="flex flex-row items-center gap-8">
            <Spinner color="primary" size="md" />
            <Spinner color="subtle" size="md" />
            <Spinner color="foreground" size="md" />
            <Spinner color="destructive" size="md" />
          </div>
        </Stage>
      </section>

      {/* Embedded Section */}
      <section
        id={SPINNER_SECTIONS.embedded.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={SPINNER_SECTIONS.embedded.icon} />
          <Label size="lg" as="h2">
            {SPINNER_SECTIONS.embedded.label}
          </Label>
        </div>

        <Stage code={SPINNER_EMBEDDED_CODE_SAMPLE}>
          <div className="flex flex-col gap-surface-gap w-full max-w-sm">
            <Button loading shape="circle">
              Submitting
            </Button>
            <Input
              placeholder="Searching components..."
              trailing={<Spinner size="sm" color="subtle" />}
            />
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={SPINNER_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {SPINNER_SECTIONS.continuity.label}
        </Label>

        <Description>
          Harmonia requires that loading indicators integrate seamlessly into parent components without dimensional disruption. When embedded within buttons or form controls, the spinner occupies a dedicated spatial slot to prevent layout jumps.
        </Description>

        <Description>
          Motion remains continuous and fluid across asynchronous operations, cross fading into view during initiation and fading out gently upon completion.
        </Description>

        <Description>
          Theme continuity ensures that the indicator inherits current color by default, harmonizing with its immediate container across varying surface treatments.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={SPINNER_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {SPINNER_SECTIONS.accessibility.label}
        </Label>

        <Description>
          Accessibility for loading indicators ensures that asynchronous updates are never solely visual. Harmonia values inclusive design by conveying background activity reliably across all sensory modalities.
        </Description>

        <Description>
          Spinners feature status role semantics and aria live announcements to inform assistive technologies when data operations begin and resolve. Hidden descriptive labels provide contextual clarity for screen readers.
        </Description>

        <Description>
          System motion preferences are honored automatically. For users who prefer reduced motion, continuous rotation transitions into a steady status indicator to avoid vestibular discomfort.
        </Description>
      </section>

      {/* Interactive States Section */}
      <InteractiveStates
        id={SPINNER_SECTIONS.interactiveStates.id}
        title={SPINNER_SECTIONS.interactiveStates.label}
        description="The spinner communicates its operational state through semantic accessibility roles and motion attributes:"
        items={SPINNER_INTERACTIVE_STATES}
      />

      {/* Design Tokens Section */}
      <section
        id={SPINNER_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {SPINNER_SECTIONS.tokens.label}
        </Label>

        <Description>
          Spinner sizing maps directly to tokenized geometric dimensions comprising 16px for small, 24px for medium, and 32px for large scales.
        </Description>

        <Description>
          Angular rotation executes over a calibrated duration between 750ms and 1000ms using continuous linear progression for borders and rhythmic easing curves for grow variants.
        </Description>

        <Description>
          Stroke thickness and radial scale tokens maintain balanced optical weight across both light and dark backgrounds.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={SPINNER_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {SPINNER_SECTIONS.styleReference.label}
        </Label>

        <Description>
          Vector geometry is rendered using resolution independent SVG circles and paths, ensuring crisp rendering on high density displays.
        </Description>

        <Description>
          Animation timing runs on hardware composited layers using GPU accelerated transforms to prevent frame drops during simultaneous interface operations.
        </Description>

        <Description>
          Accessible announcements utilize live status regions while decorative inline instances suppress duplicate screen reader feedback.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
