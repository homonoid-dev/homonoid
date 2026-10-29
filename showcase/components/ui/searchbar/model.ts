import {
  Layers,
  Loader2,
  Command,
  Tag,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
  ArrowUpToLine,
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
  loading: {
    id: "loading",
    label: "Loading",
    icon: Loader2,
  },
  shortcut: {
    id: "shortcut",
    label: "Shortcut",
    icon: Command,
  },
  labelAndDescription: {
    id: "label-and-description",
    label: "Label & Description",
    icon: Tag,
  },
  floatingLabel: {
    id: "floating-label",
    label: "Floating Label",
    icon: ArrowUpToLine,
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
        leading={<Search className="size-4 text-muted" />}
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
          leading={<Search className="size-4 text-muted" />}
          variant={item.variant}
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
    <div className="w-full max-w-sm">
      <Searchbar
        leading={<Search className="size-4 text-muted" />}
        loading
        defaultValue="Homonoid design tokens"
        placeholder="Querying components..."
      />
    </div>
  );
}`;

export const SEARCHBAR_SHORTCUT_CODE_SAMPLE = `import { useRef, useEffect } from "react";
import { Searchbar, Kbd } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <Searchbar
        ref={inputRef}
        aria-keyshortcuts="Meta+K Control+K"
        leading={<Search className="size-4 text-muted" aria-hidden="true" />}
        trailing={<Kbd keyValue="command" content="K" />}
        placeholder="Quick find..."
      />
    </div>
  );
}`;

export const SEARCHBAR_LABEL_AND_DESCRIPTION_CODE_SAMPLE = `import { Searchbar } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-surface-gap">
      <Searchbar
        leading={<Search className="size-4 text-muted" />}
        label="Repository Search"
        description="Query public and private repositories across your organization."
        placeholder="Search repositories..."
      />
    </div>
  );
}`;

export const SEARCHBAR_FLOATING_LABEL_CODE_SAMPLE = `import { Searchbar, Kbd } from "@homonoid/react";
import { Search } from "lucide-react";

export function Example() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      <Searchbar
        floating
        label="Search library..."
        leading={<Search className="size-4 text-muted" />}
      />
      <Searchbar
        floating
        label="Quick command"
        leading={<Search className="size-4 text-muted" />}
        trailing={<Kbd keyValue="command" content="K" />}
      />
    </div>
  );
}`;
