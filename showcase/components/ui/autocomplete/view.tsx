"use client";

import { useState } from "react";
import { Search, Layers, Boxes, FileCode, Palette, Component } from "lucide-react";
import { Autocomplete, cond, type Size } from "@homonoid/react";
import { Studio } from "@/components/ui/studio";

const OPTIONS = [
  {
    value: "button",
    label: "Button",
    description: "Interactive tactile trigger",
    icon: Component,
  },
  {
    value: "accordion",
    label: "Accordion",
    description: "Vertically stacked disclosures",
    icon: Layers,
  },
  {
    value: "autocomplete",
    label: "Autocomplete",
    description: "Combobox with fuzzy filtering",
    icon: Search,
  },
  {
    value: "input",
    label: "Input",
    description: "Text entry field with floating label",
    icon: FileCode,
  },
  {
    value: "select",
    label: "Select",
    description: "Overlay option menu picker",
    icon: Boxes,
  },
  {
    value: "tabs",
    label: "Tabs",
    description: "Segmented container switcher",
    icon: Palette,
  },
];

export function AutocompleteView() {
  const [size, setSize] = useState<Size>("md");
  const [value, setValue] = useState("");
  const [floating, setFloating] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLeading, setShowLeading] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  return (
    <Studio
      title="Autocomplete"
      description="Dynamic suggestion surfaces engineered with fuzzy filtering and floating positioning. Delivers accessible combobox semantics with tactile keyboard navigation and continuous transition physics."
      controls={{
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        switches: [
          {
            id: "floating",
            label: "Floating",
            description: "Float label inside frame",
            checked: floating,
            onChange: setFloating,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Disable all interactions",
            checked: disabled,
            onChange: setDisabled,
          },
          {
            id: "invalid",
            label: "Invalid",
            description: "Show error boundary",
            checked: invalid,
            onChange: setInvalid,
          },
          {
            id: "loading",
            label: "Loading",
            description: "Show loading indicator",
            checked: loading,
            onChange: setLoading,
          },
          {
            id: "icons",
            label: "Icons",
            description: "Show option icons",
            checked: showLeading,
            onChange: setShowLeading,
          },
          {
            id: "descriptions",
            label: "Descriptions",
            description: "Show option details",
            checked: showDescription,
            onChange: setShowDescription,
          },
        ],
      }}
    >
      <div className="w-full max-w-sm">
        <Autocomplete
          value={value}
          onValueChange={setValue}
          size={size}
          label={cond(floating, "Component", undefined)}
          floating={floating}
          disabled={disabled}
          invalid={invalid}
          loading={loading}
          placeholder="Search components..."
          leading={cond(showLeading, <Search className="size-4 text-muted shrink-0" />, undefined)}
          options={OPTIONS.map((item) => {
            const Icon = item.icon;
            return {
              value: item.value,
              label: item.label,
              description: cond(showDescription, item.description, undefined),
              leading: cond(showLeading, <Icon className="size-4 text-muted shrink-0" />, undefined),
            };
          })}
        />
      </div>
    </Studio>
  );
}
