"use client";

import { useState } from "react";
import { Button, Heading, Description, Card } from "@homonoid/react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import { InteractiveStates } from "@/components/ui/interactive-states";
import {
  BUTTON_SECTIONS,
  BUTTON_SECTIONS_LIST,
  BUTTON_INTERACTIVE_STATES,
  BUTTON_CONTAINED_CODE_SAMPLE,
  BUTTON_VARIANTS_CODE_SAMPLE,
  BUTTON_SIZES_CODE_SAMPLE,
  BUTTON_OUTLINED_CODE_SAMPLE,
  BUTTON_WITH_ICON_CODE_SAMPLE,
  BUTTON_ICON_ONLY_CODE_SAMPLE,
  BUTTON_LOADING_CODE_SAMPLE,
  BUTTON_DISABLED_CODE_SAMPLE,
  BUTTON_FULL_WIDTH_CODE_SAMPLE,
} from "./model";

export function ButtonView() {
  const [isLoading, setIsLoading] = useState(false);

  useToc(BUTTON_SECTIONS_LIST);

  const sections = BUTTON_SECTIONS;

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Button</Heading>
          <Description>
            A button communicates an action and allows users to trigger that action with a single interaction.
          </Description>
        </div>

        <Description>
          Homonoid structures button hierarchy through three deliberate tiers contained for primary focus, outlined for secondary choices, and plain for utilities while maintaining strict object continuity by preserving fixed dimensions and fluid micro transitions across hover, press, and loading states.
        </Description>
      </div>

      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="button" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Component Area */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        {/* Subtle Import Card */}
        <Card
          color="subtle"
          variant="filled"
          className="font-mono text-xs"
        >
          <code>{highlighter('import { Button } from "@homonoid/react";')}</code>
        </Card>

        {/* Contained Stage */}
        <Stage code={BUTTON_CONTAINED_CODE_SAMPLE}>
          <Button variant="contained">
            Click me
          </Button>
        </Stage>
      </section>

      {/* Variants Section */}
      <section id={sections.variants.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={sections.variants.label} icon={sections.variants.icon} />

        {/* Variants Stage */}
        <Stage code={BUTTON_VARIANTS_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center justify-center gap-surface-gap">
            <Button variant="contained" color="primary">
              Primary
            </Button>
            <Button variant="contained" color="subtle">
              Subtle
            </Button>
            <Button variant="outlined">
              Outline
            </Button>
            <Button variant="plain">
              Ghost
            </Button>
            <Button variant="contained" color="destructive">
              Destructive
            </Button>
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section id={sections.sizes.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={sections.sizes.label} icon={sections.sizes.icon} />

        {/* Sizes Stage */}
        <Stage code={BUTTON_SIZES_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap justify-center items-center gap-surface-gap">
            <Button variant="contained" size="sm">
              Small
            </Button>
            <Button variant="contained" size="md">
              Medium
            </Button>
            <Button variant="contained" size="lg">
              Large
            </Button>
          </div>
        </Stage>
      </section>

      {/* Outlined Section */}
      <section id={sections.outlined.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={sections.outlined.label} icon={sections.outlined.icon} />

        {/* Outlined Stage */}
        <Stage code={BUTTON_OUTLINED_CODE_SAMPLE}>
          <Button variant="outlined">
            Click me
          </Button>
        </Stage>
      </section>

      {/* With Icon Section */}
      <section id={sections.withIcon.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={sections.withIcon.label} icon={sections.withIcon.icon} />

        {/* With Icon Stage */}
        <Stage code={BUTTON_WITH_ICON_CODE_SAMPLE}>
          <Button
            variant="contained"
            leading={<sections.withIcon.icon className="size-4" />}
          >
            Click me
          </Button>
        </Stage>
      </section>

      {/* Icon Only Section */}
      <section id={sections.iconOnly.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={sections.iconOnly.label} icon={sections.iconOnly.icon} />

        {/* Icon Only Stage */}
        <Stage code={BUTTON_ICON_ONLY_CODE_SAMPLE}>
          <Button
            layout="icon"
            variant="contained"
            aria-label="Add item"
          >
            <sections.iconOnly.icon className="size-4" />
          </Button>
        </Stage>
      </section>

      {/* Loading Section */}
      <section id={sections.loading.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={sections.loading.label} icon={sections.loading.icon} />

        {/* Loading Stage */}
        <Stage code={BUTTON_LOADING_CODE_SAMPLE} onReset={() => setIsLoading(false)}>
          <Button
            variant="contained"
            loading={isLoading}
            onClick={() => setIsLoading(true)}
          >
            Click me
          </Button>
        </Stage>
      </section>

      {/* Disabled Section */}
      <section id={sections.disabled.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={sections.disabled.label} icon={sections.disabled.icon} />

        {/* Disabled Stage */}
        <Stage code={BUTTON_DISABLED_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap justify-center items-center gap-surface-gap">
            <Button variant="contained" disabled>
              Contained
            </Button>
            <Button variant="outlined" disabled>
              Outlined
            </Button>
            <Button variant="plain" disabled>
              Plain
            </Button>
          </div>
        </Stage>
      </section>

      {/* Full Width Section */}
      <section id={sections.fullWidth.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={sections.fullWidth.label} icon={sections.fullWidth.icon} />

        {/* Full Width Stage */}
        <Stage code={BUTTON_FULL_WIDTH_CODE_SAMPLE}>
          <Button variant="contained" layout="full">
            Full Width
          </Button>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section id={sections.continuity.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{sections.continuity.label}</Heading>

        <Description>
          Homonoid treats interactive controls as persistent physical landmarks. State transitions must preserve component identity and geometric stability rather than tearing down and reconstructing elements abruptly.
        </Description>

        <Description>
          Button containers enforce stable geometric bounds across interactive states. Transitioning into the loading state cross fades the action label into the indicator without width collapse or layout reflows.
        </Description>

        <Description>
          Pointer compression engages calibrated spring resistance followed by fluid restorative rebound. Easing curves prioritize immediate feedback upon press while smoothing releases naturally.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section id={sections.accessibility.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{sections.accessibility.label}</Heading>

        <Description>
          Accessibility stands at the core of Homonoid design philosophy. Interactive components must empower every individual with immediate comprehension, predictable keyboard navigation, and seamless assistive technology integration.
        </Description>

        <Description>
          Buttons render semantic native button elements by default, preserving natural tab indexing, spacebar activation, and enter key dispatching without requiring synthetic keyboard handlers.
        </Description>

        <Description>
          Prominent focus rings provide clear WCAG compliant visibility during keyboard navigation. Icon only buttons enforce descriptive aria labels, while pending states announce loading progress transparently to screen readers.
        </Description>
      </section>

      {/* Interactive States Section */}
      <InteractiveStates
        id={sections.interactiveStates.id}
        title={sections.interactiveStates.label}
        description="The button supports both CSS pseudo classes and data attributes for flexibility:"
        items={BUTTON_INTERACTIVE_STATES}
      />

      {/* Design Tokens Section */}
      <section id={sections.tokens.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{sections.tokens.label}</Heading>

        <Description>
          Button dimensions map directly to the standardized control height tokens comprising 32px for small, 40px for medium, and 48px for large scale presentations.
        </Description>

        <Description>
          Internal horizontal and vertical padding tokens scale proportionally with control height to maintain centered optical balance across text and slot icons.
        </Description>

        <Description>
          Boundary styling utilizes control radius tokens alongside dedicated fast duration motion variables and calibrated spring physics for tactile interaction.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section id={sections.styleReference.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{sections.styleReference.label}</Heading>

        <Description>
          Contained buttons apply high contrast solid surface fills that subtly illuminate on hover and compress smoothly during pointer activation.
        </Description>

        <Description>
          Outlined buttons present a subtle hairline border stroke over a transparent background, transitioning to reinforced contrast when hovered or focused.
        </Description>

        <Description>
          Plain buttons remove resting borders and backgrounds, introducing subtle surface tints only when interacting through hover, focus, or press events.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
