import type { LucideIcon } from "lucide-react";
import {
  PieChart,
  Ruler,
  Paintbrush,
  SlidersHorizontal,
  Infinity,
  Accessibility,
  MousePointerClick,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";
import type { InteractiveStateItem } from "@/components/ui/interactive-states";

export interface ProgressSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const PROGRESS_SECTIONS: Record<string, ProgressSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: PieChart,
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
  dynamic: {
    id: "dynamic",
    label: "Dynamic",
    icon: SlidersHorizontal,
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

export const PROGRESS_SECTIONS_LIST: ProgressSectionItem[] =
  Object.values(PROGRESS_SECTIONS);

export const PROGRESS_DEFAULT_CODE_SAMPLE = `import { Progress } from "@homonoid/react";

export function Example() {
  return (
    <Progress value={65} variant="circular" />
  );
}`;

export const PROGRESS_VARIANTS_CODE_SAMPLE = `import { Progress } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      <Progress value={75} variant="circular" />
      <Progress value={75} variant="linear" />
    </div>
  );
}`;

export const PROGRESS_SIZES_CODE_SAMPLE = `import { Progress } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      <div className="flex items-center gap-6">
        <Progress value={70} variant="circular" size="sm" />
        <Progress value={70} variant="circular" size="md" />
        <Progress value={70} variant="circular" size="lg" />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Progress value={70} variant="linear" size="sm" />
        <Progress value={70} variant="linear" size="md" />
        <Progress value={70} variant="linear" size="lg" />
      </div>
    </div>
  );
}`;

export const PROGRESS_COLORS_CODE_SAMPLE = `import { Progress } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      <div className="flex items-center gap-4">
        <Progress value={60} color="primary" />
        <Progress value={60} color="subtle" />
        <Progress value={60} color="surface" />
        <Progress value={60} color="destructive" />
      </div>
      <div className="flex flex-col gap-2.5 w-full">
        <Progress value={60} color="primary" variant="linear" />
        <Progress value={60} color="subtle" variant="linear" />
        <Progress value={60} color="surface" variant="linear" />
        <Progress value={60} color="destructive" variant="linear" />
      </div>
    </div>
  );
}`;

export const PROGRESS_DYNAMIC_CODE_SAMPLE = `import { useState } from "react";
import { Progress, Button } from "@homonoid/react";

export function Example() {
  const [value, setValue] = useState(35);

  const increment = () => setValue((prev) => (prev >= 100 ? 0 : prev + 15));

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xs">
      <Progress value={value} variant="circular" size="lg" />
      <Progress value={value} variant="linear" size="md" />
      <Button variant="outlined" color="surface" onClick={increment}>
        Advance Progress
      </Button>
    </div>
  );
}`;

export const PROGRESS_INTERACTIVE_STATES: InteractiveStateItem[] = [
  {
    label: "Determinate",
    selectors: ['[role="progressbar"][aria-valuenow]'],
    note: "displays quantified completion value",
  },
  {
    label: "Indeterminate",
    selectors: ['[role="progressbar"][data-indeterminate="true"]'],
    note: "unspecified completion telemetry",
  },
  {
    label: "Complete",
    selectors: ['[role="progressbar"][aria-valuenow="100"]'],
    note: "maximum boundary reached",
  },
];

