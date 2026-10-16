"use client";

import { Button, Label, Description, Card } from "@harmonia/react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import { InteractiveStates } from "@/components/ui/interactive-states";
import { ButtonProvider } from "./provider";
import { useButton } from "./use-button";

export function ButtonViewContent() {
  const {
    containedCodeSample,
    variantsCodeSample,
    sizesCodeSample,
    outlinedCodeSample,
    withIconCodeSample,
    iconOnlyCodeSample,
    loadingCodeSample,
    disabledCodeSample,
    fullWidthCodeSample,
    sections,
    sectionsList,
    interactiveStates,
    isLoading,
    triggerLoading,
    resetLoading,
  } = useButton();

  useToc(sectionsList);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Button</Label>
        <Description>
          A button communicates an action and allows users to trigger that action with a single interaction.
        </Description>

        <Description>
          Harmonia structures button hierarchy through three deliberate tiers contained for primary focus, outlined for secondary choices, and plain for utilities while maintaining strict object continuity by preserving fixed dimensions and fluid micro transitions across hover, press, and loading states.
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

      {/* Variants Section */}
      <section id={sections.variants.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={sections.variants.icon} />
          <Label size="lg" as="h2">{sections.variants.label}</Label>
        </div>

        {/* Variants Stage */}
        <Stage code={variantsCodeSample}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Button variant="contained" color="primary" shape="circle">
              Primary
            </Button>
            <Button variant="contained" color="subtle" shape="circle">
              Subtle
            </Button>
            <Button variant="outlined" shape="circle">
              Outline
            </Button>
            <Button variant="plain" shape="circle">
              Ghost
            </Button>
            <Button variant="contained" color="destructive" shape="circle">
              Destructive
            </Button>
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section id={sections.sizes.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={sections.sizes.icon} />
          <Label size="lg" as="h2">{sections.sizes.label}</Label>
        </div>

        {/* Sizes Stage */}
        <Stage code={sizesCodeSample}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Button variant="contained" shape="circle" size="sm">
              Small
            </Button>
            <Button variant="contained" shape="circle" size="md">
              Medium
            </Button>
            <Button variant="contained" shape="circle" size="lg">
              Large
            </Button>
          </div>
        </Stage>
      </section>

      {/* Outlined Section */}
      <section id={sections.outlined.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={sections.outlined.icon} />
          <Label size="lg" as="h2">{sections.outlined.label}</Label>
        </div>

        {/* Outlined Stage */}
        <Stage code={outlinedCodeSample}>
          <Button variant="outlined" shape="circle">
            Click me
          </Button>
        </Stage>
      </section>

      {/* With Icon Section */}
      <section id={sections.withIcon.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={sections.withIcon.icon} />
          <Label size="lg" as="h2">{sections.withIcon.label}</Label>
        </div>

        {/* With Icon Stage */}
        <Stage code={withIconCodeSample}>
          <Button
            variant="contained"
            shape="circle"
            leading={<sections.withIcon.icon className="size-4" />}
          >
            Click me
          </Button>
        </Stage>
      </section>

      {/* Icon Only Section */}
      <section id={sections.iconOnly.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={sections.iconOnly.icon} />
          <Label size="lg" as="h2">{sections.iconOnly.label}</Label>
        </div>

        {/* Icon Only Stage */}
        <Stage code={iconOnlyCodeSample}>
          <Button
            layout="icon"
            variant="contained"
            shape="circle"
            aria-label="Add item"
          >
            <sections.iconOnly.icon className="size-4" />
          </Button>
        </Stage>
      </section>

      {/* Loading Section */}
      <section id={sections.loading.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={sections.loading.icon} />
          <Label size="lg" as="h2">{sections.loading.label}</Label>
        </div>

        {/* Loading Stage */}
        <Stage code={loadingCodeSample} onReset={resetLoading}>
          <Button
            variant="contained"
            shape="circle"
            loading={isLoading}
            onClick={triggerLoading}
          >
            Click me
          </Button>
        </Stage>
      </section>

      {/* Disabled Section */}
      <section id={sections.disabled.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={sections.disabled.icon} />
          <Label size="lg" as="h2">{sections.disabled.label}</Label>
        </div>

        {/* Disabled Stage */}
        <Stage code={disabledCodeSample}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Button variant="contained" shape="circle" disabled>
              Contained
            </Button>
            <Button variant="outlined" shape="circle" disabled>
              Outlined
            </Button>
            <Button variant="plain" shape="circle" disabled>
              Plain
            </Button>
          </div>
        </Stage>
      </section>

      {/* Full Width Section */}
      <section id={sections.fullWidth.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={sections.fullWidth.icon} />
          <Label size="lg" as="h2">{sections.fullWidth.label}</Label>
        </div>

        {/* Full Width Stage */}
        <Stage code={fullWidthCodeSample}>
          <Button variant="contained" shape="circle" layout="full">
            Full Width
          </Button>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={sections.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">{sections.continuity.label}</Label>

        <Description>
          Harmonia treats interactive controls as persistent physical landmarks. State transitions must preserve component identity and geometric stability rather than tearing down and reconstructing elements abruptly.
        </Description>

        <Description>
          Button containers enforce stable geometric bounds across interactive states. Transitioning into the loading state cross fades the action label into the indicator without width collapse or layout reflows.
        </Description>

        <Description>
          Pointer compression engages calibrated spring resistance followed by fluid restorative rebound. Easing curves prioritize immediate feedback upon press while smoothing releases naturally.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={sections.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">{sections.accessibility.label}</Label>

        <Description>
          Accessibility stands at the core of Harmonia design philosophy. Interactive components must empower every individual with immediate comprehension, predictable keyboard navigation, and seamless assistive technology integration.
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
        items={interactiveStates}
      />

      {/* Design Tokens Section */}
      <section
        id={sections.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">{sections.tokens.label}</Label>

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
      <section
        id={sections.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">{sections.styleReference.label}</Label>

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

export function ButtonView() {
  return (
    <ButtonProvider>
      <ButtonViewContent />
    </ButtonProvider>
  );
}
