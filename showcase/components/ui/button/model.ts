import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Circle,
  ArrowRight,
  Plus,
  Loader2,
  Ruler,
  Ban,
  StretchHorizontal,
  Infinity,
  Accessibility,
  MousePointerClick,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";
import type { InteractiveStateItem } from "@/components/ui/interactive-states";

export interface ButtonSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const BUTTON_SECTIONS: Record<string, ButtonSectionItem> = {
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
  outlined: {
    id: "outlined",
    label: "Outlined",
    icon: Circle,
  },
  withIcon: {
    id: "with-icon",
    label: "With Icon",
    icon: ArrowRight,
  },
  iconOnly: {
    id: "icon-only",
    label: "Icon Only",
    icon: Plus,
  },
  loading: {
    id: "loading",
    label: "Loading",
    icon: Loader2,
  },
  disabled: {
    id: "disabled",
    label: "Disabled",
    icon: Ban,
  },
  fullWidth: {
    id: "full-width",
    label: "Full Width",
    icon: StretchHorizontal,
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
  interactiveStates: {
    id: "interactive-states",
    label: "Interactive States",
    icon: MousePointerClick,
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

export const BUTTON_SECTIONS_LIST: ButtonSectionItem[] =
  Object.values(BUTTON_SECTIONS);

export const BUTTON_CONTAINED_CODE_SAMPLE = `import { Button } from "@homonoid/react";

export function Example() {
  return (
    <Button variant="contained">
      Click me
    </Button>
  );
}`;

export const BUTTON_VARIANTS_CODE_SAMPLE = `import { Button } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="subtle">
        Subtle
      </Button>
      <Button variant="outlined">
        Outline
      </Button>
      <Button variant="plain">
        Ghost
      </Button>
      <Button variant="contained" color="destructive">
        Destructive
      </Button>
    </div>
  );
}`;

export const BUTTON_OUTLINED_CODE_SAMPLE = `import { Button } from "@homonoid/react";

export function Example() {
  return (
    <Button variant="outlined">
      Click me
    </Button>
  );
}`;

export const BUTTON_WITH_ICON_CODE_SAMPLE = `import { Button } from "@homonoid/react";
import { ArrowRight } from "lucide-react";

export function Example() {
  return (
    <Button
      variant="contained"
      leading={<ArrowRight className="size-4" />}
    >
      Click me
    </Button>
  );
}`;

export const BUTTON_ICON_ONLY_CODE_SAMPLE = `import { Button } from "@homonoid/react";
import { Plus } from "lucide-react";

export function Example() {
  return (
    <Button
      layout="icon"
      variant="contained"
      aria-label="Add item"
    >
      <Plus className="size-4" />
    </Button>
  );
}`;

export const BUTTON_LOADING_CODE_SAMPLE = `import { useState } from "react";
import { Button } from "@homonoid/react";

export function Example() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      variant="contained"
      loading={loading}
      onClick={() => setLoading(true)}
    >
      Click me
    </Button>
  );
}`;

export const BUTTON_SIZES_CODE_SAMPLE = `import { Button } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
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
  );
}`;

export const BUTTON_DISABLED_CODE_SAMPLE = `import { Button } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
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
  );
}`;

export const BUTTON_FULL_WIDTH_CODE_SAMPLE = `import { Button } from "@homonoid/react";

export function Example() {
  return (
    <Button variant="contained" layout="full">
      Full Width
    </Button>
  );
}`;

export const BUTTON_INTERACTIVE_STATES: InteractiveStateItem[] = [
  {
    label: "Hover",
    selectors: [":hover", '[data-hovered="true"]'],
  },
  {
    label: "Active/Pressed",
    selectors: [":active", '[data-pressed="true"]'],
    note: "includes scale transform",
  },
  {
    label: "Focus",
    selectors: [":focus-visible", '[data-focus-visible="true"]'],
    note: "shows focus ring",
  },
  {
    label: "Disabled",
    selectors: [":disabled", '[aria-disabled="true"]'],
    note: "reduced opacity, no pointer events",
  },
  {
    label: "Pending",
    selectors: ["[data-pending]"],
    note: "no pointer events during loading",
  },
];