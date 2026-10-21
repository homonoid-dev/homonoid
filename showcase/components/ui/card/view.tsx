"use client";

import { Card, Label, Heading, Description } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  CARD_SECTIONS,
  CARD_SECTIONS_LIST,
  CARD_DEFAULT_CODE_SAMPLE,
  CARD_VARIANTS_CODE_SAMPLE,
  CARD_COLORS_CODE_SAMPLE,
  CARD_BORDER_CODE_SAMPLE,
} from "./model";

export function CardView() {
  useToc(CARD_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">Card</Heading>
        <Description size="md">
          A card groups related content and interactive elements within a clear visual container.
        </Description>
        <Description size="md">
          Homonoid cards provide structured surface elevation and flexible padding options while preserving design token fidelity across layouts.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="card" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Card } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={CARD_DEFAULT_CODE_SAMPLE}>
          <Card className="flex flex-col gap-2 max-w-sm w-full p-surface">
            <Label size="md" as="h3">
              Project Overview
            </Label>
            <Description>
              Homonoid components provide continuous aesthetic fidelity and tactile physics.
            </Description>
          </Card>
        </Stage>
      </section>

      {/* Variants Section */}
      <section
        id={CARD_SECTIONS.variants.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={CARD_SECTIONS.variants.icon} />
          <Label size="lg" as="h2">
            {CARD_SECTIONS.variants.label}
          </Label>
        </div>

        <Stage code={CARD_VARIANTS_CODE_SAMPLE}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-surface-gap w-full max-w-lg">
            <Card variant="outlined" className="flex flex-col gap-2 p-surface">
              <Label size="sm" as="h3">
                Outlined Card
              </Label>
              <Description>
                Transparent surface framed by an optional hairline border stroke.
              </Description>
            </Card>
            <Card variant="filled" className="flex flex-col gap-2 p-surface">
              <Label size="sm" as="h3">
                Filled Card
              </Label>
              <Description>
                Solid surface fill providing grounded visual grouping across views.
              </Description>
            </Card>
          </div>
        </Stage>
      </section>

      {/* Colors Section */}
      <section
        id={CARD_SECTIONS.colors.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={CARD_SECTIONS.colors.icon} />
          <Label size="lg" as="h2">
            {CARD_SECTIONS.colors.label}
          </Label>
        </div>

        <Stage code={CARD_COLORS_CODE_SAMPLE}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-surface-gap w-full max-w-lg">
            <Card variant="filled" color="surface" className="flex flex-col gap-2">
              <Label size="sm" as="h3" className="text-inherit">
                Surface
              </Label>
              <Description className="text-inherit opacity-80">
                Neutral surface background.
              </Description>
            </Card>
            <Card variant="filled" color="subtle" className="flex flex-col gap-2">
              <Label size="sm" as="h3" className="text-inherit">
                Subtle
              </Label>
              <Description className="text-inherit opacity-80">
                Chroma subtle wash tint.
              </Description>
            </Card>
            <Card variant="filled" color="primary" className="flex flex-col gap-2">
              <Label size="sm" as="h3" className="text-inherit">
                Primary
              </Label>
              <Description className="text-inherit opacity-80">
                Brand highlight container.
              </Description>
            </Card>
            <Card variant="filled" color="destructive" className="flex flex-col gap-2">
              <Label size="sm" as="h3" className="text-inherit">
                Destructive
              </Label>
              <Description className="text-inherit opacity-80">
                Danger alert container.
              </Description>
            </Card>
          </div>
        </Stage>
      </section>

      {/* Border Control Section */}
      <section
        id={CARD_SECTIONS.border.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={CARD_SECTIONS.border.icon} />
          <Label size="lg" as="h2">
            {CARD_SECTIONS.border.label}
          </Label>
        </div>

        <Stage code={CARD_BORDER_CODE_SAMPLE}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-surface-gap w-full max-w-lg">
            <Card variant="filled" border={true} className="flex flex-col gap-2">
              <Label size="sm" as="h3">
                With Border
              </Label>
              <Description>
                Hairline border framing the card perimeter.
              </Description>
            </Card>
            <Card variant="filled" border={false} className="flex flex-col gap-2">
              <Label size="sm" as="h3">
                Borderless
              </Label>
              <Description>
                Border stroke omitted for flat layered surfaces.
              </Description>
            </Card>
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={CARD_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {CARD_SECTIONS.continuity.label}
        </Label>

        <Description>
          Card surfaces maintain structural visual cohesion across theme modes and elevation changes. Container boundaries preserve physical stability while adapting to internal content flows.
        </Description>

        <Description>
          Variant transitions between outlined and filled states preserve layout dimensions, avoiding layout shifts or border clipping.
        </Description>

        <Description>
          Surface fills and borders calibrate against ambient luminance, ensuring continuous contrast fidelity across light and dark presentations.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={CARD_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {CARD_SECTIONS.accessibility.label}
        </Label>

        <Description>
          Accessibility in container architecture establishes semantic hierarchy and landmark clarity. Homonoid cards prioritize structured content navigation for screen readers and keyboard users alike.
        </Description>

        <Description>
          Cards support semantic element customization through the polymorphic as property, permitting developers to render proper article, section, or aside landmarks that screen readers navigate natively.
        </Description>

        <Description>
          When configured with interactive actions, cards maintain accessible focus indicators and clear color contrast ratios across all surface, subtle, and brand color configurations.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={CARD_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {CARD_SECTIONS.tokens.label}
        </Label>

        <Description>
          Surface fills consume semantic background tokens including surface, subtle, and accent variants to maintain unified hierarchy.
        </Description>

        <Description>
          Card borders map to standardized hairline border tokens, delivering consistent frame definition without obscuring inner contents.
        </Description>

        <Description>
          Padding values inherit proportional space tokens matching the global layout rhythm.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={CARD_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {CARD_SECTIONS.styleReference.label}
        </Label>

        <Description>
          Semantic HTML tags can be assigned via the polymorphic as prop to render section, article, or aside elements appropriate to content hierarchy.
        </Description>

        <Description>
          Interactive card implementations preserve accessible focus indicators and clear hover affordances when wrapped with button or link behaviors.
        </Description>

        <Description>
          Nested typographic elements follow established contrast guidelines, ensuring readability across all background color treatments.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
