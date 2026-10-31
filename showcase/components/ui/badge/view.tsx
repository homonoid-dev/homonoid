"use client";

import { Badge, Button, Description } from "@homonoid/react";
import { Check, Bell, Mail, ShieldAlert } from "lucide-react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  BADGE_SECTIONS,
  BADGE_SECTIONS_LIST,
  BADGE_DEFAULT_CODE_SAMPLE,
  BADGE_VARIANTS_CODE_SAMPLE,
  BADGE_SIZES_CODE_SAMPLE,
  BADGE_COLORS_CODE_SAMPLE,
  BADGE_ANCHORS_CODE_SAMPLE,
} from "./model";

export function BadgeView() {
  const sections = BADGE_SECTIONS;
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
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge color="primary" variant="contained">
            Operational
          </Badge>
          <Badge leading={<Check className="size-3" />} color="surface" variant="contained">
            Verified
          </Badge>
          <Badge count={24} color="destructive" variant="contained" />
          <Badge color="subtle" variant="outlined">
            v2.4.0
          </Badge>
        </div>
      }
      sections={BADGE_SECTIONS_LIST}
    >
      {/* Structural Variants Section */}
      <Exhibit.Stage section={sections.variants} code={BADGE_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="contained" color="primary">Contained</Badge>
            <Badge variant="outlined" color="primary">Outlined</Badge>
            <Badge variant="plain" color="primary">Plain</Badge>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="contained" color="surface">Contained</Badge>
            <Badge variant="outlined" color="surface">Outlined</Badge>
            <Badge variant="plain" color="surface">Plain</Badge>
          </div>
        </div>
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

