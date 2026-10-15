"use client";

import { Button, Label, Description, Card } from "@harmonia/react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { Toc } from "@/components/ui/toc";
import { ButtonProvider } from "./provider";
import { useButton } from "./use-button";

export function ButtonViewContent() {
  const {
    containedCodeSample,
    variantsCodeSample,
    outlinedCodeSample,
    withIconCodeSample,
    iconOnlyCodeSample,
    loadingCodeSample,
    sections,
    sectionsList,
    isLoading,
    triggerLoading,
    resetLoading,
  } = useButton();

  return (
    <div className="flex justify-between w-full min-h-full">
      {/* Content Column */}
      <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl flex-1 min-w-0">
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
      </div>

      {/* Table of Contents Right Sidebar */}
      <Toc items={sectionsList} />
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
