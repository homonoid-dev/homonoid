"use client";

import { Label, Description, Card, Input } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  LABEL_SECTIONS,
  LABEL_SECTIONS_LIST,
  LABEL_DEFAULT_CODE_SAMPLE,
  LABEL_SIZES_CODE_SAMPLE,
  LABEL_POLYMORPHISM_CODE_SAMPLE,
  LABEL_FORMS_CODE_SAMPLE,
} from "./model";

export function LabelView() {
  useToc(LABEL_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Label</Label>
        <Description>
          A label establishes clear typographic hierarchy and semantic prominence for sections, views, and data landmarks.
        </Description>
        <Description>
          Labels anchor layout surfaces, providing immediate legibility and visual weight while preserving continuum across responsive viewports.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="label" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Label } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={LABEL_DEFAULT_CODE_SAMPLE}>
          <Label size="lg" as="h1">
            Account Settings
          </Label>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={LABEL_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={LABEL_SECTIONS.sizes.icon} />
          <Label size="lg" as="h2">
            {LABEL_SECTIONS.sizes.label}
          </Label>
        </div>

        <Stage code={LABEL_SIZES_CODE_SAMPLE}>
          <div className="flex flex-col items-center gap-4 text-center">
            <Label size="lg">Large Heading</Label>
            <Label size="md">Medium Section</Label>
            <Label size="sm">Small Subsection</Label>
          </div>
        </Stage>
      </section>

      {/* Polymorphism Section */}
      <section
        id={LABEL_SECTIONS.polymorphism.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={LABEL_SECTIONS.polymorphism.icon} />
          <Label size="lg" as="h2">
            {LABEL_SECTIONS.polymorphism.label}
          </Label>
        </div>

        <Stage code={LABEL_POLYMORPHISM_CODE_SAMPLE}>
          <div className="flex flex-col items-center gap-3 text-center">
            <Label as="h1" size="lg">
              Document Landmark (h1)
            </Label>
            <Label as="h2" size="md">
              Regional Section (h2)
            </Label>
            <Label as="span" size="sm">
              Inline Accessory (span)
            </Label>
          </div>
        </Stage>
      </section>

      {/* Form Controls Section */}
      <section
        id={LABEL_SECTIONS.forms.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={LABEL_SECTIONS.forms.icon} />
          <Label size="lg" as="h2">
            {LABEL_SECTIONS.forms.label}
          </Label>
        </div>

        <Stage code={LABEL_FORMS_CODE_SAMPLE}>
          <div className="flex flex-col gap-2 max-w-sm w-full">
            <Label as="label" htmlFor="workspace-input" size="sm">
              Workspace Name
            </Label>
            <Input id="workspace-input" placeholder="e.g. Studio" />
            <Description>
              Used across notifications and shared project invites.
            </Description>
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={LABEL_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {LABEL_SECTIONS.continuity.label}
        </Label>

        <Description>
          Labels maintain dimensional stability and letterform metrics across theme transitions. Letter tracking and vertical rhythm stay optically locked when shifting between surfaces and elevations.
        </Description>

        <Description>
          Text metrics preserve optical center and baseline alignment when integrated alongside interactive controls, preventing vertical jump during state changes.
        </Description>

        <Description>
          High contrast foreground tokens maintain WCAG compliant contrast ratios across primary, subtle, and elevated surfaces.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={LABEL_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {LABEL_SECTIONS.accessibility.label}
        </Label>

        <Description>
          Accessibility is the cornerstone of clear interface communication. Homonoid labels ensure that every visual heading and input prompt provides unambiguous meaning for users relying on screen readers and assistive tech.
        </Description>

        <Description>
          Form labels pair natively with inputs using programmatic htmlFor associations or enclosing label elements. Clicking a label activates and transfers focus directly to its connected target control.
        </Description>

        <Description>
          Polymorphic element rendering guarantees proper document outline semantics by producing real h1 through h6 heading tags rather than non semantic styled text blocks.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={LABEL_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {LABEL_SECTIONS.tokens.label}
        </Label>

        <Description>
          Typography tokens establish three distinct scale tiers comprising 16px font-semibold for small, 18px font-bold for medium, and 24px font-bold for large titles.
        </Description>

        <Description>
          Tracking tokens apply subtle negative letter spacing across all sizes to optimize headline legibility and optical density on high resolution displays.
        </Description>

        <Description>
          Color values consume foreground design tokens exclusively, ensuring harmonious appearance and effortless synchronization across themes.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={LABEL_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {LABEL_SECTIONS.styleReference.label}
        </Label>

        <Description>
          Semantic headings align with the accessibility tree, allowing screen readers and keyboard users to navigate page outlines without confusion.
        </Description>

        <Description>
          Polymorphic roots permit seamless mapping to native form labels, heading tags, or inline typography while maintaining strict optical sizing.
        </Description>

        <Description>
          Tight letter tracking optimizes display clarity on high density screens, keeping headlines legible across diverse viewports.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
