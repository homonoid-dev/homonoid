"use client";

import { Orb, Label, Description, Card, type OrbState } from "@harmonia/react";
import { highlighter } from "@/components/ui/code";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { Pagination } from "@/components/ui/pagination";
import { useToc } from "@/components/ui/toc";
import { InteractiveStates } from "@/components/ui/interactive-states";
import {
  ORB_SECTIONS,
  ORB_SECTIONS_LIST,
  ORB_INTERACTIVE_STATES,
  ORB_DEFAULT_CODE_SAMPLE,
  ORB_THEMES_CODE_SAMPLE,
  ORB_STATES_CODE_SAMPLE,
  ORB_SIZES_CODE_SAMPLE,
} from "./model";

export function OrbView() {
  useToc(ORB_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Orb</Label>
        <Description>
          An orb provides real time voice agent presence feedback, communicating voice activity states and dynamic audio reactivity while preserving spatial continuity and dimensional stability.
        </Description>
        <Description>
          Voice orbs establish an expressive focal landmark for conversational interfaces across idle, connecting, listening, thinking, speaking, and error states.
        </Description>
      </div>

      {/* Resources */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="orb" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Component Area */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="flex items-center justify-between font-mono text-xs select-text"
        >
          <code>{highlighter('import { Orb } from "@harmonia/react";')}</code>
        </Card>

        {/* Default Stage */}
        <Stage code={ORB_DEFAULT_CODE_SAMPLE}>
          <Orb theme="cloud" size="lg" state="listening" />
        </Stage>
      </section>

      {/* Themes Section */}
      <section
        id={ORB_SECTIONS.themes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={ORB_SECTIONS.themes.icon} />
          <Label size="lg" as="h2">
            {ORB_SECTIONS.themes.label}
          </Label>
        </div>

        <Description>
          Harmonia provides two distinct expressive themes for voice surfaces. Cloud renders an atmospheric luminous sphere with drifting mist gradients, while Bars provides a rhythmically dancing audio equalizer visualization.
        </Description>

        <Stage code={ORB_THEMES_CODE_SAMPLE}>
          <div className="flex flex-row items-center justify-around w-full max-w-md py-6">
            <div className="flex flex-col items-center gap-3">
              <Orb theme="cloud" state="listening" size="md" />
              <span className="text-xs text-muted font-medium">Cloud</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Orb theme="bars" state="listening" size="md" />
              <span className="text-xs text-muted font-medium">Bars</span>
            </div>
          </div>
        </Stage>
      </section>

      {/* States Section */}
      <section
        id={ORB_SECTIONS.states.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={ORB_SECTIONS.states.icon} />
          <Label size="lg" as="h2">
            {ORB_SECTIONS.states.label}
          </Label>
        </div>

        <Description>
          Every voice session progresses through six standard conversational lifecycle states communicating readiness, transmission, processing, speech, or connection failure.
        </Description>

        <Stage code={ORB_STATES_CODE_SAMPLE}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-6 w-full">
            {(["idle", "connecting", "listening", "thinking", "speaking", "error"] as OrbState[]).map(
              (item) => (
                <div
                  key={item}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-surface/50 border border-border"
                >
                  <Orb
                    theme="cloud"
                    state={item}
                    volume={item === "speaking" ? 0.7 : 0.3}
                    size="sm"
                  />
                  <span className="text-xs font-mono uppercase text-muted font-semibold">
                    {item}
                  </span>
                </div>
              )
            )}
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section
        id={ORB_SECTIONS.sizes.id}
        className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y"
      >
        <div className="flex flex-row gap-surface-gap items-center">
          <Frame icon={ORB_SECTIONS.sizes.icon} />
          <Label size="lg" as="h2">
            {ORB_SECTIONS.sizes.label}
          </Label>
        </div>

        <Description>
          Orb sizing maps directly to tokenized geometric scales comprising small for compact inline voice triggers, medium for floating assistant widgets, and large for dedicated conversation canvases.
        </Description>

        <Stage code={ORB_SIZES_CODE_SAMPLE}>
          <div className="flex flex-row items-center gap-8 py-6">
            <div className="flex flex-col items-center gap-2">
              <Orb theme="cloud" size="sm" state="listening" />
              <span className="text-xs text-muted">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Orb theme="cloud" size="md" state="listening" />
              <span className="text-xs text-muted">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Orb theme="cloud" size="lg" state="listening" />
              <span className="text-xs text-muted">Large</span>
            </div>
          </div>
        </Stage>
      </section>

      {/* Continuity Section */}
      <section
        id={ORB_SECTIONS.continuity.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {ORB_SECTIONS.continuity.label}
        </Label>
        <Description>
          Harmonia requires that voice indicators maintain unbroken material continuity across conversation shifts. Transitioning between states preserves container dimensions to prevent layout jitter or sudden visual clipping.
        </Description>
        <Description>
          Velocity curves accelerate and decelerate fluidly between conversational moments, ensuring the voice presence feels organic, responsive, and alive.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section
        id={ORB_SECTIONS.accessibility.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {ORB_SECTIONS.accessibility.label}
        </Label>
        <Description>
          Voice surfaces communicate operational state through polite live regions, guaranteeing that background conversation shifts are transparent to screen readers.
        </Description>
        <Description>
          When configured as an interactive push to talk button, the surface presents native keyboard focus rings and activates with Enter or Space bar presses.
        </Description>
        <Description>
          Reduced motion preferences automatically replace high velocity oscillations with calm opacity transitions to ensure comfort for all users.
        </Description>
      </section>

      {/* Interactive States Section */}
      <InteractiveStates
        id={ORB_SECTIONS.interactiveStates.id}
        title={ORB_SECTIONS.interactiveStates.label}
        description="The voice orb communicates its operational state through semantic accessibility roles and motion attributes:"
        items={ORB_INTERACTIVE_STATES}
      />

      {/* Design Tokens Section */}
      <section
        id={ORB_SECTIONS.tokens.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {ORB_SECTIONS.tokens.label}
        </Label>
        <Description>
          Orb spatial dimensions derive directly from design tokens, utilizing size orb small, size orb medium, and size orb large variables.
        </Description>
        <Description>
          Color scales consume primary, subtle, and destructive tokens, automatically adapting across light and dark modes with complete color continuity.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section
        id={ORB_SECTIONS.styleReference.id}
        className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y"
      >
        <Label size="lg" as="h2">
          {ORB_SECTIONS.styleReference.label}
        </Label>
        <Description>
          Hardware composited layers run smoothly on compositor threads using transform and opacity properties.
        </Description>
        <Description>
          Procedural shaders and vector elements guarantee crisp rendering on high pixel density displays without pixelation.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
