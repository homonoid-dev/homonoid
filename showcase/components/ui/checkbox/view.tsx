"use client";

import { Checkbox, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  CHECKBOX_SECTIONS,
  CHECKBOX_SECTIONS_LIST,
  CHECKBOX_DEFAULT_CODE_SAMPLE,
  CHECKBOX_STATES_CODE_SAMPLE,
  CHECKBOX_SIZES_CODE_SAMPLE,
  CHECKBOX_LABEL_HELPER_CODE_SAMPLE,
  CHECKBOX_RADIUS_CODE_SAMPLE,
  CHECKBOX_DISABLED_CODE_SAMPLE,
  CHECKBOX_TILE_CODE_SAMPLE,
} from "./model";

export function CheckboxView() {
  const sections = CHECKBOX_SECTIONS;

  return (
    <Exhibit
      title="Checkbox"
      summary="A checkbox allows users to select one or more independent options from a set, or toggle a single binary state between on and off."
      description="Homonoid checkboxes communicate clear affirmative selections and support a three state model comprising unchecked, checked, and indeterminate while preserving tactile physical feedback."
      component="checkbox"
      importCode='import { Checkbox } from "@homonoid/react";'
      defaultCode={CHECKBOX_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <Checkbox
          label="I agree to terms and conditions"
          defaultChecked
        />
      }
      sections={CHECKBOX_SECTIONS_LIST}
    >
      {/* States Section */}
      <Exhibit.Stage section={sections.states} code={CHECKBOX_STATES_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap items-center gap-surface-gap">
          <Checkbox aria-label="Unchecked option" />
          <Checkbox aria-label="Checked option" defaultChecked />
          <Checkbox aria-label="Indeterminate option" indeterminate />
          <Checkbox invalid aria-label="Invalid unchecked option" />
          <Checkbox invalid defaultChecked aria-label="Invalid checked option" />
        </div>
      </Exhibit.Stage>

      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={CHECKBOX_SIZES_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap items-center gap-surface-gap">
          <Checkbox size="sm" defaultChecked aria-label="Small checkbox" />
          <Checkbox size="md" defaultChecked aria-label="Medium checkbox" />
          <Checkbox size="lg" defaultChecked aria-label="Large checkbox" />
        </div>
      </Exhibit.Stage>

      {/* Label and Helper Section */}
      <Exhibit.Stage section={sections.labelAndHelper} code={CHECKBOX_LABEL_HELPER_CODE_SAMPLE}>
        <div className="flex flex-col gap-4 max-w-sm">
          <Checkbox
            defaultChecked
            label="Subscribe to weekly product digests"
            description="Receive curated feature release notes and ecosystem updates once per week."
          />
        </div>
      </Exhibit.Stage>

      {/* Radius Section */}
      <Exhibit.Stage section={sections.radius} code={CHECKBOX_RADIUS_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap items-center gap-surface-gap">
          <Checkbox radius="full" defaultChecked aria-label="Circular radius checkbox" />
          <Checkbox radius="lg" defaultChecked aria-label="Large radius checkbox" />
          <Checkbox radius="md" defaultChecked aria-label="Medium radius checkbox" />
          <Checkbox radius="sm" defaultChecked aria-label="Small radius checkbox" />
          <Checkbox radius="none" defaultChecked aria-label="Sharp radius checkbox" />
        </div>
      </Exhibit.Stage>

      {/* Disabled Section */}
      <Exhibit.Stage section={sections.disabled} code={CHECKBOX_DISABLED_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap items-center gap-surface-gap">
          <Checkbox disabled aria-label="Disabled unchecked" />
          <Checkbox disabled defaultChecked aria-label="Disabled checked" />
          <Checkbox disabled indeterminate aria-label="Disabled indeterminate" />
        </div>
      </Exhibit.Stage>

      {/* Tile Section */}
      <Exhibit.Stage section={sections.tile} code={CHECKBOX_TILE_CODE_SAMPLE}>
        <div className="flex flex-col gap-control-gap w-full max-w-sm">
          <Checkbox.Tile
            label="I agree to terms and conditions"
            defaultChecked
          />
          <Checkbox.Tile
            variant="outlined"
            label="Push Notifications"
            description="Receive instant alerts for incoming messages"
            defaultChecked
          />
          <Checkbox.Tile
            placement="leading"
            label="Leading Selection"
            description="Checkbox control positioned on the leading edge"
          />
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          State transitions maintain absolute geometric stability. Outer boundaries and control dimensions remain locked in place when transitioning across unchecked, checked, and indeterminate states.
        </Description>

        <Description>
          Glyphs scale and morph dynamically into place using hardware composited GPU transforms rather than abrupt visual popups.
        </Description>

        <Description>
          Active pointer compression applies subtle scale tension across both the indicator box and accompanying label, providing immediate physical feedback upon click.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility for selection controls empowers all users with predictable states and effortless activation. We treat inclusive design as an absolute requirement rather than an afterthought.
        </Description>

        <Description>
          Checkboxes expose native input role semantics, ensuring screen readers announce current checked, unchecked, or mixed states accurately. Spacebar toggles and tab order navigation function without specialized configuration.
        </Description>

        <Description>
          Clear focus outlines enclose the control upon keyboard navigation. Generous touch target sizing guarantees reliable tapping across mobile screens and assistive pointer accessories.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Control dimensions map to standard geometric tokens comprising 16px for small, 20px for medium, and 24px for large scale presentations.
        </Description>

        <Description>
          Corner radii calibrate proportionally to control dimensions using standardized scale radius tokens to preserve aesthetic harmony with neighboring inputs and buttons.
        </Description>

        <Description>
          Color values consume primary brand tokens and neutral border tokens exclusively, synchronizing effortlessly across light and dark theme environments.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Accessible native input elements preserve standard form submission semantics, keyboard spacebar toggles, and screen reader announcements.
        </Description>

        <Description>
          Indeterminate parent controls communicate partial group selection to assistive technologies using mixed state aria attributes.
        </Description>

        <Description>
          Prominent focus rings encircle the control boundary during keyboard navigation, ensuring WCAG compliant visibility standards.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
