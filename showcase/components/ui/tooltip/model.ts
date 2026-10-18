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
      <Button shape="circle" layout="icon" variant="contained">
        <Plus className="w-4 h-4" />
      </Button>
    </Tooltip>
  );
}`;

export const TOOLTIP_VARIANTS_CODE_SAMPLE = `import { Tooltip, Button } from "@homonoid/react";
import { Bookmark, Settings, Sparkles } from "lucide-react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip variant="inverted" content="Bookmark item">
        <Button shape="circle" layout="icon" variant="contained">
          <Bookmark className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip variant="surface" content="Settings panel">
        <Button shape="circle" layout="icon" variant="outlined">
          <Settings className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip variant="primary" content="AI Assistant">
        <Button shape="circle" layout="icon" color="primary" variant="contained">
          <Sparkles className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  );
}`;

export const TOOLTIP_PLACEMENTS_CODE_SAMPLE = `import { Tooltip, Button } from "@homonoid/react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip side="top" content="North positioning">
        <Button shape="circle" layout="icon" variant="outlined">
          <ArrowUp className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip side="bottom" content="South positioning">
        <Button shape="circle" layout="icon" variant="outlined">
          <ArrowDown className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip side="left" content="West positioning">
        <Button shape="circle" layout="icon" variant="outlined">
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </Tooltip>

      <Tooltip side="right" content="East positioning">
        <Button shape="circle" layout="icon" variant="outlined">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  );
}`;

export const TOOLTIP_SHORTCUTS_CODE_SAMPLE = `import { Tooltip, Button } from "@homonoid/react";
import { Copy } from "lucide-react";

export function Example() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button shape="circle" layout="icon" variant="contained">
          <Copy className="w-4 h-4" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Copy to clipboard
        <Tooltip.Shortcut>⌘C</Tooltip.Shortcut>
      </Tooltip.Content>
    </Tooltip>
  );
}`;
