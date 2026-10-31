"use client";

import { Textarea, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  TEXTAREA_SECTIONS,
  TEXTAREA_SECTIONS_LIST,
  TEXTAREA_DEFAULT_CODE_SAMPLE,
  TEXTAREA_VARIANTS_CODE_SAMPLE,
  TEXTAREA_SIZES_CODE_SAMPLE,
  TEXTAREA_AUTO_RESIZE_CODE_SAMPLE,
  TEXTAREA_FLOATING_LABEL_CODE_SAMPLE,
  TEXTAREA_VALIDATION_CODE_SAMPLE,
} from "./model";

export function TextareaView() {
  const sections = TEXTAREA_SECTIONS;

  return (
    <Exhibit
      title="Textarea"
      summary="A textarea allows users to enter, edit, and submit multi line text content through direct keyboard interaction."
      description="Textareas represent foundational interface controls for capturing paragraph copy, descriptions, feedback messages, and structured code snippets while maintaining dimensional stability, fluid auto resizing, and visual continuity across interactive states."
      component="textarea"
      importCode='import { Textarea } from "@homonoid/react";'
      defaultCode={TEXTAREA_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <div className="w-full max-w-sm mx-auto">
          <Textarea
            label="Feedback"
            placeholder="Share your thoughts with the team..."
            description="Write concise feedback regarding your experience."
            rows={4}
          />
        </div>
      }
      sections={TEXTAREA_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={TEXTAREA_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <Textarea variant="outlined" placeholder="Outlined textarea..." rows={3} />
          <Textarea variant="contained" placeholder="Contained textarea..." rows={3} />
          <Textarea variant="plain" placeholder="Plain textarea..." rows={3} />
        </div>
      </Exhibit.Stage>

      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={TEXTAREA_SIZES_CODE_SAMPLE}>
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <Textarea size="sm" placeholder="Small textarea..." rows={2} />
          <Textarea size="md" placeholder="Medium textarea..." rows={3} />
          <Textarea size="lg" placeholder="Large textarea..." rows={4} />
        </div>
      </Exhibit.Stage>

      {/* Auto Resizing Section */}
      <Exhibit.Stage section={sections.autoResize} code={TEXTAREA_AUTO_RESIZE_CODE_SAMPLE}>
        <div className="w-full max-w-sm mx-auto">
          <Textarea
            autoResize
            minRows={3}
            maxRows={8}
            placeholder="Type continuous thoughts here to see smooth vertical auto expansion..."
          />
        </div>
      </Exhibit.Stage>

      {/* Floating Label Section */}
      <Exhibit.Stage section={sections.floatingLabel} code={TEXTAREA_FLOATING_LABEL_CODE_SAMPLE}>
        <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
          <Textarea
            floating
            label="Project Notes"
            placeholder="Document implementation details..."
            rows={3}
          />
          <Textarea
            floating
            label="Repository Summary"
            defaultValue="Homonoid design system built with React 19 and Tailwind CSS v4."
            rows={3}
          />
        </div>
      </Exhibit.Stage>

      {/* Validation Section */}
      <Exhibit.Stage section={sections.validation} code={TEXTAREA_VALIDATION_CODE_SAMPLE}>
        <div className="w-full max-w-sm mx-auto">
          <Textarea
            invalid
            label="Submission Details"
            defaultValue="Missing requirements"
            error="Please provide at least three detailed bullet points."
            rows={3}
          />
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Container dimensions scale smoothly during content growth without causing scrollbar flickers or layout displacement.
        </Description>
        <Description>
          Focus rings and border highlights preserve visual continuity using Chroma primary tokens across light and dark modes.
        </Description>
        <Description>
          Floating labels animate upward into the container notch with calibrated easing curves and background masking.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Native HTML textarea elements deliver complete keyboard navigation and native screen reader compatibility.
        </Description>
        <Description>
          Validation error messages and helper descriptions bind programmatically to the control via accessible identifier references.
        </Description>
        <Description>
          Floating labels maintain clear contrast ratios and associate explicitly with the underlying field via HTML for attributes.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          All border strokes, background fills, and hover highlights consume semantic surface and border tokens from the tokens package.
        </Description>
        <Description>
          Typography scaling and padding insets adhere strictly to standard control tokens across small, medium, and large sizes.
        </Description>
        <Description>
          Focus rings match platform visual standards with high contrast visibility across both light and dark themes.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Textarea operates as a unified atomic control inheriting the layout foundation and styling mechanics of the Input component.
        </Description>
        <Description>
          Developers can configure automatic height adjustments, row boundaries, manual resize directions, and floating label treatments.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

