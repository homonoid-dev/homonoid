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

export const TOOLTIP_DEFAULT_CODE_SAMPLE = `import { Tooltip, Button } from "@homonoid/react";
import { Plus } from "lucide-react";

export function Example() {
  return (
    <Tooltip content="Add new element">
      <Button layout="icon" variant="contained">
        <Plus className="w-4 h-4" />
      </Button>
    </Tooltip>
  );
}`;

export const TOOLTIP_VARIANTS_CODE_SAMPLE = `import { Tooltip, Button } from "@homonoid/react";
import { Bookmark, Settings, Zap } from "lucide-react";

const VARIANTS = [
  {
    variant: "inverted" as const,
    content: "Bookmark item",
    icon: Bookmark,
    buttonVariant: "contained" as const,
  },
  {
    variant: "surface" as const,
    content: "Settings panel",
    icon: Settings,
    buttonVariant: "outlined" as const,
  },
  {
    variant: "primary" as const,
    content: "Quick actions",
    icon: Zap,
    buttonVariant: "contained" as const,
    buttonColor: "primary" as const,
  },
];

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      {VARIANTS.map((item) => (
        <Tooltip key={item.variant} variant={item.variant} content={item.content}>
          <Button layout="icon" variant={item.buttonVariant} color={item.buttonColor}>
            <item.icon className="w-4 h-4" />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}`;

export const TOOLTIP_PLACEMENTS_CODE_SAMPLE = `import { Tooltip, Button } from "@homonoid/react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

const PLACEMENTS = [
  { side: "top" as const, label: "Top", icon: ArrowUp },
  { side: "bottom" as const, label: "Bottom", icon: ArrowDown },
  { side: "left" as const, label: "Left", icon: ArrowLeft },
  { side: "right" as const, label: "Right", icon: ArrowRight },
];

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      {PLACEMENTS.map((item) => (
        <Tooltip key={item.side} side={item.side} content={\`\${item.label} positioning\`}>
          <Button layout="icon" variant="outlined">
            <item.icon className="w-4 h-4" />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}`;

export const TOOLTIP_SHORTCUTS_CODE_SAMPLE = `import { Tooltip, Button } from "@homonoid/react";
import { Copy } from "lucide-react";

export function Example() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button layout="icon" variant="contained">
          <Copy className="w-4 h-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Copy to clipboard
        <Tooltip.Shortcut keyValue="command" content="C" />
      </Tooltip.Content>
    </Tooltip>
  );
}`;
