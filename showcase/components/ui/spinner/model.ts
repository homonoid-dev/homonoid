import type { LucideIcon } from "lucide-react";
import {
  RotateCw,
  Ruler,
  Paintbrush,
  Box,
  Infinity,
  Accessibility,
  MousePointerClick,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";
import type { InteractiveStateItem } from "@/components/ui/interactive-states";

export interface SpinnerSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const SPINNER_SECTIONS: Record<string, SpinnerSectionItem> = {
  animations: {
    id: "animations",
    label: "Animations",
    icon: RotateCw,
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
  embedded: {
    id: "embedded",
    label: "Embedded",
    icon: Box,
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

export const SPINNER_SECTIONS_LIST: SpinnerSectionItem[] =
  Object.values(SPINNER_SECTIONS);

export const SPINNER_INTERACTIVE_STATES: InteractiveStateItem[] = [
  {
    label: "Active",
    selectors: ['role="status"', 'aria-label="Loading"'],
    note: "live region announcement",
  },
  {
    label: "Decorative",
    selectors: ['aria-hidden="true"'],
    note: "paired with accompanying label",
  },
  {
    label: "Reduced Motion",
    selectors: ["@media (prefers-reduced-motion: reduce)"],
    note: "calm opacity breathing cadence",
  },
];

export const SPINNER_DEFAULT_CODE_SAMPLE = `import { Spinner } from "@homonoid/react";

export function Example() {
  return <Spinner />;
}`;

export const SPINNER_ANIMATIONS_CODE_SAMPLE = `import { Spinner } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row items-center gap-surface-gap">
      <div className="flex flex-col items-center gap-2">
        <Spinner animation="border" />
        <span className="text-xs text-muted">Border</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner animation="grow" />
        <span className="text-xs text-muted">Grow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner animation="orbit" />
        <span className="text-xs text-muted">Orbit</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner animation="dash" />
        <span className="text-xs text-muted">Dash</span>
      </div>
    </div>
  );
}`;

export const SPINNER_SIZES_CODE_SAMPLE = `import { Spinner } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row items-center gap-surface-gap">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}`;

export const SPINNER_COLORS_CODE_SAMPLE = `import { Spinner } from "@homonoid/react";

export function ColorsExample() {
  return (
    <div className="flex flex-row items-center gap-surface-gap">
      <Spinner color="subtle" />
      <Spinner color="foreground" />
      <Spinner color="destructive" />
    </div>
  );
}`;

export const SPINNER_EMBEDDED_CODE_SAMPLE = `import { Button, Input, Spinner } from "@homonoid/react";

export function EmbeddedExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-sm">
      <Button loading>
        Submitting
      </Button>
      <Input
        placeholder="Searching components..."
        trailing={<Spinner size="sm" color="subtle" />}
      />
    </div>
  );
}`;
