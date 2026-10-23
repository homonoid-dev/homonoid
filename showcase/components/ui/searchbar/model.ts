import {
  Layers,
  Ruler,
  Loader2,
  CircleDot,
  Tag,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
  LucideIcon,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface SearchbarSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const SEARCHBAR_SECTIONS: Record<string, SearchbarSectionItem> = {
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
  loading: {
    id: "loading",
    label: "Loading",
    icon: Loader2,
  },
  radius: {
    id: "radius",
    label: "Radius",
    icon: CircleDot,
  },
  labelAndDescription: {
    id: "label-and-description",
    label: "Label & Description",
    icon: Tag,
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

export const SEARCHBAR_SECTIONS_LIST: SearchbarSectionItem[] =
  Object.values(SEARCHBAR_SECTIONS);

export const SEARCHBAR_DEFAULT_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  return (
    <div className="w-full max-w-sm">
      <Searchbar
        leading={<Search className="size-4" />}
        label="Quick Find"
        description="Search across all projects, team members, and settings."
        placeholder="Search documentation..."
        shortcut="⌘K"
      />
    </div>
  );
}`;

export const SEARCHBAR_VARIANTS_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";

export function Example() {
  const variants = [
    { variant: "outlined", placeholder: "Outlined searchbar..." },
    { variant: "filled", placeholder: "Filled searchbar..." },
    { variant: "plain", placeholder: "Plain searchbar..." },
  ] as const;

  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      {variants.map((item) => (
        <Searchbar
          key={item.variant}
          variant={item.variant}
          placeholder={item.placeholder}
        />
      ))}
    </div>
  );
}`;

export const SEARCHBAR_SIZES_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";

export function Example() {
  const sizes = [
    { size: "sm", placeholder: "Small search (32px)...", shortcut: "/" },
    { size: "md", placeholder: "Medium search (40px)...", shortcut: "⌘K" },
    { size: "lg", placeholder: "Large search (48px)...", shortcut: "⌘K" },
  ] as const;

  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      {sizes.map((item) => (
        <Searchbar
          key={item.size}
          size={item.size}
          placeholder={item.placeholder}
          shortcut={item.shortcut}
        />
      ))}
    </div>
  );
}`;

export const SEARCHBAR_LOADING_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      <Searchbar
        loading
        defaultValue="Homonoid design tokens"
        placeholder="Querying components..."
      />
      <Searchbar
        loading
        size="sm"
        placeholder="Resolving records..."
      />
    </div>
  );
}`;

export const SEARCHBAR_RADII_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";

export function Example() {
  const radii = [
    { radius: "md", placeholder: "Medium radius..." },
    { radius: "lg", placeholder: "Large radius..." },
    { radius: "full", placeholder: "Pill searchbar..." },
  ] as const;

  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      {radii.map((item) => (
        <Searchbar
          key={item.radius}
          radius={item.radius}
          placeholder={item.placeholder}
          shortcut="⌘K"
        />
      ))}
    </div>
  );
}`;

export const SEARCHBAR_LABEL_AND_DESCRIPTION_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-surface-gap">
      <Searchbar
        label="Repository Search"
        description="Query public and private repositories across your organization."
        placeholder="Search repositories..."
        shortcut="⌘K"
      />
    </div>
  );
}`;
