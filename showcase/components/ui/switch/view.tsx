"use client";

import { Switch, Heading, Label, Description, Card } from "@homonoid/react";
import { Stage } from "@/components/ui/stage";
import { Resource } from "@/components/ui/resource";
import { Frame } from "@/components/ui/frame";
import { highlighter } from "@/components/ui/code";
import { useToc } from "@/components/ui/toc";
import { Pagination } from "@/components/ui/pagination";
import {
  SWITCH_SECTIONS,
  SWITCH_SECTIONS_LIST,
  SWITCH_DEFAULT_CODE_SAMPLE,
  SWITCH_STATES_CODE_SAMPLE,
  SWITCH_SIZES_CODE_SAMPLE,
  SWITCH_LABEL_HELPER_CODE_SAMPLE,
  SWITCH_RADIUS_CODE_SAMPLE,
  SWITCH_DISABLED_CODE_SAMPLE,
} from "./model";

export function SwitchView() {
  useToc(SWITCH_SECTIONS_LIST);

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl min-w-0">
      {/* View Header */}
      <div className="flex flex-col gap-layout-gap">
        <div className="flex flex-col gap-control-gap">
          <Heading size="lg">Switch</Heading>
          <Description>
            A switch toggles the state of a single setting between on and off.
          </Description>
        </div>
        <Description>
          Switches communicate immediate binary preferences, delivering clear tactile affordance and smooth physical transitions across states.
        </Description>
      </div>

      {/* Resource Links */}
      <div className="flex items-center gap-surface-gap">
        <Resource type="github" component="switch" />
        <Resource type="figma" href="https://www.figma.com/@lumunar" />
      </div>

      {/* Default Stage */}
      <section className="flex flex-col gap-surface-gap pb-layout-y">
        <Card
          color="subtle"
          variant="filled"
          className="font-mono text-xs"
        >
          <code>{highlighter('import { Switch } from "@homonoid/react";')}</code>
        </Card>

        <Stage code={SWITCH_DEFAULT_CODE_SAMPLE}>
          <Switch defaultChecked>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Content>
              <Label>Airplane Mode</Label>
              <Description>Disable cellular, Wi Fi, and Bluetooth connections</Description>
            </Switch.Content>
          </Switch>
        </Stage>
      </section>

      {/* States Section */}
      <section id={SWITCH_SECTIONS.states.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SWITCH_SECTIONS.states.label} icon={SWITCH_SECTIONS.states.icon} />

        <Stage code={SWITCH_STATES_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Switch aria-label="Inactive switch" />
            <Switch defaultChecked aria-label="Active switch" />
            <Switch invalid aria-label="Invalid inactive switch" />
            <Switch invalid defaultChecked aria-label="Invalid active switch" />
          </div>
        </Stage>
      </section>

      {/* Sizes Section */}
      <section id={SWITCH_SECTIONS.sizes.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SWITCH_SECTIONS.sizes.label} icon={SWITCH_SECTIONS.sizes.icon} />

        <Stage code={SWITCH_SIZES_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Switch size="sm" defaultChecked aria-label="Small switch" />
            <Switch size="md" defaultChecked aria-label="Medium switch" />
            <Switch size="lg" defaultChecked aria-label="Large switch" />
          </div>
        </Stage>
      </section>

      {/* Label and Helper Section */}
      <section id={SWITCH_SECTIONS.labelAndHelper.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SWITCH_SECTIONS.labelAndHelper.label} icon={SWITCH_SECTIONS.labelAndHelper.icon} />

        <Stage code={SWITCH_LABEL_HELPER_CODE_SAMPLE}>
          <div className="flex flex-col gap-4 max-w-sm">
            <Switch defaultChecked>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label>Automatic updates</Label>
                <Description>Download and install platform patches as soon as they become available.</Description>
              </Switch.Content>
            </Switch>
          </div>
        </Stage>
      </section>

      {/* Radius Section */}
      <section id={SWITCH_SECTIONS.radius.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SWITCH_SECTIONS.radius.label} icon={SWITCH_SECTIONS.radius.icon} />

        <Stage code={SWITCH_RADIUS_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Switch radius="full" defaultChecked aria-label="Pill radius switch" />
            <Switch radius="lg" defaultChecked aria-label="Large radius switch" />
            <Switch radius="md" defaultChecked aria-label="Medium radius switch" />
            <Switch radius="sm" defaultChecked aria-label="Small radius switch" />
            <Switch radius="none" defaultChecked aria-label="Sharp radius switch" />
          </div>
        </Stage>
      </section>

      {/* Disabled Section */}
      <section id={SWITCH_SECTIONS.disabled.id} className="flex flex-col gap-surface-gap pb-layout-y scroll-mt-layout-y">
        <Frame text={SWITCH_SECTIONS.disabled.label} icon={SWITCH_SECTIONS.disabled.icon} />

        <Stage code={SWITCH_DISABLED_CODE_SAMPLE}>
          <div className="flex flex-row flex-wrap items-center gap-surface-gap">
            <Switch disabled aria-label="Disabled inactive switch" />
            <Switch disabled defaultChecked aria-label="Disabled active switch" />
          </div>
        </Stage>
      </section>

      {/* Object Continuity Section */}
      <section id={SWITCH_SECTIONS.continuity.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{SWITCH_SECTIONS.continuity.label}</Heading>

        <Description>
          State transitions maintain absolute geometric stability. Outer boundaries and track dimensions remain locked in place when transitioning across unchecked and checked states.
        </Description>

        <Description>
          The thumb translates fluidly along the track using hardware accelerated GPU transforms rather than abrupt visual jumps or layout reflows.
        </Description>

        <Description>
          Active pointer compression applies subtle scale tension across the entire capsule, providing immediate physical feedback upon interaction.
        </Description>
      </section>

      {/* Accessibility Section */}
      <section id={SWITCH_SECTIONS.accessibility.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{SWITCH_SECTIONS.accessibility.label}</Heading>

        <Description>
          Accessibility for binary toggles guarantees predictable state announcements and effortless interaction across all assistive technologies.
        </Description>

        <Description>
          Switches expose native input role semantics with explicit switch role declarations, ensuring screen readers announce on and off states accurately.
        </Description>

        <Description>
          Prominent focus rings enclose the capsule container upon keyboard navigation. Generous touch targets preserve reliable activation across touch displays and pointer devices.
        </Description>
      </section>

      {/* Design Tokens Section */}
      <section id={SWITCH_SECTIONS.tokens.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2"> {SWITCH_SECTIONS.tokens.label}</Heading>

        <Description>
          Control dimensions map directly to standardized spatial tokens comprising small 28px width, medium 44px width, and large 56px width presentations.
        </Description>

        <Description>
          Corner radii calibrate using standardized curvature tokens from sharp rectangular profiles to fully rounded pill capsules.
        </Description>

        <Description>
          Color values consume primary brand tokens and neutral border tokens exclusively, synchronizing effortlessly across light and dark theme environments.
        </Description>
      </section>

      {/* Style Reference Section */}
      <section id={SWITCH_SECTIONS.styleReference.id} className="flex flex-col gap-control-gap pb-layout-y scroll-mt-layout-y">
        <Heading size="md" as="h2">{SWITCH_SECTIONS.styleReference.label}</Heading>

        <Description>
          Accessible native input elements preserve standard form integration, keyboard spacebar toggles, and screen reader announcements.
        </Description>

        <Description>
          Smooth transitions across background fills and thumb offsets provide clear confirmation without decorative distraction.
        </Description>

        <Description>
          Associated labels and descriptive captions link automatically to input identifiers, guaranteeing comprehensive accessibility tree representations.
        </Description>
      </section>

      {/* Component Pagination Navigation */}
      <Pagination />
    </div>
  );
}
