"use client";

import { Toggle, Description } from "@homonoid/react";
import {
  Bold,
  Italic,
  Underline,
  Bookmark,
  Pin,
  Bell,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  TOGGLE_SECTIONS,
  TOGGLE_SECTIONS_LIST,
  TOGGLE_DEFAULT_CODE_SAMPLE,
  TOGGLE_VARIANTS_CODE_SAMPLE,
  TOGGLE_SIZES_CODE_SAMPLE,
  TOGGLE_COLORS_CODE_SAMPLE,
  TOGGLE_GROUPS_CODE_SAMPLE,
  TOGGLE_MULTIPLE_CODE_SAMPLE,
} from "./model";

export function ToggleView() {
  const sections = TOGGLE_SECTIONS;
  const variants = ["contained", "outlined", "plain"] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const colors = ["primary", "subtle", "surface", "destructive"] as const;

  return (
    <Exhibit
      title="Toggle"
      summary="A toggle communicates a two state choice and enables users to activate or deactivate preferences with a single press."
      description="Toggles operate both as independent binary buttons and as coordinated groups supporting single selection or multiple selection behaviors."
      component="toggle"
      importCode='import { Toggle } from "@homonoid/react";'
      defaultCode={TOGGLE_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Toggle aria-label="Toggle bold" defaultPressed layout="icon">
            <Bold className="size-4" />
          </Toggle>
          <Toggle aria-label="Toggle italic" layout="icon">
            <Italic className="size-4" />
          </Toggle>
          <Toggle aria-label="Toggle underline" layout="icon">
            <Underline className="size-4" />
          </Toggle>
        </div>
      }
      sections={TOGGLE_SECTIONS_LIST}
    >
      {/* Structural Variants Section */}
      <Exhibit.Stage section={sections.variants} code={TOGGLE_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-col items-center gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-wrap items-center justify-center gap-3">
              <Toggle
                variant={variant}
                color="primary"
                defaultPressed
                layout="icon"
                aria-label={`${variant} active bookmark`}
              >
                <Bookmark className="size-4" />
              </Toggle>
              <Toggle
                variant={variant}
                color="primary"
                layout="icon"
                aria-label={`${variant} inactive pin`}
              >
                <Pin className="size-4" />
              </Toggle>
              <Toggle
                variant={variant}
                color="primary"
                layout="icon"
                aria-label={`${variant} inactive bell`}
              >
                <Bell className="size-4" />
              </Toggle>
            </div>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Dimensional Scales Section */}
      <Exhibit.Stage section={sections.sizes} code={TOGGLE_SIZES_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {sizes.map((size) => (
            <Toggle
              key={size}
              size={size}
              variant="outlined"
              color="surface"
              defaultPressed
              layout="icon"
              aria-label={`Toggle size ${size}`}
            >
              <Bookmark className="size-4" />
            </Toggle>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Semantic Color Palettes Section */}
      <Exhibit.Stage section={sections.colors} code={TOGGLE_COLORS_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {colors.map((color) => (
            <Toggle
              key={color}
              color={color}
              variant="contained"
              defaultPressed
              layout="icon"
              aria-label={`Toggle color ${color}`}
            >
              <Pin className="size-4" />
            </Toggle>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Toggle Groups Section */}
      <Exhibit.Stage section={sections.groups} code={TOGGLE_GROUPS_CODE_SAMPLE}>
        <Toggle.Group type="single" defaultValue="left" variant="plain" color="surface">
          <Toggle.Item value="left" layout="icon" aria-label="Align left">
            <AlignLeft className="size-4" />
          </Toggle.Item>
          <Toggle.Item value="center" layout="icon" aria-label="Align center">
            <AlignCenter className="size-4" />
          </Toggle.Item>
          <Toggle.Item value="right" layout="icon" aria-label="Align right">
            <AlignRight className="size-4" />
          </Toggle.Item>
        </Toggle.Group>
      </Exhibit.Stage>

      {/* Multiple Selection Section */}
      <Exhibit.Stage section={sections.multiple} code={TOGGLE_MULTIPLE_CODE_SAMPLE}>
        <Toggle.Group
          type="multiple"
          defaultValue={["bold"]}
          variant="outlined"
          color="surface"
        >
          <Toggle.Item value="bold" layout="icon" aria-label="Format bold">
            <Bold className="size-4" />
          </Toggle.Item>
          <Toggle.Item value="italic" layout="icon" aria-label="Format italic">
            <Italic className="size-4" />
          </Toggle.Item>
          <Toggle.Item value="underline" layout="icon" aria-label="Format underline">
            <Underline className="size-4" />
          </Toggle.Item>
        </Toggle.Group>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          State transitions utilize token calibrated duration values to guarantee fluid visual response without shifting external layout boundaries.
        </Description>
        <Description>
          Physical press feedback delivers tactile scale response through standard motion easing variables while preserving constant element registration.
        </Description>
        <Description>
          Grouped button boundaries maintain dimensional stability during active state changes by preserving fixed stroke geometry and docking offsets.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Independent toggles communicate activation status through native aria pressed attributes reflecting true or false values.
        </Description>
        <Description>
          Single select groups expose radiogroup semantics with nested radio roles and roving keyboard traversal across items.
        </Description>
        <Description>
          Icon only toggles require explicit aria label strings to guarantee screen reader comprehension across all interactive surfaces.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Dimensional scales inherit control height tokens calibrated across small thirty two pixel, medium forty pixel, and large forty eight pixel proportions.
        </Description>
        <Description>
          Surfaces and hairline borders consume standardized Chroma primary, subtle, surface, and destructive color tokens across light and dark modes.
        </Description>
        <Description>
          Corner rounding maps directly to geometric radius tokens with continuous full pill curvature active by default.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Developers can declare atomic toggles directly with defaultPressed properties or compose toolbars using Toggle.Group and Toggle.Item subcomponents.
        </Description>
        <Description>
          The toggle primitive hosts Button under the hood to ensure comprehensive token alignment and tactile interaction across the ecosystem.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

