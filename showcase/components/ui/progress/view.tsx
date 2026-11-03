"use client";

import { useState } from "react";
import { Progress, Button, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import { InteractiveStates } from "@/components/ui/interactive-states";
import {
  PROGRESS_SECTIONS,
  PROGRESS_SECTIONS_LIST,
  PROGRESS_INTERACTIVE_STATES,
  PROGRESS_DEFAULT_CODE_SAMPLE,
  PROGRESS_VARIANTS_CODE_SAMPLE,
  PROGRESS_SIZES_CODE_SAMPLE,
  PROGRESS_COLORS_CODE_SAMPLE,
  PROGRESS_DYNAMIC_CODE_SAMPLE,
} from "./model";

function DynamicProgressStage() {
  const [value, setValue] = useState(35);

  const increment = () => setValue((prev) => (prev >= 100 ? 0 : prev + 15));

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xs">
      <Progress value={value} variant="circular" size="lg" />
      <Progress value={value} variant="linear" size="md" />
      <Button variant="outlined" color="surface" onClick={increment}>
        Advance Progress
      </Button>
    </div>
  );
}

export function ProgressView() {
  const sections = PROGRESS_SECTIONS;

  return (
    <Exhibit
      title="Progress"
      summary="A progress indicator displays quantified or indeterminate operation status across linear tracks and circular vectors, maintaining visual harmony and dimensional stability."
      description="Progress components convey task progression through calibrated color tokens and standardized geometric scales, communicating state changes clearly without jarring visual updates."
      component="progress"
      importCode='import { Progress } from "@homonoid/react";'
      defaultCode={PROGRESS_DEFAULT_CODE_SAMPLE}
      defaultStage={<Progress value={65} variant="circular" />}
      sections={PROGRESS_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={PROGRESS_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          <Progress value={75} variant="circular" />
          <Progress value={75} variant="linear" />
        </div>
      </Exhibit.Stage>

      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={PROGRESS_SIZES_CODE_SAMPLE}>
        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          <div className="flex items-center gap-6">
            <Progress value={70} variant="circular" size="sm" />
            <Progress value={70} variant="circular" size="md" />
            <Progress value={70} variant="circular" size="lg" />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Progress value={70} variant="linear" size="sm" />
            <Progress value={70} variant="linear" size="md" />
            <Progress value={70} variant="linear" size="lg" />
          </div>
        </div>
      </Exhibit.Stage>

      {/* Colors Section */}
      <Exhibit.Stage section={sections.colors} code={PROGRESS_COLORS_CODE_SAMPLE}>
        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          <div className="flex items-center gap-4">
            <Progress value={60} color="primary" />
            <Progress value={60} color="subtle" />
            <Progress value={60} color="surface" />
            <Progress value={60} color="destructive" />
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <Progress value={60} color="primary" variant="linear" />
            <Progress value={60} color="subtle" variant="linear" />
            <Progress value={60} color="surface" variant="linear" />
            <Progress value={60} color="destructive" variant="linear" />
          </div>
        </div>
      </Exhibit.Stage>

      {/* Dynamic Section */}
      <Exhibit.Stage section={sections.dynamic} code={PROGRESS_DYNAMIC_CODE_SAMPLE}>
        <DynamicProgressStage />
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Progress indicators preserve spatial boundaries and geometry as values advance across lifecycle operations. Smooth transitions along the circumference and linear track eliminate abrupt telemetry jumps.
        </Description>

        <Description>
          Theme continuity ensures tracks and indicator fills harmonize with their parent container surfaces across dark and light presentation modes.
        </Description>

        <Description>
          Responsive optical weights maintain balance across standardized component scales.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Progress indicators convey completion metrics through native accessibility roles and explicit percentage values. Assistive technologies receive automated updates via standard progressbar attributes.
        </Description>

        <Description>
          Screen readers announce current values through aria valuenow, minimum values through aria valuemin, maximum values through aria valuemax, and formatted human readable text through aria valuetext.
        </Description>

        <Description>
          Reduced motion preferences disable transitions to provide immediate static states without vestibular disruption.
        </Description>
      </Exhibit.Section>

      {/* Interactive States Section */}
      <InteractiveStates
        id={sections.interactiveStates.id}
        title={sections.interactiveStates.label}
        description="The progress component communicates its operational state through semantic accessibility roles and quantifiable completion attributes:"
        items={PROGRESS_INTERACTIVE_STATES}
      />

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Circular progress sizing maps to sixteen pixel dimensions for small scales, twenty four pixels for medium scales, and thirty two pixels for large scales.
        </Description>

        <Description>
          Linear tracks utilize four pixel, eight pixel, and twelve pixel vertical heights while filling parent container widths smoothly.
        </Description>

        <Description>
          Stroke offset calculations follow calibrated geometric circumferences to ensure exact percentage alignment.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Vector paths and svg circles provide crisp visual definition across varying pixel densities.
        </Description>

        <Description>
          CSS transform transitions execute on composited GPU layers to ensure responsive interactions without interface lag.
        </Description>

        <Description>
          Dynamic indeterminate states animate continuously until quantified metrics become available.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

