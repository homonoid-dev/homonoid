"use client";

import { useMemo, useState } from "react";
import { Server, Cloud, Cpu } from "lucide-react";
import {
  cond,
  Select,
  type SelectOption,
  type SelectRadius,
  type SelectSize,
  type SelectVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getSelectCode } from "./model";

export function SelectView() {
  const [variant, setVariant] = useState<SelectVariant>("outlined");
  const [size, setSize] = useState<SelectSize>("md");
  const [radius, setRadius] = useState<SelectRadius>("lg");
  const [descriptions, setDescriptions] = useState(false);
  const [leadingIcons, setLeadingIcons] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);

  const options: SelectOption[] = useMemo(
    () => [
      {
        value: "prod",
        label: "Production",
        description: cond(descriptions, "Global high availability cluster", undefined),
        leading: cond(leadingIcons, <Server className="size-4" />, undefined),
      },
      {
        value: "stage",
        label: "Staging",
        description: cond(descriptions, "Pre release verification environment", undefined),
        leading: cond(leadingIcons, <Cloud className="size-4" />, undefined),
      },
      {
        value: "dev",
        label: "Development",
        description: cond(descriptions, "Local experimental sandbox", undefined),
        leading: cond(leadingIcons, <Cpu className="size-4" />, undefined),
      },
    ],
    [descriptions, leadingIcons]
  );

  const code = useMemo(
    () =>
      getSelectCode({
        variant,
        size,
        radius,
        descriptions,
        leadingIcons,
        disabled,
        invalid,
      }),
    [variant, size, radius, descriptions, leadingIcons, disabled, invalid]
  );

  return (
    <Studio
      title="Select"
      description="Collapsible option list in a floating overlay anchored to interactive triggers, enabling single choice selection with keyboard navigation."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["contained", "outlined", "plain"],
          onChange: setVariant,
        },
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
            id: "descriptions",
            label: "Item Descriptions",
            description: "Display supporting option details",
            checked: descriptions,
            onChange: setDescriptions,
          },
          {
            id: "icons",
            label: "Leading Icons",
            description: "Display contextual system icons",
            checked: leadingIcons,
            onChange: setLeadingIcons,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Inactivate select trigger",
            checked: disabled,
            onChange: setDisabled,
          },
          {
            id: "invalid",
            label: "Invalid State",
            description: "Display validation error boundary",
            checked: invalid,
            onChange: setInvalid,
          },
        ],
      }}
    >
      <div className="w-full max-w-xs p-8">
        <Select
          variant={variant}
          size={size}
          radius={radius}
          value={value}
          onValueChange={setValue}
          placeholder="Choose environment"
          options={options}
          disabled={disabled}
          invalid={invalid}
        />
      </div>
    </Studio>
  );
}

