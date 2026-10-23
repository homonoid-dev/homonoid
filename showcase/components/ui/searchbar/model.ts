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

export const SEARCHBAR_DEFAULT_CODE_SAMPLE = `import { Searchbar, Kbd } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  return (
    <div className="w-full max-w-sm">
      <Searchbar
        leading={<Search className="size-4" />}
        trailing={
          <Kbd>
            <Kbd.Abbr keyValue="command" />
            <Kbd.Content>K</Kbd.Content>
          </Kbd>
        }
        label="Quick Find"
        description="Search across all projects, team members, and settings."
        placeholder="Search documentation..."
      />
    </div>
  );
}`;

export const SEARCHBAR_VARIANTS_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  const variants = [
    { variant: "outlined", placeholder: "Outlined searchbar..." },
    { variant: "contained", placeholder: "Contained searchbar..." },
    { variant: "plain", placeholder: "Plain searchbar..." },
  ] as const;

  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      {variants.map((item) => (
        <Searchbar
          key={item.variant}
          leading={<Search className="size-4" />}
          variant={item.variant}
          placeholder={item.placeholder}
        />
      ))}
    </div>
  );
}`;

export const SEARCHBAR_SIZES_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  const sizes = [
    {
      size: "sm" as const,
      placeholder: "Small search (32px)...",
      iconClass: "size-3.5",
    },
    {
      size: "md" as const,
      placeholder: "Medium search (40px)...",
      iconClass: "size-4",
    },
    {
      size: "lg" as const,
      placeholder: "Large search (48px)...",
      iconClass: "size-5",
    },
  ];

  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      {sizes.map((item) => (
        <Searchbar
          key={item.size}
          leading={<Search className={item.iconClass} />}
          size={item.size}
          placeholder={item.placeholder}
        />
      ))}
    </div>
  );
}`;

export const SEARCHBAR_LOADING_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      <Searchbar
        leading={<Search className="size-4" />}
        loading
        defaultValue="Homonoid design tokens"
        placeholder="Querying components..."
      />
      <Searchbar
        leading={<Search className="size-3.5" />}
        loading
        size="sm"
        placeholder="Resolving records..."
      />
    </div>
  );
}`;

export const SEARCHBAR_RADII_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  const radii = [
    { radius: "md" as const, placeholder: "Medium radius..." },
    { radius: "lg" as const, placeholder: "Large radius..." },
    { radius: "full" as const, placeholder: "Pill searchbar..." },
  ];

  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      {radii.map((item) => (
        <Searchbar
          key={item.radius}
          leading={<Search className="size-4" />}
          radius={item.radius}
          placeholder={item.placeholder}
        />
      ))}
    </div>
  );
}`;

export const SEARCHBAR_LABEL_AND_DESCRIPTION_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-surface-gap">
      <Searchbar
        leading={<Search className="size-4" />}
        label="Repository Search"
        description="Query public and private repositories across your organization."
        placeholder="Search repositories..."
      />
    </div>
  );
}`;
