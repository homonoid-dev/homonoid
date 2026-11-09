import { Search, Layers, Boxes, FileCode, Palette, Component } from "lucide-react";
import type { ComponentType } from "react";
import type { Radius, Size } from "@homonoid/react";

export interface AutocompleteDemoOption {
  value: string;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconName: string;
}

export const AUTOCOMPLETE_OPTIONS: AutocompleteDemoOption[] = [
  {
    value: "button",
    label: "Button",
    description: "Interactive tactile trigger",
    icon: Component,
    iconName: "Component",
  },
  {
    value: "accordion",
    label: "Accordion",
    description: "Vertically stacked disclosures",
    icon: Layers,
    iconName: "Layers",
  },
  {
    value: "autocomplete",
    label: "Autocomplete",
    description: "Combobox with fuzzy filtering",
    icon: Search,
    iconName: "Search",
  },
  {
    value: "input",
    label: "Input",
    description: "Text entry field with floating label",
    icon: FileCode,
    iconName: "FileCode",
  },
  {
    value: "select",
    label: "Select",
    description: "Overlay option menu picker",
    icon: Boxes,
    iconName: "Boxes",
  },
  {
    value: "tabs",
    label: "Tabs",
    description: "Segmented container switcher",
    icon: Palette,
    iconName: "Palette",
  },
];

export interface AutocompleteCodeOptions {
  size: Size;
  radius: Radius;
  floating: boolean;
  disabled: boolean;
  invalid: boolean;
  loading: boolean;
  showLeading: boolean;
  showDescription: boolean;
}

export function getAutocompleteCode(options: AutocompleteCodeOptions): string {
  const {
    size,
    radius,
    floating,
    disabled,
    invalid,
    loading,
    showLeading,
    showDescription,
  } = options;

  const iconImports = showLeading
    ? `import { Search, Layers, Boxes, FileCode, Palette, Component } from "lucide-react";\n`
    : "";

  const optionsList = AUTOCOMPLETE_OPTIONS.map((item) => {
    const fields: string[] = [`value: "${item.value}"`, `label: "${item.label}"`];
    if (showDescription) {
      fields.push(`description: "${item.description}"`);
    }
    if (showLeading) {
      fields.push(`icon: ${item.iconName}`);
    }
    return `  { ${fields.join(", ")} },`;
  }).join("\n");

  const props: string[] = ['placeholder="Component"'];
  if (size !== "md") props.push(`size="${size}"`);
  if (radius !== "md") props.push(`radius="${radius}"`);
  if (floating) {
    props.push('label="Component"');
    props.push("floating");
  }
  if (disabled) props.push("disabled");
  if (invalid) props.push("invalid");
  if (loading) props.push("loading");
  if (showLeading) {
    props.push('leading={<Search className="size-4 text-muted shrink-0" />}');
  }
  props.push("options={OPTIONS}");

  const formattedProps = props.map((p) => `      ${p}`).join("\n");

  return `${iconImports}import { Autocomplete } from "@homonoid/react";

const OPTIONS = [
${optionsList}
];

export function Example() {
  return (
    <Autocomplete
${formattedProps}
    />
  );
}`;
}

