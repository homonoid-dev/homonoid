"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Description,
  Dropdown,
  type BadgeVariant,
  type Color,
} from "@homonoid/react";
import { Palette, Bell, Mail, ShieldAlert } from "lucide-react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  BADGE_SECTIONS,
  BADGE_SECTIONS_LIST,
  BADGE_DEFAULT_CODE_SAMPLE,
  getBadgeVariantsCodeSample,
  BADGE_SIZES_CODE_SAMPLE,
  BADGE_COLORS_CODE_SAMPLE,
  BADGE_ANCHORS_CODE_SAMPLE,
} from "./model";

export function BadgeView() {
  const sections = BADGE_SECTIONS;
  const [selectedVariant, setSelectedVariant] = useState<BadgeVariant>("contained");
  const [selectedColor, setSelectedColor] = useState<Color>("primary");
  const variantActions: { id: BadgeVariant; label: string }[] = [
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
  const colors = ["primary", "subtle", "surface", "destructive"] as const;

  return (
    <Exhibit
      title="Badge"
      summary="A badge communicates status, live notifications, numeric counters, and descriptive tags across interactive surfaces."
      description="Badges operate both as inline status elements and as floating notification anchors overlaid upon targets such as avatars, icons, and buttons."
      component="badge"
      importCode='import { Badge } from "@homonoid/react";'
      defaultCode={BADGE_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <Badge>
          Operational
        </Badge>
      }
      sections={BADGE_SECTIONS_LIST}
    >
      {/* Structural Variants Section */}
      <Exhibit.Stage
        section={sections.variants}
        code={getBadgeVariantsCodeSample(selectedVariant, selectedColor)}
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
        <Badge variant={selectedVariant} color={selectedColor}>
          Operational
        </Badge>
      </Exhibit.Stage>

      {/* Dimensional Scales Section */}
      <Exhibit.Stage section={sections.sizes} code={BADGE_SIZES_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Badge size="sm" count={3} placement="top-right" color="destructive">
            <Button size="sm" layout="icon" variant="outlined" color="surface" aria-label="Notifications">
              <Bell className="size-3.5" />
            </Button>
          </Badge>

          <Badge size="md" count={5} placement="top-right" color="destructive">
            <Button size="md" layout="icon" variant="outlined" color="surface" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
          </Badge>

          <Badge size="lg" count={8} placement="top-right" color="destructive">
            <Button size="lg" layout="icon" variant="outlined" color="surface" aria-label="Notifications">
              <Bell className="size-5" />
            </Button>
          </Badge>
        </div>
      </Exhibit.Stage>

      {/* Semantic Color Palettes Section */}
      <Exhibit.Stage section={sections.colors} code={BADGE_COLORS_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {colors.map((color) => (
            <Badge key={color} color={color} variant="contained">
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </div>
      </Exhibit.Stage>

      {/* Anchored Overlays Section */}
      <Exhibit.Stage section={sections.anchors} code={BADGE_ANCHORS_CODE_SAMPLE}>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Badge count={5} placement="top-right" color="destructive">
            <Button layout="icon" variant="outlined" color="surface" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
          </Badge>

          <Badge count={120} max={99} placement="top-right" color="primary">
            <Button layout="icon" variant="outlined" color="surface" aria-label="Inbox messages">
              <Mail className="size-4" />
            </Button>
          </Badge>

          <Badge dot placement="top-right" color="destructive">
            <Button layout="icon" variant="outlined" color="surface" aria-label="Security warnings">
              <ShieldAlert className="size-4" />
            </Button>
          </Badge>
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Numerical count transitions update text nodes smoothly without triggering horizontal layout shifting across sibling elements.
        </Description>
        <Description>
          Anchored indicators maintain constant relative offsets across component dimension shifts, preserving stable registration against host borders.
        </Description>
        <Description>
          Palette transitions crossfade surface background fills and hairline borders smoothly using tokens calibrated for smooth continuity.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Dynamic notification counters support accessible status roles to communicate real time numeric updates to screen reader software.
        </Description>
        <Description>
          Status indicators pair distinct color fills with contextual labels or distinct glyph geometries to guarantee legibility for users with color vision differences.
        </Description>
        <Description>
          Auxiliary decorative icons apply aria hidden flags to prevent redundant announcements during keyboard traversal.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Surfaces and hairline borders consume standardized Chroma primary, subtle, surface, and destructive color tokens across light and dark modes.
        </Description>
        <Description>
          Badge typography inherits calibrated leading and font weight scales directly from the Homonoid Label primitive under the hood.
        </Description>
        <Description>
          Geometry tokens provide fluid options across continuous pill radii and standard rounded corner curvature.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Developers can declare inline status tags, numeric counters, and anchored overlays through concise root properties or compose custom internal layouts using dot notation primitives.
        </Description>
        <Description>
          The component exposes Badge.Anchor, Badge.Indicator, Badge.Label, Badge.Leading, and Badge.Trailing for complete architectural composition.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

