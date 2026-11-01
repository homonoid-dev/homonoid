import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Sliders,
  Maximize2,
  ArrowUpToLine,
  AlertCircle,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface TextareaSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const TEXTAREA_SECTIONS: Record<string, TextareaSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Sliders,
  },
  autoResize: {
    id: "auto-resizing",
    label: "Auto Resizing",
    icon: Maximize2,
  },
  floatingLabel: {
    id: "floating-label",
    label: "Floating Label",
    icon: ArrowUpToLine,
  },
  validation: {
    id: "validation",
    label: "Validation",
    icon: AlertCircle,
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

export const TEXTAREA_SECTIONS_LIST: TextareaSectionItem[] =
  Object.values(TEXTAREA_SECTIONS);

export const TEXTAREA_DEFAULT_CODE_SAMPLE = `import { Textarea } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Textarea
        label="Feedback"
        placeholder="Share your thoughts with the team..."
        description="Write concise feedback regarding your experience."
        rows={4}
      />
    </div>
  );
}`;

export const TEXTAREA_VARIANTS_CODE_SAMPLE = `import { Textarea } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <Textarea variant="outlined" placeholder="Outlined textarea..." rows={3} />
      <Textarea variant="contained" placeholder="Contained textarea..." rows={3} />
      <Textarea variant="plain" placeholder="Plain textarea..." rows={3} />
    </div>
  );
}`;

export const TEXTAREA_SIZES_CODE_SAMPLE = `import { Textarea } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <Textarea size="sm" placeholder="Small textarea..." rows={2} />
      <Textarea size="md" placeholder="Medium textarea..." rows={3} />
      <Textarea size="lg" placeholder="Large textarea..." rows={4} />
    </div>
  );
}`;

export const TEXTAREA_AUTO_RESIZE_CODE_SAMPLE = `import { Textarea } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Textarea
        autoResize
        minRows={3}
        maxRows={8}
        placeholder="Type continuous thoughts here to see smooth vertical auto expansion..."
      />
    </div>
  );
}`;

export const TEXTAREA_FLOATING_LABEL_CODE_SAMPLE = `import { Textarea } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
      <Textarea
        floating
        label="Project Notes"
        placeholder="Document implementation details..."
        rows={3}
      />
      <Textarea
        floating
        label="Repository Summary"
        defaultValue="Homonoid design system built with React 19 and Tailwind CSS v4."
        rows={3}
      />
    </div>
  );
}`;

export const TEXTAREA_VALIDATION_CODE_SAMPLE = `import { Textarea } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Textarea
        invalid
        label="Submission Details"
        defaultValue="Missing requirements"
        error="Please provide at least three detailed bullet points."
        rows={3}
      />
    </div>
  );
}`;

