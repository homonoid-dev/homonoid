import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Component,
  Sliders,
  MousePointerClick,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface AutocompleteSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const AUTOCOMPLETE_SECTIONS: Record<string, AutocompleteSectionItem> = {
  atomic: {
    id: "atomic-usage",
    label: "Atomic Usage",
    icon: Component,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Sliders,
  },
  async: {
    id: "async-loading",
    label: "Async Loading",
    icon: Layers,
  },
  interactive: {
    id: "compound-composition",
    label: "Compound Composition",
    icon: MousePointerClick,
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

export const AUTOCOMPLETE_SECTIONS_LIST: AutocompleteSectionItem[] =
  Object.values(AUTOCOMPLETE_SECTIONS);

export const AUTOCOMPLETE_DEFAULT_CODE_SAMPLE = `import { Autocomplete } from "@homonoid/react";

export function Example() {
  const options = [
    {
      value: "react",
      label: "React",
      description: "A declarative component library for modern user interfaces.",
    },
    {
      value: "vue",
      label: "Vue",
      description: "The progressive framework for building web applications.",
    },
    {
      value: "svelte",
      label: "Svelte",
      description: "Cybernetically enhanced web applications with zero runtime.",
    },
    {
      value: "angular",
      label: "Angular",
      description: "A unified platform for scalable enterprise web development.",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <Autocomplete placeholder="Search framework..." options={options} />
    </div>
  );
}`;

export const AUTOCOMPLETE_ATOMIC_CODE_SAMPLE = `import { Autocomplete } from "@homonoid/react";

export function Example() {
  const options = [
    {
      value: "tokyo",
      label: "Tokyo",
      description: "Capital of Japan, largest metropolitan area in the world.",
    },
    {
      value: "paris",
      label: "Paris",
      description: "Capital of France, celebrated center of art and culture.",
    },
    {
      value: "london",
      label: "London",
      description: "Capital of the United Kingdom, global financial center.",
    },
    {
      value: "newyork",
      label: "New York",
      description: "Major financial and media hub in the United States.",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <Autocomplete placeholder="Select destination city..." options={options} />
    </div>
  );
}`;

export const AUTOCOMPLETE_SIZES_CODE_SAMPLE = `import { Autocomplete } from "@homonoid/react";

export function Example() {
  const options = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "gb", label: "United Kingdom" },
    { value: "de", label: "Germany" },
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-4">
      <Autocomplete size="sm" placeholder="Small autocomplete..." options={options} />
      <Autocomplete size="md" placeholder="Medium autocomplete..." options={options} />
      <Autocomplete size="lg" placeholder="Large autocomplete..." options={options} />
    </div>
  );
}`;

export const AUTOCOMPLETE_ASYNC_CODE_SAMPLE = `import { Autocomplete } from "@homonoid/react";

export function Example() {
  const options = [
    {
      value: "cache",
      label: "Cached Results",
      description: "Recently indexed items ready for instant selection.",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <Autocomplete
        loading
        placeholder="Searching remote database..."
        options={options}
      />
    </div>
  );
}`;

export const AUTOCOMPLETE_COMPOUND_CODE_SAMPLE = `import { Autocomplete } from "@homonoid/react";

export function Example() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Autocomplete defaultValue="react">
        <Autocomplete.Input placeholder="Select framework..." />
        <Autocomplete.Content>
          <Autocomplete.List>
            <Autocomplete.Group heading="Popular">
              <Autocomplete.Item value="react">React</Autocomplete.Item>
              <Autocomplete.Item value="vue">Vue</Autocomplete.Item>
            </Autocomplete.Group>
            <Autocomplete.Group heading="Emerging">
              <Autocomplete.Item value="svelte">Svelte</Autocomplete.Item>
              <Autocomplete.Item value="solid">Solid</Autocomplete.Item>
            </Autocomplete.Group>
          </Autocomplete.List>
          <Autocomplete.Empty>No frameworks found.</Autocomplete.Empty>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  );
}`;

