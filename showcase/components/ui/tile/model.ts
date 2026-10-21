import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Paintbrush,
  SlidersHorizontal,
  Square,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface TileSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const TILE_SECTIONS: Record<string, TileSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  colors: {
    id: "colors",
    label: "Colors",
    icon: Paintbrush,
  },
  accessories: {
    id: "accessories",
    label: "Accessories",
    icon: SlidersHorizontal,
  },
  composition: {
    id: "composition",
    label: "Composition",
    icon: Square,
  },
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Infinity,
  },
  accessibility: {
    id: "accessibility",
    label: "Accessibility",
    icon: Accessibility,
  },
  tokens: {
    id: "design-tokens",
    label: "Design Tokens",
    icon: Palette,
  },
  styleReference: {
    id: "style-reference",
    label: "Style Reference",
    icon: BookOpen,
  },
};

export const TILE_SECTIONS_LIST: TileSectionItem[] =
  Object.values(TILE_SECTIONS);

export const TILE_DEFAULT_CODE_SAMPLE = `import { Tile } from "@homonoid/react";
import { User, ChevronRight } from "lucide-react";

export function Example() {
  return (
    <div className="w-full max-w-md">
      <Tile
        leading={<User className="size-5" />}
        label="Personal Account"
        description="Security credentials and profile settings"
        trailing={<ChevronRight className="size-4 text-muted" />}
        onClick={() => {}}
      />
    </div>
  );
}`;

export const TILE_VARIANTS_CODE_SAMPLE = `import { Tile } from "@homonoid/react";
import { Bell, Shield, Bookmark } from "lucide-react";

export function Example() {
  const items = [
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

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {items.map((item) => (
        <Tile
          key={item.variant}
          variant={item.variant}
          leading={item.icon}
          label={item.label}
          description={item.description}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}`;

export const TILE_COLORS_CODE_SAMPLE = `import { Tile } from "@homonoid/react";
import { User, Zap, Star, AlertTriangle } from "lucide-react";

export function Example() {
  const items = [
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
    <div className="flex flex-col gap-2 w-full max-w-md">
      {items.map((item) => (
        <Tile
          key={item.color}
          variant="contained"
          color={item.color}
          leading={item.icon}
          label={item.label}
          description={item.description}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}`;


export const TILE_ACCESSORIES_CODE_SAMPLE = `import { Tile, Switch, Checkbox } from "@homonoid/react";
import { Wifi, Volume2, ChevronRight } from "lucide-react";

export function Example() {
  return (
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
        onClick={() => {}}
      />
    </div>
  );
}`;

export const TILE_COMPOSITION_CODE_SAMPLE = `import { Tile, Label, Description } from "@homonoid/react";
import { Smartphone, ChevronRight } from "lucide-react";

export function Example() {
  return (
    <div className="w-full max-w-md">
      <Tile variant="contained" onClick={() => {}}>
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
  );
}`;
