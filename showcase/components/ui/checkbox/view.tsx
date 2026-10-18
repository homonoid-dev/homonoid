"use client";

import { Checkbox, Label, Description, Card } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  CHECKBOX_SECTIONS,
  CHECKBOX_SECTIONS_LIST,
  CHECKBOX_DEFAULT_CODE_SAMPLE,
  CHECKBOX_STATES_CODE_SAMPLE,
  CHECKBOX_SIZES_CODE_SAMPLE,
  CHECKBOX_SHAPES_CODE_SAMPLE,
  CHECKBOX_LABEL_HELPER_CODE_SAMPLE,
  CHECKBOX_DISABLED_CODE_SAMPLE,
} from "./model";

export function CheckboxView() {
  useToc(CHECKBOX_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Checkbox</Label>
        <Description>
          A checkbox allows users to select one or more independent options from a set, or toggle a single binary state between on and off.
        </Description>
        <Description>
          Homonoid checkboxes communicate clear affirmative selections and support a three state model comprising unchecked, checked, and indeterminate while preserving tactile physical feedback.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="checkbox" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Checkbox } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={CHECKBOX_DEFAULT_CODE_SAMPLE}>
          <Checkbox
            label="I agree to terms and conditions"
            defaultChecked
          />
        </Stage>
      </section>

      {/* States Section */}
      <section
        id={CHECKBOX_SECTIONS.states.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={CHECKBOX_SECTIONS.states.icon} />
          <Label size="lg" as="h2">
            {CHECKBOX_SECTIONS.states.label}
          </Label>
        </div>

        <Stage code={CHECKBOX_STATES_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Checkbox aria-label="Unchecked option" />
            <Checkbox aria-label="Checked option" defaultChecked />
            <Checkbox aria-label="Indeterminate option" indeterminate />
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={CHECKBOX_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={CHECKBOX_SECTIONS.sizes.icon} />
          <Label size="lg" as="h2">
            {CHECKBOX_SECTIONS.sizes.label}
          </Label>
        </div>

        <Stage code={CHECKBOX_SIZES_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Checkbox size="sm" defaultChecked aria-label="Small checkbox" />
            <Checkbox size="md" defaultChecked aria-label="Medium checkbox" />
            <Checkbox size="lg" defaultChecked aria-label="Large checkbox" />
          </div>
        </Stage>
      </section>

      {/* Shapes Section */}
      <section
        id={CHECKBOX_SECTIONS.shapes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={CHECKBOX_SECTIONS.shapes.icon} />
          <Label size="lg" as="h2">
            {CHECKBOX_SECTIONS.shapes.label}
          </Label>
        </div>

        <Stage code={CHECKBOX_SHAPES_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Checkbox defaultChecked aria-label="Standard shape" />
            <Checkbox shape="circle" defaultChecked aria-label="Circle shape" />
            <Checkbox shape="square" defaultChecked aria-label="Square shape" />
          </div>
        </Stage>
      </section>

      {/* Label and Helper Section */}
      <section
        id={CHECKBOX_SECTIONS.labelAndHelper.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={CHECKBOX_SECTIONS.labelAndHelper.icon} />
          <Label size="lg" as="h2">
            {CHECKBOX_SECTIONS.labelAndHelper.label}
          </Label>
        </div>

        <Stage code={CHECKBOX_LABEL_HELPER_CODE_SAMPLE}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Checkbox
              defaultChecked
              label="Subscribe to weekly product digests"
              description="Receive curated feature release notes and ecosystem updates once per week."
            />
          </div>
        </Stage>
      </section>

      {/* Disabled Section */}
      <section
        id={CHECKBOX_SECTIONS.disabled.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={CHECKBOX_SECTIONS.disabled.icon} />
          <Label size="lg" as="h2">
            {CHECKBOX_SECTIONS.disabled.label}
          </Label>
        </div>

        <Stage code={CHECKBOX_DISABLED_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Checkbox disabled aria-label="Disabled unchecked" />
            <Checkbox disabled defaultChecked aria-label="Disabled checked" />
            <Checkbox disabled indeterminate aria-label="Disabled indeterminate" />
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={CHECKBOX_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {CHECKBOX_SECTIONS.continuity.label}
        </Label>

        <Description>
          State transitions maintain absolute geometric stability. Outer boundaries and control dimensions remain locked in place when transitioning across unchecked, checked, and indeterminate states.
        </Description>

        <Description>
          Glyphs scale and morph dynamically into place using hardware composited GPU transforms rather than abrupt visual popups.
        </Description>

        <Description>
          Active pointer compression applies subtle scale tension across both the indicator box and accompanying label, providing immediate physical feedback upon click.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={CHECKBOX_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {CHECKBOX_SECTIONS.accessibility.label}
        </Label>

        <Description>
          Accessibility for selection controls empowers all users with predictable states and effortless activation. We treat inclusive design as an absolute requirement rather than an afterthought.
        </Description>

        <Description>
          Checkboxes expose native input role semantics, ensuring screen readers announce current checked, unchecked, or mixed states accurately. Spacebar toggles and tab order navigation function without specialized configuration.
        </Description>

        <Description>
          Clear focus outlines enclose the control upon keyboard navigation. Generous touch target sizing guarantees reliable tapping across mobile screens and assistive pointer accessories.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section
        id={CHECKBOX_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {CHECKBOX_SECTIONS.tokens.label}
        </Label>

        <Description>
          Control dimensions map to standard geometric tokens comprising 16px for small, 20px for medium, and 24px for large scale presentations.
        </Description>

        <Description>
          Corner radii calibrate proportionally to control dimensions using standardized scale radius tokens to preserve aesthetic harmony with neighboring inputs and buttons.
        </Description>

        <Description>
          Color values consume primary brand tokens and neutral border tokens exclusively, synchronizing effortlessly across light and dark theme environments.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={CHECKBOX_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {CHECKBOX_SECTIONS.styleReference.label}
        </Label>

        <Description>
          Accessible native input elements preserve standard form submission semantics, keyboard spacebar toggles, and screen reader announcements.
        </Description>

        <Description>
          Indeterminate parent controls communicate partial group selection to assistive technologies using mixed state aria attributes.
        </Description>

        <Description>
          Prominent focus rings encircle the control boundary during keyboard navigation, ensuring WCAG compliant visibility standards.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
