import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Ruler,
  Paintbrush,
  Pin,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface BadgeSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const BADGE_SECTIONS: Record<string, BadgeSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Ruler,
  },
  colors: {
    id: "colors",
    label: "Colors",
    icon: Paintbrush,
  },
  anchors: {
    id: "anchored-overlays",
    label: "Anchored Overlays",
    icon: Pin,
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

export const BADGE_SECTIONS_LIST: BadgeSectionItem[] = Object.values(BADGE_SECTIONS);

export const BADGE_DEFAULT_CODE_SAMPLE = `import { Badge } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge color="primary" variant="contained">
        Active
      </Badge>
      <Badge color="subtle" variant="contained">
        Draft
      </Badge>
      <Badge color="surface" variant="contained">
        Archived
      </Badge>
      <Badge color="destructive" variant="contained">
        Alert
      </Badge>
    </div>
  );
}`;

export const BADGE_VARIANTS_CODE_SAMPLE = `import { Badge } from "@homonoid/react";

export function Example() {
  return (
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
  );
}`;

export const BADGE_SIZES_CODE_SAMPLE = `import { Badge, Button } from "@homonoid/react";
import { Bell } from "lucide-react";

export function Example() {
  return (
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
  );
}`;

export const BADGE_COLORS_CODE_SAMPLE = `import { Badge } from "@homonoid/react";

export function Example() {
  const colors = ["primary", "subtle", "surface", "destructive"] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {colors.map((color) => (
        <Badge key={color} color={color} variant="contained">
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Badge>
      ))}
    </div>
  );
}`;

export const BADGE_ANCHORS_CODE_SAMPLE = `import { Badge, Button } from "@homonoid/react";
import { Bell, Mail, ShieldAlert } from "lucide-react";

export function Example() {
  return (
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
  );
}`;

