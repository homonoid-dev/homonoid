"use client";

import { Tile, Description, Switch, Checkbox } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  User,
  ChevronRight,
  Bell,
  Shield,
  Bookmark,
  Zap,
  Star,
  AlertTriangle,
  Wifi,
  Volume2,
  Smartphone,
} from "lucide-react";
import {
  TILE_SECTIONS,
  TILE_SECTIONS_LIST,
  TILE_DEFAULT_CODE_SAMPLE,
  TILE_VARIANTS_CODE_SAMPLE,
  TILE_COLORS_CODE_SAMPLE,
  TILE_ACCESSORIES_CODE_SAMPLE,
  TILE_COMPOSITION_CODE_SAMPLE,
} from "./model";

export function TileView() {
  const sections = TILE_SECTIONS;

  const variantItems = [
    {
      variant: "plain" as const,
      icon: <Bell className="size-5" />,
      label: "Plain Tile",
      description: "Transparent surface with tactile press response",
    },
    {
      variant: "contained" as const,
      icon: <Shield className="size-5" />,
      label: "Contained Tile",
      description: "Solid surface fill providing grounded visual separation",
    },
    {
      variant: "outlined" as const,
      icon: <Bookmark className="size-5" />,
      label: "Outlined Tile",
      description: "Framed surface bounded by a hairline border stroke",
    },
  ];

  const colorItems = [
    {
      color: "surface" as const,
      icon: <User className="size-5" />,
      label: "Surface Color",
      description: "Neutral container palette for standard lists",
    },
    {
      color: "subtle" as const,
      icon: <Zap className="size-5" />,
      label: "Subtle Color",
      description: "Low contrast secondary tint for quiet actions",
    },
    {
      color: "primary" as const,
      icon: <Star className="size-5" />,
      label: "Primary Color",
      description: "Brand highlight palette for emphasized selections",
    },
    {
      color: "destructive" as const,
      icon: <AlertTriangle className="size-5" />,
      label: "Destructive Color",
      description: "Alert palette for danger options or critical notices",
    },
  ];

  return (
    <Exhibit
      title="Tile"
      summary="A tile provides a structured horizontal row container pairing descriptive copy with visual anchors and interactive accessories."
      description="Homonoid tiles translate the Flutter ListTile model into modern web interfaces with fluid press compression, standardized spatial density, and zero wrapper bloat."
      component="tile"
      importCode='import { Tile } from "@homonoid/react";'
      defaultCode={TILE_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <div className="w-full max-w-md">
          <Tile
            leading={<User className="size-5" />}
            label="Personal Account"
            description="Security credentials and profile settings"
            trailing={<ChevronRight className="size-4 text-muted" />}
            onClick={() => { }}
          />
        </div>
      }
      sections={TILE_SECTIONS_LIST}
    >
      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={TILE_VARIANTS_CODE_SAMPLE}>
        <div className="flex flex-col gap-2 w-full max-w-md">
          {variantItems.map((item) => (
            <Tile
              key={item.variant}
              variant={item.variant}
              leading={item.icon}
              label={item.label}
              description={item.description}
              onClick={() => { }}
            />
          ))}
        </div>
      </Exhibit.Stage>

      {/* Colors Section */}
      <Exhibit.Stage section={sections.colors} code={TILE_COLORS_CODE_SAMPLE}>
        <div className="flex flex-col gap-2 w-full max-w-md">
          {colorItems.map((item) => (
            <Tile
              key={item.color}
              variant="contained"
              color={item.color}
              leading={item.icon}
              label={item.label}
              description={item.description}
              onClick={() => { }}
            />
          ))}
        </div>
      </Exhibit.Stage>

      {/* Accessories Section */}
      <Exhibit.Stage section={sections.accessories} code={TILE_ACCESSORIES_CODE_SAMPLE}>
        <div className="flex flex-col gap-2 w-full max-w-md">
          <Tile
            variant="contained"
            leading={<Wifi className="size-5" />}
            label="Wireless Network"
            description="Connected to Studio Mesh"
            trailing={
              <Switch
                defaultChecked
                aria-label="Wireless Network toggle"
                onClick={(e) => e.stopPropagation()}
              />
            }
          />
          <Tile
            variant="contained"
            leading={<Volume2 className="size-5" />}
            label="Spatial Audio"
            description="Calibrated sound output across devices"
            trailing={
              <Checkbox
                defaultChecked
                aria-label="Spatial Audio toggle"
                onClick={(e) => e.stopPropagation()}
              />
            }
          />
          <Tile
            variant="contained"
            leading={<div className="size-2 rounded-full bg-primary" />}
            label="Cloud Backup"
            description="Synced 5 minutes ago"
            trailing={<ChevronRight className="size-4 text-muted" />}
            onClick={() => { }}
          />
        </div>
      </Exhibit.Stage>

      {/* Composition Section */}
      <Exhibit.Stage section={sections.composition} code={TILE_COMPOSITION_CODE_SAMPLE}>
        <div className="w-full max-w-md">
          <Tile variant="contained" onClick={() => { }}>
            <Tile.Leading>
              <Smartphone className="size-5" />
            </Tile.Leading>
            <Tile.Content>
              <Tile.Label as="span">Paired Handset</Tile.Label>
              <Tile.Description as="span">Active session in London</Tile.Description>
            </Tile.Content>
            <Tile.Trailing>
              <span className="text-xs text-subtle-foreground">Active</span>
              <ChevronRight className="size-4 text-muted" />
            </Tile.Trailing>
          </Tile>
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Tiles maintain tactile continuity during pointer down and touch press gestures by compressing smoothly down to scale 0.97 using the motion press scale token.
        </Description>

        <Description>
          Slot proportions remain stable throughout hover, press, and focus transitions without layout shift or text wrapping jumps.
        </Description>

        <Description>
          Surface colors and border strokes transition smoothly across 250 milliseconds with cubic bezier easing, matching the button physics standard.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Interactive tiles render as semantic buttons by default and support native keyboard navigation through Tab key traversal.
        </Description>

        <Description>
          Pressing Enter or Space triggers the tile action, while keyboard focus is visually outlined with an inset focus ring.
        </Description>

        <Description>
          When hosting nested interactive controls such as switches or checkboxes, event propagation is isolated so gestures do not trigger conflicting handlers.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Tile heights and padding values align with the Homonoid spatial control scale across small, medium, and large density presets.
        </Description>

        <Description>
          Corner geometry consumes standardized radius tokens from none to full pill curvature.
        </Description>

        <Description>
          Visual states consume semantic surface, subtle, and brand color tokens calibrated across light and dark presentations.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Developers can use convenient slot shorthand properties for rapid assembly or compose compound elements via Tile.Leading, Tile.Content, Tile.Label, Tile.Description, and Tile.Trailing for bespoke layouts.
        </Description>

        <Description>
          Polymorphic rendering is supported through the as property, enabling semantic anchor tags for routing links.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}
