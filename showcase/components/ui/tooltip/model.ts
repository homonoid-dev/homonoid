import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Compass,
  Command,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface TooltipSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const TOOLTIP_SECTIONS: Record<string, TooltipSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  placements: {
    id: "placements",
    label: "Placements",
    icon: Compass,
  },
  shortcuts: {
    id: "shortcuts",
    label: "Shortcuts",
    icon: Command,
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

export const TOOLTIP_SECTIONS_LIST: TooltipSectionItem[] =
  Object.values(TOOLTIP_SECTIONS);

export const TOOLTIP_DEFAULT_CODE_SAMPLE = `import { Tooltip, Button } from "@harmonia/react";

export function Example() {
  return (
    <Tooltip content="Quick action tooltip">
      <Button variant="contained">Hover me</Button>
    </Tooltip>
  );
}`;

export const TOOLTIP_VARIANTS_CODE_SAMPLE = `import { Tooltip, Button } from "@harmonia/react";

export function VariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip variant="inverted" content="Inverted contrast surface">
        <Button variant="outlined">Inverted</Button>
      </Tooltip>

      <Tooltip variant="surface" content="Neutral card surface">
        <Button variant="outlined">Surface</Button>
      </Tooltip>

      <Tooltip variant="primary" content="Brand accent surface">
        <Button variant="outlined">Primary</Button>
      </Tooltip>
    </div>
  );
}`;

export const TOOLTIP_PLACEMENTS_CODE_SAMPLE = `import { Tooltip, Button } from "@harmonia/react";

export function PlacementsExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip side="top" content="Top tooltip">
        <Button variant="outlined">Top</Button>
      </Tooltip>

      <Tooltip side="bottom" content="Bottom tooltip">
        <Button variant="outlined">Bottom</Button>
      </Tooltip>

      <Tooltip side="left" content="Left tooltip">
        <Button variant="outlined">Left</Button>
      </Tooltip>

      <Tooltip side="right" content="Right tooltip">
        <Button variant="outlined">Right</Button>
      </Tooltip>
    </div>
  );
}`;

export const TOOLTIP_SHORTCUTS_CODE_SAMPLE = `import { Tooltip, Button } from "@harmonia/react";

export function ShortcutsExample() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button variant="contained">Save Changes</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Save changes to disk
        <Tooltip.Shortcut>⌘S</Tooltip.Shortcut>
      </Tooltip.Content>
    </Tooltip>
  );
}`;
