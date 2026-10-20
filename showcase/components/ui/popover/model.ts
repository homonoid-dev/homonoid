import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Layers,
  Ruler,
  SlidersHorizontal,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface PopoverSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const POPOVER_SECTIONS: Record<string, PopoverSectionItem> = {
  placements: {
    id: "placements",
    label: "Placements",
    icon: Compass,
  },
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
  form: {
    id: "form-actions",
    label: "Form Actions",
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

export const POPOVER_SECTIONS_LIST: PopoverSectionItem[] =
  Object.values(POPOVER_SECTIONS);

export const POPOVER_DEFAULT_CODE_SAMPLE = `import { Button, Popover } from "@homonoid/react";

export function Example() {
  return (
    <Popover>
      <Button variant="contained">Click me</Button>
      <Popover.Content className="max-w-64">
        <Popover.Dialog>
          <Popover.Heading size="sm">Popover Title</Popover.Heading>
          <p className="mt-2 text-sm text-muted">
            This is the popover content. You can put any content here.
          </p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}`;

export const POPOVER_PLACEMENTS_CODE_SAMPLE = `import { Button, Popover } from "@homonoid/react";

const PLACEMENTS = [
  { side: "top" as const, label: "Top" },
  { side: "bottom" as const, label: "Bottom" },
  { side: "left" as const, label: "Left" },
  { side: "right" as const, label: "Right" },
];

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      {PLACEMENTS.map((item) => (
        <Popover key={item.side} side={item.side}>
          <Button variant="outlined">{item.label}</Button>
          <Popover.Content className="max-w-56">
            <Popover.Dialog>
              <Popover.Heading size="sm">{item.label} Placement</Popover.Heading>
              <p className="mt-1 text-xs text-muted">
                Anchored to the {item.side} side of the trigger element.
              </p>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  );
}`;

export const POPOVER_VARIANTS_CODE_SAMPLE = `import { Button, Popover } from "@homonoid/react";

const VARIANTS = [
  { variant: "surface" as const, label: "Surface" },
  { variant: "primary" as const, label: "Primary" },
  { variant: "inverted" as const, label: "Inverted" },
];

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      {VARIANTS.map((item) => (
        <Popover key={item.variant}>
          <Button variant="outlined">{item.label}</Button>
          <Popover.Content className="max-w-64">
            <Popover.Dialog variant={item.variant}>
              <Popover.Heading size="sm">{item.label} Theme</Popover.Heading>
              <p className="mt-1 text-xs opacity-80">
                Dialog surface consuming {item.variant} design tokens.
              </p>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  );
}`;

export const POPOVER_SIZES_CODE_SAMPLE = `import { Button, Popover } from "@homonoid/react";

const SIZES = [
  { size: "sm" as const, label: "Small" },
  { size: "md" as const, label: "Medium" },
  { size: "lg" as const, label: "Large" },
];

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      {SIZES.map((item) => (
        <Popover key={item.size}>
          <Button variant="outlined">{item.label}</Button>
          <Popover.Content>
            <Popover.Dialog size={item.size}>
              <Popover.Heading size="sm">{item.label} Dimension</Popover.Heading>
              <p className="mt-1 text-xs text-muted">
                Structured popover container maintaining stable dimensional width.
              </p>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  );
}`;

export const POPOVER_FORM_CODE_SAMPLE = `import { Button, Popover, Input, Description } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex items-center justify-center p-6">
      <Popover>
        <Button variant="contained">Filter Settings</Button>
        <Popover.Content className="w-80">
          <Popover.Dialog className="gap-3">
            <div className="flex flex-col gap-1">
              <Popover.Heading size="sm">Display Options</Popover.Heading>
              <Description>Adjust presentation criteria and tags.</Description>
            </div>
            <div className="flex flex-col gap-2">
              <Input placeholder="Enter tag name" size="sm" />
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button size="sm" variant="plain">
                Reset
              </Button>
              <Button size="sm" variant="contained">
                Apply
              </Button>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}`;
