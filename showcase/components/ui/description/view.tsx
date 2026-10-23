"use client";

import { Description, Label, Heading, Card, Input } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  DESCRIPTION_SECTIONS,
  DESCRIPTION_SECTIONS_LIST,
  DESCRIPTION_DEFAULT_CODE_SAMPLE,
  DESCRIPTION_VARIANTS_CODE_SAMPLE,
  DESCRIPTION_POLYMORPHISM_CODE_SAMPLE,
  DESCRIPTION_CONTEXT_CODE_SAMPLE,
} from "./model";

export function DescriptionView() {
  useToc(DESCRIPTION_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Description</Heading>
          <Description>
            A description provides supportive, secondary context to accompany headers, form fields, and interactive stages.
          </Description>
        </div>
        <Description>
          Descriptions anchor comprehension, elucidating functionality and purpose while preserving visual continuum across views.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="description" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="font-mono text-xs"
        >
          <code>{highlighter('import { Description } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={DESCRIPTION_DEFAULT_CODE_SAMPLE}>
          <Description className="max-w-md text-center">
            A description delivers supportive guidance and contextual information beneath controls and views.
          </Description>
        </Stage>
      </section>

      {/* Variants Section */}
      <section
        id={DESCRIPTION_SECTIONS.variants.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={DESCRIPTION_SECTIONS.variants.icon} />
          <Heading size="md" as="h2">
            {DESCRIPTION_SECTIONS.variants.label}
          </Heading>
        </div>

        <Stage code={DESCRIPTION_VARIANTS_CODE_SAMPLE}>
          <div className="flex flex-col gap-3 max-w-md">
            <Description variant="muted">
              Muted variant provides secondary contrast for subtitles and auxiliary hints.
            </Description>
            <Description variant="surface">
              Surface variant delivers full foreground contrast for primary readability on tinted containers.
            </Description>
          </div>
        </Stage>
      </section>

      {/* Polymorphism Section */}
      <section
        id={DESCRIPTION_SECTIONS.polymorphism.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={DESCRIPTION_SECTIONS.polymorphism.icon} />
          <Heading size="md" as="h2">
            {DESCRIPTION_SECTIONS.polymorphism.label}
          </Heading>
        </div>

        <Stage code={DESCRIPTION_POLYMORPHISM_CODE_SAMPLE}>
          <div className="flex flex-col gap-3 max-w-md">
            <Description as="p">
              Standard paragraph container for general instructional text.
            </Description>
            <Description as="span">
              Inline span container for inline annotations and supplementary badges.
            </Description>
            <Description as="small">
              Small element for legal disclaimers and secondary metadata footers.
            </Description>
          </div>
        </Stage>
      </section>

      {/* Context Section */}
      <section
        id={DESCRIPTION_SECTIONS.context.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={DESCRIPTION_SECTIONS.context.icon} />
          <Heading size="md" as="h2">
            {DESCRIPTION_SECTIONS.context.label}
          </Heading>
        </div>

        <Stage code={DESCRIPTION_CONTEXT_CODE_SAMPLE}>
          <Card className="flex flex-col gap-3 max-w-sm w-full">
            <div className="flex flex-col gap-1">
              <Label size="sm" as="h3">
                Two Factor Authentication
              </Label>
              <Description>
                Protect your account with biometric keys or authenticator codes.
              </Description>
            </div>
            <Input placeholder="Enter verification code" />
            <Description variant="muted" as="small">
              Verification codes expire ten minutes after generation.
            </Description>
          </Card>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={DESCRIPTION_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {DESCRIPTION_SECTIONS.continuity.label}
        </Heading>

        <Description>
          Descriptions maintain reading cadence and typographical balance across themes and surfaces. Letterforms and baseline geometry stay optically stable when moving between container backgrounds.
        </Description>

        <Description>
          Relaxed vertical line height preserves comfortable scanning ergonomics across varied viewport widths without causing abrupt layout shifts.
        </Description>

        <Description>
          Color contrast adheres to accessible reading thresholds, ensuring that muted guidance remains legible without visually competing against primary headers.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={DESCRIPTION_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {DESCRIPTION_SECTIONS.accessibility.label}
        </Heading>

        <Description>
          Accessibility ensures supportive information reaches all people equally. Homonoid descriptions bridge visual cues with rich assistive text, reinforcing clarity across every workflow.
        </Description>

        <Description>
          Descriptions connect seamlessly to parent inputs and complex controls using aria describedby attributes, giving screen reader users immediate access to helper text and constraints.
        </Description>

        <Description>
          Contrast levels for both default and muted variants are calibrated against accessibility guidelines, maintaining high legibility while signaling appropriate visual hierarchy.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={DESCRIPTION_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {DESCRIPTION_SECTIONS.tokens.label}
        </Heading>

        <Description>
          Color values consume muted and foreground tokens exclusively, ensuring harmonious tonality and dynamic adaptation between light and dark themes.
        </Description>

        <Description>
          Line height maps to the relaxed leading token, providing proportional vertical spacing that balances with the tight tracking of accompanying labels.
        </Description>

        <Description>
          Font sizing automatically harmonizes with the surrounding typographic scale, maintaining clear hierarchy when nested inside cards and form rows.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={DESCRIPTION_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {DESCRIPTION_SECTIONS.styleReference.label}
        </Heading>

        <Description>
          Accessible forms leverage descriptive text via programmatic associations such as described by attributes, ensuring assistive readers announce context accurately.
        </Description>

        <Description>
          Polymorphic flexibility allows descriptions to render as semantic paragraphs, inline spans, or small text runs without altering optical weights.
        </Description>

        <Description>
          Subdued contrast provides clear separation between structural labels and supportive guidance, fostering predictable reading hierarchy across complex interfaces.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}