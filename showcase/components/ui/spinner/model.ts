import type { LucideIcon } from "lucide-react";
import {
  RotateCw,
  Ruler,
  Palette,
  Box,
  Infinity,
  MousePointerClick,
  Sliders,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";
import type { InteractiveStateItem } from "@/components/ui/interactive-states";

export interface SpinnerSectionItem extends TocItem {
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
    icon: Palette,
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
  interactiveStates: {
    id: "interactive-states",
    label: "Interactive States",
    icon: MousePointerClick,
  },
  tokens: {
    id: "design-tokens",
    label: "Design Tokens",
    icon: Sliders,
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

export const SPINNER_DEFAULT_CODE_SAMPLE = `import { Spinner } from "@harmonia/react";

export function Example() {
  return <Spinner size="md" />;
}`;

export const SPINNER_ANIMATIONS_CODE_SAMPLE = `import { Spinner } from "@harmonia/react";

export function AnimationsExample() {
  return (
    <div className="flex flex-row items-center gap-surface-gap">
      <div className="flex flex-col items-center gap-2">
        <Spinner animation="border" size="md" />
        <span className="text-xs text-muted">Border</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner animation="grow" size="md" />
        <span className="text-xs text-muted">Grow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner animation="orbit" size="md" />
        <span className="text-xs text-muted">Orbit</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner animation="dash" size="md" />
        <span className="text-xs text-muted">Dash</span>
      </div>
    </div>
  );
}`;

export const SPINNER_SIZES_CODE_SAMPLE = `import { Spinner } from "@harmonia/react";

export function SizesExample() {
  return (
    <div className="flex flex-row items-center gap-surface-gap">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-muted">sm (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-muted">md (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-muted">lg (32px)</span>
      </div>
    </div>
  );
}`;

export const SPINNER_COLORS_CODE_SAMPLE = `import { Spinner } from "@harmonia/react";

export function ColorsExample() {
  return (
    <div className="flex flex-row items-center gap-surface-gap">
      <Spinner color="primary" size="md" />
      <Spinner color="subtle" size="md" />
      <Spinner color="foreground" size="md" />
      <Spinner color="destructive" size="md" />
    </div>
  );
}`;

export const SPINNER_EMBEDDED_CODE_SAMPLE = `import { Button, Input, Spinner } from "@harmonia/react";

export function EmbeddedExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-sm">
      <Button loading shape="circle">
        Submitting
      </Button>
      <Input
        placeholder="Searching components..."
        trailing={<Spinner size="sm" color="subtle" />}
      />
    </div>
  );
}`;
