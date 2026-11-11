"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Autocomplete, cond, type Radius, type Size } from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { AUTOCOMPLETE_OPTIONS, getAutocompleteCode } from "./model";

export function AutocompleteView() {
  const [size, setSize] = useState<Size>("md");
  const [radius, setRadius] = useState<Radius>("md");
  const [value, setValue] = useState("");
  const [floating, setFloating] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLeading, setShowLeading] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [compound, setCompound] = useState(false);

  const code = useMemo(
    () =>
      getAutocompleteCode({
        size,
        radius,
        floating,
        disabled,
        invalid,
        loading,
        showLeading,
        showDescription,
        compound,
      }),
    [size, radius, floating, disabled, invalid, loading, showLeading, showDescription, compound]
  );

  return (
    <Studio
      title="Autocomplete"
      description="Dynamic suggestion surfaces engineered with fuzzy filtering and floating positioning. Delivers accessible combobox semantics with tactile keyboard navigation and continuous transition physics."
      code={code}
      controls={{
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        radius: {
          value: radius,
          options: ["full", "lg", "md", "sm", "none"],
          onChange: setRadius,
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
          {
            id: "compound",
            label: "Compound",
            description: "Render using explicit subcomponents",
            checked: compound,
            onChange: setCompound,
          },
        ],
      }}
    >
      <div className="w-full max-w-sm">
        {cond(
          compound,
          <Autocomplete
            key={`${size}-${radius}-${disabled}-${invalid}-${loading}-compound`}
            value={value}
            onValueChange={setValue}
            size={size}
            radius={radius}
            disabled={disabled}
            invalid={invalid}
            loading={loading}
          >
            <Autocomplete.Input
              placeholder="Component"
              label={cond(floating, "Component", undefined)}
              floating={floating}
              leading={cond(showLeading, <Search className="size-4 text-muted shrink-0" />, undefined)}
            />
            <Autocomplete.Content>
              <Autocomplete.List>
                {AUTOCOMPLETE_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Autocomplete.Item
                      key={item.value}
                      value={item.value}
                      label={item.label}
                      description={cond(showDescription, item.description, undefined)}
                      leading={cond(showLeading, <Icon className="size-4 text-muted shrink-0" />, undefined)}
                    />
                  );
                })}
              </Autocomplete.List>
            </Autocomplete.Content>
          </Autocomplete>,
          <Autocomplete
            key={`${size}-${radius}-${floating}-${disabled}-${invalid}-${loading}-atomic`}
            value={value}
            onValueChange={setValue}
            size={size}
            radius={radius}
            label={cond(floating, "Component", undefined)}
            floating={floating}
            disabled={disabled}
            invalid={invalid}
            loading={loading}
            placeholder="Component"
            leading={cond(showLeading, <Search className="size-4 text-muted shrink-0" />, undefined)}
            options={AUTOCOMPLETE_OPTIONS.map((item) => {
              const Icon = item.icon;
              return {
                value: item.value,
                label: item.label,
                description: cond(showDescription, item.description, undefined),
                leading: cond(showLeading, <Icon className="size-4 text-muted shrink-0" />, undefined),
              };
            })}
          />
        )}
      </div>
    </Studio>
  );
}
