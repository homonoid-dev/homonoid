"use client";

import { Switch, Label, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  SWITCH_SECTIONS,
  SWITCH_SECTIONS_LIST,
  SWITCH_DEFAULT_CODE_SAMPLE,
  SWITCH_STATES_CODE_SAMPLE,
  SWITCH_SIZES_CODE_SAMPLE,
  SWITCH_LABEL_HELPER_CODE_SAMPLE,
  SWITCH_RADIUS_CODE_SAMPLE,
  SWITCH_DISABLED_CODE_SAMPLE,
  SWITCH_TILE_CODE_SAMPLE,
} from "./model";

export function SwitchView() {
  const sections = SWITCH_SECTIONS;

  return (
    <Exhibit
      title="Switch"
      summary="A switch toggles the state of a single setting between on and off."
      description="Switches communicate immediate binary preferences, delivering clear tactile affordance and smooth physical transitions across states."
      component="switch"
      importCode='import { Switch } from "@homonoid/react";'
      defaultCode={SWITCH_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <Switch defaultChecked>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Content>
            <Label>Airplane Mode</Label>
            <Description>Disable connections</Description>
          </Switch.Content>
        </Switch>
      }
      sections={SWITCH_SECTIONS_LIST}
    >
      {/* States Section */}
      <Exhibit.Stage section={sections.states} code={SWITCH_STATES_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap items-center gap-surface-gap">
          <Switch aria-label="Inactive switch" />
          <Switch defaultChecked aria-label="Active switch" />
          <Switch invalid aria-label="Invalid inactive switch" />
          <Switch invalid defaultChecked aria-label="Invalid active switch" />
        </div>
      </Exhibit.Stage>

      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={SWITCH_SIZES_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap items-center gap-surface-gap">
          <Switch size="sm" defaultChecked aria-label="Small switch" />
          <Switch size="md" defaultChecked aria-label="Medium switch" />
          <Switch size="lg" defaultChecked aria-label="Large switch" />
        </div>
      </Exhibit.Stage>

      {/* Label and Helper Section */}
      <Exhibit.Stage section={sections.labelAndHelper} code={SWITCH_LABEL_HELPER_CODE_SAMPLE}>
        <div className="flex flex-col gap-4 max-w-sm">
          <Switch defaultChecked>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Content>
              <Label>Automatic updates</Label>
              <Description>
                Download and install platform patches as soon as they become available.
              </Description>
            </Switch.Content>
          </Switch>
        </div>
      </Exhibit.Stage>

      {/* Radius Section */}
      <Exhibit.Stage section={sections.radius} code={SWITCH_RADIUS_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap items-center gap-surface-gap">
          <Switch radius="full" defaultChecked aria-label="Pill radius switch" />
          <Switch radius="lg" defaultChecked aria-label="Large radius switch" />
          <Switch radius="md" defaultChecked aria-label="Medium radius switch" />
          <Switch radius="sm" defaultChecked aria-label="Small radius switch" />
          <Switch radius="none" defaultChecked aria-label="Sharp radius switch" />
        </div>
      </Exhibit.Stage>

      {/* Disabled Section */}
      <Exhibit.Stage section={sections.disabled} code={SWITCH_DISABLED_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap items-center gap-surface-gap">
          <Switch disabled aria-label="Disabled inactive switch" />
          <Switch disabled defaultChecked aria-label="Disabled active switch" />
        </div>
      </Exhibit.Stage>

      {/* Tile Section */}
      <Exhibit.Stage section={sections.tile} code={SWITCH_TILE_CODE_SAMPLE}>
        <div className="flex flex-col gap-control-gap w-full max-w-sm">
          <Switch.Tile
            variant="contained"
            label="Airplane Mode"
            description="Disable all wireless connections"
            defaultChecked
          />
          <Switch.Tile
            variant="outlined"
            label="Do Not Disturb"
            description="Silence calls and notifications"
          />
          <Switch.Tile
            placement="leading"
            label="Leading Toggle"
            description="Switch control aligned to the leading slot"
          />
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          State transitions maintain absolute geometric stability. Outer boundaries and track dimensions remain locked in place when transitioning across unchecked and checked states.
        </Description>

        <Description>
          The thumb translates fluidly along the track using hardware accelerated GPU transforms rather than abrupt visual jumps or layout reflows.
        </Description>

        <Description>
          Active pointer compression applies subtle scale tension across the entire capsule, providing immediate physical feedback upon interaction.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility for binary toggles guarantees predictable state announcements and effortless interaction across all assistive technologies.
        </Description>

        <Description>
          Switches expose native input role semantics with explicit switch role declarations, ensuring screen readers announce on and off states accurately.
        </Description>

        <Description>
          Prominent focus rings enclose the capsule container upon keyboard navigation. Generous touch targets preserve reliable activation across touch displays and pointer devices.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Control dimensions map directly to standardized spatial tokens comprising small 28px width, medium 44px width, and large 56px width presentations.
        </Description>

        <Description>
          Corner radii calibrate using standardized curvature tokens from sharp rectangular profiles to fully rounded pill capsules.
        </Description>

        <Description>
          Color values consume primary brand tokens and neutral border tokens exclusively, synchronizing effortlessly across light and dark theme environments.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Accessible native input elements preserve standard form integration, keyboard spacebar toggles, and screen reader announcements.
        </Description>

        <Description>
          Smooth transitions across background fills and thumb offsets provide clear confirmation without decorative distraction.
        </Description>

        <Description>
          Associated labels and descriptive captions link automatically to input identifiers, guaranteeing comprehensive accessibility tree representations.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
