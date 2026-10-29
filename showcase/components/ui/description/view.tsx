"use client";

import { Description, Label, Input, Card } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  DESCRIPTION_SECTIONS,
  DESCRIPTION_SECTIONS_LIST,
  DESCRIPTION_DEFAULT_CODE_SAMPLE,
  DESCRIPTION_VARIANTS_CODE_SAMPLE,
  DESCRIPTION_POLYMORPHISM_CODE_SAMPLE,
  DESCRIPTION_CONTEXT_CODE_SAMPLE,
} from "./model";

export function DescriptionView() {
  const sections = DESCRIPTION_SECTIONS;

  return (
    <Exhibit
      title="Description"
      summary="A description provides supportive, secondary context to accompany headers, form fields, and interactive stages."
      description="Descriptions anchor comprehension, elucidating functionality and purpose while preserving visual continuum across views."
      component="description"
      importCode='import { Description } from "@homonoid/react";'
      defaultCode={DESCRIPTION_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <Description className="max-w-md text-center">
          A description delivers supportive guidance and contextual information beneath controls and views.
        </Description>
      }
      sections={DESCRIPTION_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={DESCRIPTION_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-col gap-3 max-w-md">
          <Description variant="muted">
            Muted variant provides secondary contrast for subtitles and auxiliary hints.
          </Description>
          <Description variant="surface">
            Surface variant delivers full foreground contrast for primary readability on tinted containers.
          </Description>
        </div>
      </Exhibit.Stage>

      {/* Polymorphism Section */}
      <Exhibit.Stage section={sections.polymorphism} code={DESCRIPTION_POLYMORPHISM_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Context Section */}
      <Exhibit.Stage section={sections.context} code={DESCRIPTION_CONTEXT_CODE_SAMPLE}>
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
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Descriptions maintain reading cadence and typographical balance across themes and surfaces. Letterforms and baseline geometry stay optically stable when moving between container backgrounds.
        </Description>

        <Description>
          Relaxed vertical line height preserves comfortable scanning ergonomics across varied viewport widths without causing abrupt layout shifts.
        </Description>

        <Description>
          Color contrast adheres to accessible reading thresholds, ensuring that muted guidance remains legible without visually competing against primary headers.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility ensures supportive information reaches all people equally. Homonoid descriptions bridge visual cues with rich assistive text, reinforcing clarity across every workflow.
        </Description>

        <Description>
          Descriptions connect seamlessly to parent inputs and complex controls using aria describedby attributes, giving screen reader users immediate access to helper text and constraints.
        </Description>

        <Description>
          Contrast levels for both default and muted variants are calibrated against accessibility guidelines, maintaining high legibility while signaling appropriate visual hierarchy.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Color values consume muted and foreground tokens exclusively, ensuring harmonious tonality and dynamic adaptation between light and dark themes.
        </Description>

        <Description>
          Line height maps to the relaxed leading token, providing proportional vertical spacing that balances with the tight tracking of accompanying labels.
        </Description>

        <Description>
          Font sizing automatically harmonizes with the surrounding typographic scale, maintaining clear hierarchy when nested inside cards and form rows.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Accessible forms leverage descriptive text via programmatic associations such as described by attributes, ensuring assistive readers announce context accurately.
        </Description>

        <Description>
          Polymorphic flexibility allows descriptions to render as semantic paragraphs, inline spans, or small text runs without altering optical weights.
        </Description>

        <Description>
          Subdued contrast provides clear separation between structural labels and supportive guidance, fostering predictable reading hierarchy across complex interfaces.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
