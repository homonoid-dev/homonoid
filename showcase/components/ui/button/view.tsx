"use client";

import { useState } from "react";
import {
  Button,
  Description,
  Dropdown,
  type ButtonVariant,
  type Color,
} from "@homonoid/react";
import { Palette } from "lucide-react";
import { Exhibit } from "@/components/ui/exhibit";
import { InteractiveStates } from "@/components/ui/interactive-states";
import {
  BUTTON_SECTIONS,
  BUTTON_SECTIONS_LIST,
  BUTTON_INTERACTIVE_STATES,
  BUTTON_CONTAINED_CODE_SAMPLE,
  getButtonVariantsCodeSample,
  BUTTON_SIZES_CODE_SAMPLE,
  BUTTON_WITH_ICON_CODE_SAMPLE,
  BUTTON_ICON_ONLY_CODE_SAMPLE,
  BUTTON_LOADING_CODE_SAMPLE,
  BUTTON_DISABLED_CODE_SAMPLE,
  BUTTON_FULL_WIDTH_CODE_SAMPLE,
} from "./model";

export function ButtonView() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ButtonVariant>("contained");
  const [selectedColor, setSelectedColor] = useState<Color>("primary");
  const variantActions: { id: ButtonVariant; label: string }[] = [
    { id: "contained", label: "Contained" },
    { id: "outlined", label: "Outlined" },
    { id: "plain", label: "Plain" },
  ];
  const colorActions: { id: Color; label: string }[] = [
    { id: "primary", label: "Primary" },
    { id: "subtle", label: "Subtle" },
    { id: "surface", label: "Surface" },
    { id: "destructive", label: "Destructive" },
  ];
  const activeAction =
    variantActions.find((a) => a.id === selectedVariant) ?? variantActions[0];
  const sections = BUTTON_SECTIONS;

  return (
    <Exhibit
      title="Button"
      summary="A button communicates an action and allows users to trigger that action with a single interaction."
      description="Homonoid structures button hierarchy through three deliberate tiers contained for primary focus, outlined for secondary choices, and plain for utilities while maintaining strict object continuity by preserving fixed dimensions and fluid micro transitions across hover, press, and loading states."
      component="button"
      importCode='import { Button } from "@homonoid/react";'
      defaultCode={BUTTON_CONTAINED_CODE_SAMPLE}
      defaultStage={
        <Button variant="contained">
          Click me
        </Button>
      }
      sections={BUTTON_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage
        section={sections.variants}
        code={getButtonVariantsCodeSample(selectedVariant, selectedColor)}
        actions={
          <div className="flex items-center gap-1">
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger asChild>
                <Button
                  color="subtle"
                  aria-label={`Select variant, current: ${activeAction.label}`}
                >
                  {activeAction.label}
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.List>
                  {variantActions.map((action) => (
                    <Dropdown.Item
                      key={action.id}
                      selected={selectedVariant === action.id}
                      onClick={() => setSelectedVariant(action.id)}
                    >
                      {action.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.List>
              </Dropdown.Content>
            </Dropdown>

            <Dropdown placement="bottom-end">
              <Dropdown.Trigger asChild>
                <Button
                  layout="icon"
                  variant="plain"
                  color="subtle"
                  aria-label={`Select color, current: ${selectedColor}`}
                >
                  <Palette className="size-4" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.List>
                  {colorActions.map((action) => (
                    <Dropdown.Item
                      key={action.id}
                      selected={selectedColor === action.id}
                      onClick={() => setSelectedColor(action.id)}
                    >
                      {action.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.List>
              </Dropdown.Content>
            </Dropdown>
          </div>
        }
      >
        <Button variant={selectedVariant} color={selectedColor}>
          Click me
        </Button>
      </Exhibit.Stage>

      {/* Sizes Section */}
      <Exhibit.Stage section={sections.sizes} code={BUTTON_SIZES_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap justify-center items-center gap-surface-gap">
          <Button variant="contained" size="sm">
            Small
          </Button>
          <Button variant="contained" size="md">
            Medium
          </Button>
          <Button variant="contained" size="lg">
            Large
          </Button>
        </div>
      </Exhibit.Stage>

      {/* With Icon Section */}
      <Exhibit.Stage section={sections.withIcon} code={BUTTON_WITH_ICON_CODE_SAMPLE}>
        <Button
          variant="contained"
          leading={<sections.withIcon.icon className="size-4" />}
        >
          Click me
        </Button>
      </Exhibit.Stage>

      {/* Icon Only Section */}
      <Exhibit.Stage section={sections.iconOnly} code={BUTTON_ICON_ONLY_CODE_SAMPLE}>
        <Button
          layout="icon"
          variant="contained"
          aria-label="Add item"
        >
          <sections.iconOnly.icon className="size-4" />
        </Button>
      </Exhibit.Stage>

      {/* Loading Section */}
      <Exhibit.Stage
        section={sections.loading}
        code={BUTTON_LOADING_CODE_SAMPLE}
        onReset={() => setIsLoading(false)}
      >
        <Button
          variant="contained"
          loading={isLoading}
          onClick={() => setIsLoading(true)}
        >
          Click me
        </Button>
      </Exhibit.Stage>

      {/* Disabled Section */}
      <Exhibit.Stage section={sections.disabled} code={BUTTON_DISABLED_CODE_SAMPLE}>
        <div className="flex flex-row flex-wrap justify-center items-center gap-surface-gap">
          <Button variant="contained" disabled>
            Contained
          </Button>
          <Button variant="outlined" disabled>
            Outlined
          </Button>
          <Button variant="plain" disabled>
            Plain
          </Button>
        </div>
      </Exhibit.Stage>

      {/* Full Width Section */}
      <Exhibit.Stage section={sections.fullWidth} code={BUTTON_FULL_WIDTH_CODE_SAMPLE}>
        <Button variant="contained" layout="full">
          Full Width
        </Button>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Homonoid treats interactive controls as persistent physical landmarks. State transitions must preserve component identity and geometric stability rather than tearing down and reconstructing elements abruptly.
        </Description>

        <Description>
          Button containers enforce stable geometric bounds across interactive states. Transitioning into the loading state cross fades the action label into the indicator without width collapse or layout reflows.
        </Description>

        <Description>
          Pointer compression engages calibrated spring resistance followed by fluid restorative rebound. Easing curves prioritize immediate feedback upon press while smoothing releases naturally.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Accessibility stands at the core of Homonoid design philosophy. Interactive components must empower every individual with immediate comprehension, predictable keyboard navigation, and seamless assistive technology integration.
        </Description>

        <Description>
          Buttons render semantic native button elements by default, preserving natural tab indexing, spacebar activation, and enter key dispatching without requiring synthetic keyboard handlers.
        </Description>

        <Description>
          Prominent focus rings provide clear WCAG compliant visibility during keyboard navigation. Icon only buttons enforce descriptive aria labels, while pending states announce loading progress transparently to screen readers.
        </Description>
      </Exhibit.Section>

      {/* Interactive States Section */}
      <InteractiveStates
        id={sections.interactiveStates.id}
        title={sections.interactiveStates.label}
        description="The button supports both CSS pseudo classes and data attributes for flexibility:"
        items={BUTTON_INTERACTIVE_STATES}
      />

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Button dimensions map directly to the standardized control height tokens comprising 32px for small, 40px for medium, and 48px for large scale presentations.
        </Description>

        <Description>
          Internal horizontal and vertical padding tokens scale proportionally with control height to maintain centered optical balance across text and slot icons.
        </Description>

        <Description>
          Boundary styling utilizes control radius tokens alongside dedicated fast duration motion variables and calibrated spring physics for tactile interaction.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Contained buttons apply high contrast solid surface fills that subtly illuminate on hover and compress smoothly during pointer activation.
        </Description>

        <Description>
          Outlined buttons present a subtle hairline border stroke over a transparent background, transitioning to reinforced contrast when hovered or focused.
        </Description>

        <Description>
          Plain buttons remove resting borders and backgrounds, introducing subtle surface tints only when interacting through hover, focus, or press events.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
