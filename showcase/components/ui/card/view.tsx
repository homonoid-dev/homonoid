"use client";

import { Card, Label, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  CARD_SECTIONS,
  CARD_SECTIONS_LIST,
  CARD_DEFAULT_CODE_SAMPLE,
  CARD_VARIANTS_CODE_SAMPLE,
  CARD_COLORS_CODE_SAMPLE,
  CARD_BORDER_CODE_SAMPLE,
} from "./model";

export function CardView() {
  const sections = CARD_SECTIONS;

  return (
    <Exhibit
      title="Card"
      summary="A card groups related content and interactive elements within a clear visual container."
      description="Homonoid cards provide structured surface elevation and flexible padding options while preserving design token fidelity across layouts."
      component="card"
      importCode='import { Card } from "@homonoid/react";'
      defaultCode={CARD_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <Card className="flex flex-col gap-2 max-w-sm w-full p-surface">
          <Label as="h3">
            Project Overview
          </Label>
          <Description>
            Homonoid components provide continuous aesthetic fidelity and tactile physics.
          </Description>
        </Card>
      }
      sections={CARD_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={CARD_VARIANTS_CODE_SAMPLE}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-surface-gap w-full max-w-lg">
          <Card variant="outlined" className="flex flex-col gap-2">
            <Label as="h3">
              Outlined Card
            </Label>
            <Description>
              Transparent surface framed by an optional hairline border stroke.
            </Description>
          </Card>
          <Card variant="filled" className="flex flex-col gap-2">
            <Label as="h3">
              Filled Card
            </Label>
            <Description>
              Solid surface fill providing grounded visual grouping across views.
            </Description>
          </Card>
        </div>
      </Exhibit.Stage>

      {/* Colors Section */}
      <Exhibit.Stage section={sections.colors} code={CARD_COLORS_CODE_SAMPLE}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-surface-gap w-full max-w-lg">
          <Card variant="filled" color="surface" className="flex flex-col gap-2">
            <Label as="h3" className="text-inherit">
              Surface
            </Label>
            <Description className="text-inherit opacity-80">
              Neutral surface background.
            </Description>
          </Card>
          <Card variant="filled" color="subtle" className="flex flex-col gap-2">
            <Label as="h3" className="text-inherit">
              Subtle
            </Label>
            <Description className="text-inherit opacity-80">
              Chroma subtle wash tint.
            </Description>
          </Card>
          <Card variant="filled" color="primary" className="flex flex-col gap-2">
            <Label as="h3" className="text-inherit">
              Primary
            </Label>
            <Description className="text-inherit opacity-80">
              Brand highlight container.
            </Description>
          </Card>
          <Card variant="filled" color="destructive" className="flex flex-col gap-2">
            <Label as="h3" className="text-inherit">
              Destructive
            </Label>
            <Description className="text-inherit opacity-80">
              Danger alert container.
            </Description>
          </Card>
        </div>
      </Exhibit.Stage>

      {/* Border Control Section */}
      <Exhibit.Stage section={sections.border} code={CARD_BORDER_CODE_SAMPLE}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-surface-gap w-full max-w-lg">
          <Card variant="filled" border={true} className="flex flex-col gap-2">
            <Label as="h3">
              With Border
            </Label>
            <Description>
              Hairline border framing the card perimeter.
            </Description>
          </Card>
          <Card variant="filled" border={false} className="flex flex-col gap-2">
            <Label as="h3">
              Borderless
            </Label>
            <Description>
              Border stroke omitted for flat layered surfaces.
            </Description>
          </Card>
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Card surfaces maintain structural visual cohesion across theme modes and elevation changes. Container boundaries preserve physical stability while adapting to internal content flows.
        </Description>

        <Description>
          Variant transitions between outlined and filled states preserve layout dimensions, avoiding layout shifts or border clipping.
        </Description>

        <Description>
          Surface fills and borders calibrate against ambient luminance, ensuring continuous contrast fidelity across light and dark presentations.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility in container architecture establishes semantic hierarchy and landmark clarity. Homonoid cards prioritize structured content navigation for screen readers and keyboard users alike.
        </Description>

        <Description>
          Cards support semantic element customization through the polymorphic as property, permitting developers to render proper article, section, or aside landmarks that screen readers navigate natively.
        </Description>

        <Description>
          When configured with interactive actions, cards maintain accessible focus indicators and clear color contrast ratios across all surface, subtle, and brand color configurations.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Surface fills consume semantic background tokens including surface, subtle, and accent variants to maintain unified hierarchy.
        </Description>

        <Description>
          Card borders map to standardized hairline border tokens, delivering consistent frame definition without obscuring inner contents.
        </Description>

        <Description>
          Padding values inherit proportional space tokens matching the global layout rhythm.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Semantic HTML tags can be assigned via the polymorphic as prop to render section, article, or aside elements appropriate to content hierarchy.
        </Description>

        <Description>
          Interactive card implementations preserve accessible focus indicators and clear hover affordances when wrapped with button or link behaviors.
        </Description>

        <Description>
          Nested typographic elements follow established contrast guidelines, ensuring readability across all background color treatments.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
