"use client";

import { Spinner, Button, Input, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import { InteractiveStates } from "@/components/ui/interactive-states";
import {
  SPINNER_SECTIONS,
  SPINNER_SECTIONS_LIST,
  SPINNER_INTERACTIVE_STATES,
  SPINNER_DEFAULT_CODE_SAMPLE,
  SPINNER_ANIMATIONS_CODE_SAMPLE,
  SPINNER_SIZES_CODE_SAMPLE,
  SPINNER_COLORS_CODE_SAMPLE,
  SPINNER_EMBEDDED_CODE_SAMPLE,
} from "./model";

export function SpinnerView() {
  const sections = SPINNER_SECTIONS;

  return (
    <Exhibit
      title="Spinner"
      summary="A spinner provides non blocking indeterminate progress feedback, communicating that a background process is active while preserving spatial and visual continuity."
      description="Spinners indicate that an operation is underway without requiring precise completion time estimations, integrating seamlessly into buttons, inputs, and modal containers."
      component="spinner"
      importCode='import { Spinner } from "@homonoid/react";'
      defaultCode={SPINNER_DEFAULT_CODE_SAMPLE}
      defaultStage={<Spinner />}
      sections={SPINNER_SECTIONS_LIST}
    >
      {/* Animations Section */}
      <Exhibit.Stage section={sections.animations} code={SPINNER_ANIMATIONS_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap justify-center items-center gap-surface-gap">
          <div className="flex flex-col items-center gap-2">
            <Spinner animation="border" />
            <span className="text-xs text-muted">Border</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner animation="grow" />
            <span className="text-xs text-muted">Grow</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner animation="orbit" />
            <span className="text-xs text-muted">Orbit</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner animation="dash" />
            <span className="text-xs text-muted">Dash</span>
          </div>
        </div>
      </Exhibit.Stage>

      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={SPINNER_SIZES_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap justify-center items-center gap-surface-gap">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </Exhibit.Stage>

      {/* Colors Section */}
      <Exhibit.Stage section={sections.colors} code={SPINNER_COLORS_CODE_SAMPLE}>
        <div className="flex flex-row items-center gap-8">
          <Spinner color="subtle" />
          <Spinner color="foreground" />
          <Spinner color="destructive" />
        </div>
      </Exhibit.Stage>

      {/* Embedded Section */}
      <Exhibit.Stage section={sections.embedded} code={SPINNER_EMBEDDED_CODE_SAMPLE}>
        <div className="flex flex-col gap-surface-gap w-full max-w-sm">
          <Button loading>
            Submitting
          </Button>
          <Input
            placeholder="Searching components..."
            trailing={<Spinner size="sm" color="subtle" />}
          />
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Homonoid requires that loading indicators integrate seamlessly into parent components without dimensional disruption. When embedded within buttons or form controls, the spinner occupies a dedicated spatial slot to prevent layout jumps.
        </Description>

        <Description>
          Motion remains continuous and fluid across asynchronous operations, cross fading into view during initiation and fading out gently upon completion.
        </Description>

        <Description>
          Theme continuity ensures that the indicator inherits current color by default, harmonizing with its immediate container across varying surface treatments.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility for loading indicators ensures that asynchronous updates are never solely visual. Homonoid values inclusive design by conveying background activity reliably across all sensory modalities.
        </Description>

        <Description>
          Spinners feature status role semantics and aria live announcements to inform assistive technologies when data operations begin and resolve. Hidden descriptive labels provide contextual clarity for screen readers.
        </Description>

        <Description>
          System motion preferences are honored automatically. For users who prefer reduced motion, continuous rotation transitions into a steady status indicator to avoid vestibular discomfort.
        </Description>
      </Exhibit.Section>

      {/* Interactive States Section */}
      <InteractiveStates
        id={sections.interactiveStates.id}
        title={sections.interactiveStates.label}
        description="The spinner communicates its operational state through semantic accessibility roles and motion attributes:"
        items={SPINNER_INTERACTIVE_STATES}
      />

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Spinner sizing maps directly to tokenized geometric dimensions comprising 16px for small, 24px for medium, and 32px for large scales.
        </Description>

        <Description>
          Angular rotation executes over a calibrated duration between 750ms and 1000ms using continuous linear progression for borders and rhythmic easing curves for grow variants.
        </Description>

        <Description>
          Stroke thickness and radial scale tokens maintain balanced optical weight across both light and dark backgrounds.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Vector geometry is rendered using resolution independent SVG circles and paths, ensuring crisp rendering on high density displays.
        </Description>

        <Description>
          Animation timing runs on hardware composited layers using GPU accelerated transforms to prevent frame drops during simultaneous interface operations.
        </Description>

        <Description>
          Accessible announcements utilize live status regions while decorative inline instances suppress duplicate screen reader feedback.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
