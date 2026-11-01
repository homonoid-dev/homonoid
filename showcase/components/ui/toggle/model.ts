import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Ruler,
  Paintbrush,
  Sliders,
  StretchHorizontal,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface ToggleSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const TOGGLE_SECTIONS: Record<string, ToggleSectionItem> = {
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
  groups: {
    id: "toggle-groups",
    label: "Toggle Groups",
    icon: Sliders,
  },
  multiple: {
    id: "multiple-selection",
    label: "Multiple Selection",
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

export const TOGGLE_SECTIONS_LIST: ToggleSectionItem[] =
  Object.values(TOGGLE_SECTIONS);

export const TOGGLE_DEFAULT_CODE_SAMPLE = `import { Toggle } from "@homonoid/react";
import { Bold, Italic, Underline } from "lucide-react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toggle aria-label="Toggle bold" defaultPressed layout="icon">
        <Bold className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic" layout="icon">
        <Italic className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline" layout="icon">
        <Underline className="size-4" />
      </Toggle>
    </div>
  );
}`;

export const TOGGLE_VARIANTS_CODE_SAMPLE = `import { Toggle } from "@homonoid/react";
import { Bookmark, Pin, Bell } from "lucide-react";

export function Example() {
  const variants = ["contained", "outlined", "plain"] as const;

  return (
    <div className="flex flex-col items-center gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center justify-center gap-3">
          <Toggle
            variant={variant}
            color="primary"
            defaultPressed
            layout="icon"
            aria-label={\`\${variant} active bookmark\`}
          >
            <Bookmark className="size-4" />
          </Toggle>
          <Toggle
            variant={variant}
            color="primary"
            layout="icon"
            aria-label={\`\${variant} inactive pin\`}
          >
            <Pin className="size-4" />
          </Toggle>
          <Toggle
            variant={variant}
            color="primary"
            layout="icon"
            aria-label={\`\${variant} inactive bell\`}
          >
            <Bell className="size-4" />
          </Toggle>
        </div>
      ))}
    </div>
  );
}`;

export const TOGGLE_SIZES_CODE_SAMPLE = `import { Toggle } from "@homonoid/react";
import { Bookmark } from "lucide-react";

export function Example() {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {sizes.map((size) => (
        <Toggle
          key={size}
          size={size}
          variant="outlined"
          color="surface"
          defaultPressed
          layout="icon"
          aria-label={\`Toggle size \${size}\`}
        >
          <Bookmark className="size-4" />
        </Toggle>
      ))}
    </div>
  );
}`;

export const TOGGLE_COLORS_CODE_SAMPLE = `import { Toggle } from "@homonoid/react";
import { Pin } from "lucide-react";

export function Example() {
  const colors = ["primary", "subtle", "surface", "destructive"] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {colors.map((color) => (
        <Toggle
          key={color}
          color={color}
          variant="contained"
          defaultPressed
          layout="icon"
          aria-label={\`Toggle color \${color}\`}
        >
          <Pin className="size-4" />
        </Toggle>
      ))}
    </div>
  );
}`;

export const TOGGLE_GROUPS_CODE_SAMPLE = `import { Toggle } from "@homonoid/react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export function Example() {
  return (
    <Toggle.Group type="single" defaultValue="left" variant="plain" color="surface">
      <Toggle.Item value="left" layout="icon" aria-label="Align left">
        <AlignLeft className="size-4" />
      </Toggle.Item>
      <Toggle.Item value="center" layout="icon" aria-label="Align center">
        <AlignCenter className="size-4" />
      </Toggle.Item>
      <Toggle.Item value="right" layout="icon" aria-label="Align right">
        <AlignRight className="size-4" />
      </Toggle.Item>
    </Toggle.Group>
  );
}`;

export const TOGGLE_MULTIPLE_CODE_SAMPLE = `import { Toggle } from "@homonoid/react";
import { Bold, Italic, Underline } from "lucide-react";

export function Example() {
  return (
    <Toggle.Group
      type="multiple"
      defaultValue={["bold"]}
      variant="outlined"
      color="surface"
    >
      <Toggle.Item value="bold" layout="icon" aria-label="Format bold">
        <Bold className="size-4" />
      </Toggle.Item>
      <Toggle.Item value="italic" layout="icon" aria-label="Format italic">
        <Italic className="size-4" />
      </Toggle.Item>
      <Toggle.Item value="underline" layout="icon" aria-label="Format underline">
        <Underline className="size-4" />
      </Toggle.Item>
    </Toggle.Group>
  );
}`;

