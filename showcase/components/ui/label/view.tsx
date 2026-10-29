"use client";

import { Label, Description, Input } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  LABEL_SECTIONS,
  LABEL_SECTIONS_LIST,
  LABEL_DEFAULT_CODE_SAMPLE,
  LABEL_SIZES_CODE_SAMPLE,
  LABEL_POLYMORPHISM_CODE_SAMPLE,
  LABEL_FORMS_CODE_SAMPLE,
} from "./model";

export function LabelView() {
  const sections = LABEL_SECTIONS;

  return (
    <Exhibit
      title="Label"
      summary="A label establishes clear typographic hierarchy and semantic prominence for sections, views, and data landmarks."
      description="Labels anchor layout surfaces, providing immediate legibility and visual weight while preserving continuum across responsive viewports."
      component="label"
      importCode='import { Label } from "@homonoid/react";'
      defaultCode={LABEL_DEFAULT_CODE_SAMPLE}
      defaultStage={<Label>Account Settings</Label>}
      sections={LABEL_SECTIONS_LIST}
    >
      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={LABEL_SIZES_CODE_SAMPLE}>
        <div className="flex flex-col items-center gap-4 text-center">
          <Label size="lg">Large Heading</Label>
          <Label size="md">Medium Section</Label>
          <Label size="sm">Small Subsection</Label>
        </div>
      </Exhibit.Stage>

      {/* Polymorphism Section */}
      <Exhibit.Stage section={sections.polymorphism} code={LABEL_POLYMORPHISM_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Form Controls Section */}
      <Exhibit.Stage section={sections.forms} code={LABEL_FORMS_CODE_SAMPLE}>
        <div className="flex flex-col gap-2 max-w-sm w-full">
          <Label as="label" htmlFor="workspace-input">
            Workspace Name
          </Label>
          <Input id="workspace-input" placeholder="e.g. Studio" />
          <Description>
            Used across notifications and shared project invites.
          </Description>
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Labels maintain dimensional stability and letterform metrics across theme transitions. Letter tracking and vertical rhythm stay optically locked when shifting between surfaces and elevations.
        </Description>

        <Description>
          Text metrics preserve optical center and baseline alignment when integrated alongside interactive controls, preventing vertical jump during state changes.
        </Description>

        <Description>
          High contrast foreground tokens maintain WCAG compliant contrast ratios across primary, subtle, and elevated surfaces.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility is the cornerstone of clear interface communication. Homonoid labels ensure that every visual heading and input prompt provides unambiguous meaning for users relying on screen readers and assistive tech.
        </Description>

        <Description>
          Form labels pair natively with inputs using programmatic htmlFor associations or enclosing label elements. Clicking a label activates and transfers focus directly to its connected target control.
        </Description>

        <Description>
          Polymorphic element rendering guarantees proper document outline semantics by producing real h1 through h6 heading tags rather than non semantic styled text blocks.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Typography tokens establish three distinct scale tiers comprising 16px font-semibold for small, 18px font-bold for medium, and 24px font-bold for large titles.
        </Description>

        <Description>
          Tracking tokens apply subtle negative letter spacing across all sizes to optimize headline legibility and optical density on high resolution displays.
        </Description>

        <Description>
          Color values consume foreground design tokens exclusively, ensuring harmonious appearance and effortless synchronization across themes.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Semantic headings align with the accessibility tree, allowing screen readers and keyboard users to navigate page outlines without confusion.
        </Description>

        <Description>
          Polymorphic roots permit seamless mapping to native form labels, heading tags, or inline typography while maintaining strict optical sizing.
        </Description>

        <Description>
          Tight letter tracking optimizes display clarity on high density screens, keeping headlines legible across diverse viewports.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
