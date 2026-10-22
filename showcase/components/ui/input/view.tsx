"use client";

import { Input, Heading, Description, Card } from "@homonoid/react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { Pagination } from "@/components/ui/pagination";
import { useToc } from "@/components/ui/toc";
import { InteractiveStates } from "@/components/ui/interactive-states";
import { Search, Mail, Eye } from "lucide-react";
import {
  INPUT_SECTIONS,
  INPUT_SECTIONS_LIST,
  INPUT_INTERACTIVE_STATES,
  INPUT_DEFAULT_CODE_SAMPLE,
  INPUT_VARIANTS_CODE_SAMPLE,
  INPUT_SIZES_CODE_SAMPLE,
  INPUT_ADORNMENTS_CODE_SAMPLE,
  INPUT_LABEL_HELPER_CODE_SAMPLE,
  INPUT_VALIDATION_CODE_SAMPLE,
  INPUT_DISABLED_CODE_SAMPLE,
} from "./model";

export function InputView() {
  useToc(INPUT_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">Input</Heading>
        <Description size="md">
          An input allows users to enter, edit, and submit text data through direct keyboard entry.
        </Description>

        <Description size="md">
          Inputs are foundational interface controls for capturing structured and unstructured user data while maintaining dimensional stability and visual continuity across interactive states.
        </Description>
      </div>

      {/* Resources */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="input" />
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
          <code>{highlighter('import { Input } from "@homonoid/react";')}</code>
        </Card>

        {/* Default Stage */}
        <Stage code={INPUT_DEFAULT_CODE_SAMPLE}>
          <Input placeholder="Enter text..." className="max-w-sm" />
        </Stage>
      </section>

      {/* Variants Section */}
      <section
        id={INPUT_SECTIONS.variants.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={INPUT_SECTIONS.variants.icon} />
          <Heading size="md" as="h2">
            {INPUT_SECTIONS.variants.label}
          </Heading>
        </div>

        <Stage code={INPUT_VARIANTS_CODE_SAMPLE}>
          <div className="flex flex-col gap-surface-gap w-full max-w-sm">
            <Input variant="outlined" placeholder="Outlined input" />
            <Input variant="filled" placeholder="Filled input" />
            <Input variant="plain" placeholder="Plain input" />
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={INPUT_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={INPUT_SECTIONS.sizes.icon} />
          <Heading size="md" as="h2">
            {INPUT_SECTIONS.sizes.label}
          </Heading>
        </div>

        <Stage code={INPUT_SIZES_CODE_SAMPLE}>
          <div className="flex flex-col gap-surface-gap w-full max-w-sm">
            <Input size="sm" placeholder="Small input" />
            <Input size="md" placeholder="Medium input" />
            <Input size="lg" placeholder="Large input" />
          </div>
        </Stage>
      </section>

      {/* Adornments Section */}
      <section
        id={INPUT_SECTIONS.adornments.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={INPUT_SECTIONS.adornments.icon} />
          <Heading size="md" as="h2">
            {INPUT_SECTIONS.adornments.label}
          </Heading>
        </div>

        <Stage code={INPUT_ADORNMENTS_CODE_SAMPLE}>
          <div className="flex flex-col gap-surface-gap w-full max-w-sm">
            <Input
              leading={<Search className="size-4 text-muted" />}
              placeholder="Search components..."
            />
            <Input
              leading={<Mail className="size-4 text-muted" />}
              placeholder="Email address"
            />
            <Input
              type="password"
              trailing={<Eye className="size-4 text-muted cursor-pointer" />}
              placeholder="Password"
            />
          </div>
        </Stage>
      </section>

      {/* Label & Helper Section */}
      <section
        id={INPUT_SECTIONS.labelAndHelper.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={INPUT_SECTIONS.labelAndHelper.icon} />
          <Heading size="md" as="h2">
            {INPUT_SECTIONS.labelAndHelper.label}
          </Heading>
        </div>

        <Stage code={INPUT_LABEL_HELPER_CODE_SAMPLE}>
          <div className="flex flex-col gap-surface-gap w-full max-w-sm">
            <Input
              label="Email Address"
              description="We will only use this to send transaction receipts."
              placeholder="name@company.com"
            />
          </div>
        </Stage>
      </section>

      {/* Validation Section */}
      <section
        id={INPUT_SECTIONS.validation.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={INPUT_SECTIONS.validation.icon} />
          <Heading size="md" as="h2">
            {INPUT_SECTIONS.validation.label}
          </Heading>
        </div>

        <Stage code={INPUT_VALIDATION_CODE_SAMPLE}>
          <div className="flex flex-col gap-surface-gap w-full max-w-sm">
            <Input
              invalid
              label="Username"
              error="This username is already taken."
              defaultValue="lumunar"
            />
          </div>
        </Stage>
      </section>

      {/* Disabled Section */}
      <section
        id={INPUT_SECTIONS.disabled.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={INPUT_SECTIONS.disabled.icon} />
          <Heading size="md" as="h2">
            {INPUT_SECTIONS.disabled.label}
          </Heading>
        </div>

        <Stage code={INPUT_DISABLED_CODE_SAMPLE}>
          <div className="flex flex-col gap-surface-gap w-full max-w-sm">
            <Input
              disabled
              label="Account ID"
              defaultValue="acc_983142"
              description="System managed identifier cannot be modified."
            />
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section
        id={INPUT_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {INPUT_SECTIONS.continuity.label}
        </Heading>

        <Description>
          Homonoid requires that state transitions preserve component identity without abrupt dimensional shifts. The container outer bounds and border radius remain constant when switching between rest, hover, focus, and invalid states.
        </Description>

        <Description>
          Accommodating leading or trailing elements preserves container boundaries and vertical alignment without layout shift.
        </Description>

        <Description>
          Color transitions for background and border interpolate smoothly using defined motion duration and standard easing curve tokens.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={INPUT_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {INPUT_SECTIONS.accessibility.label}
        </Heading>

        <Description>
          Accessibility is fundamental to every Homonoid form primitive. We design text fields to offer unambiguous operational cues, robust input validation announcements, and complete assistive device compatibility.
        </Description>

        <Description>
          Inputs automatically associate accompanying label and helper text using aria labelledby and aria describedby relationships. When errors occur, invalid state cues and live region error announcements guide users directly toward resolution.
        </Description>

        <Description>
          Visible focus rings encircle the input boundary during keyboard focus, meeting strict contrast ratios and ensuring effortless field navigation across complex forms.
        </Description>
      </section>

      {/* Interactive States Section */}
      <InteractiveStates
        id={INPUT_SECTIONS.interactiveStates.id}
        title={INPUT_SECTIONS.interactiveStates.label}
        description="The input supports both CSS pseudo classes and data attributes for flexibility:"
        items={INPUT_INTERACTIVE_STATES}
      />

      {/* Design Tokens Section */}
      <section
        id={INPUT_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {INPUT_SECTIONS.tokens.label}
        </Heading>

        <Description>
          Input containers share identical height tokens with buttons to ensure consistent vertical rhythm when grouped horizontally across forms and toolbars.
        </Description>

        <Description>
          Typography tokens scale progressively across sizes, utilizing small text for compact displays, regular body text for standard forms, and large text for prominent inputs.
        </Description>

        <Description>
          Interactive transitions for container borders and ring outlines execute using standard fast motion tokens and cubic bezier easing curves.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={INPUT_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Heading size="md" as="h2">
          {INPUT_SECTIONS.styleReference.label}
        </Heading>

        <Description>
          Outlined inputs establish a crisp hairline boundary around the text entry surface, projecting a dedicated focus ring when keyboard navigation engages.
        </Description>

        <Description>
          Filled inputs provide a comfortable tinted background container with soft border accents, offering clear visual separation within lighter interfaces.
        </Description>

        <Description>
          Plain inputs omit borders and container fills at rest, blending seamlessly into data dense tables and inline content editing contexts.
        </Description>

        <Description>
          Form captions and validation messages align beneath the container frame, shifting into high visibility destructive tones when validation conditions fail.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
