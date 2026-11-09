"use client";

import { useMemo, useState } from "react";
import { Accordion, cond, type Size } from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { ACCORDION_ITEMS, getAccordionCode } from "./model";

export function AccordionView() {
  const [variant, setVariant] = useState<"plain" | "outlined" | "contained">("plain");
  const [size, setSize] = useState<Size>("md");
  const [multiple, setMultiple] = useState(false);
  const [collapsible, setCollapsible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [showLeading, setShowLeading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const code = useMemo(
    () =>
      getAccordionCode({
        variant,
        size,
        multiple,
        collapsible,
        disabled,
        showLeading,
        showDescription,
      }),
    [variant, size, multiple, collapsible, disabled, showLeading, showDescription]
  );

  return (
    <Studio
      title="Accordion"
      description="Vertically stacked disclosure surfaces engineered with continuous motion physics and dimensional height stability. Delivers intuitive keyboard navigation and reliable assistive technology semantics across all expansion states."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["plain", "outlined", "contained"],
          onChange: setVariant,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        switches: [
          {
            id: "multiple",
            label: "Multiple",
            description: "Expand several panels",
            checked: multiple,
            onChange: setMultiple,
          },
          {
            id: "collapsible",
            label: "Collapsible",
            description: "Allow closing all panels",
            checked: collapsible,
            onChange: setCollapsible,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Disable all triggers",
            checked: disabled,
            onChange: setDisabled,
          },
          {
            id: "icons",
            label: "Icons",
            description: "Show leading icons",
            checked: showLeading,
            onChange: setShowLeading,
          },
          {
            id: "descriptions",
            label: "Descriptions",
            description: "Show trigger subtitles",
            checked: showDescription,
            onChange: setShowDescription,
          },
        ],
      }}
    >
      <Accordion
        key={`${variant}-${size}-${multiple}-${collapsible}`}
        defaultValue="item-1"
        variant={variant}
        size={size}
        multiple={multiple}
        collapsible={collapsible}
        disabled={disabled}
        className="w-full max-w-md"
      >
        {ACCORDION_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Trigger
                leading={cond(showLeading, <Icon className="size-4 text-muted shrink-0" />, undefined)}
                description={cond(showDescription, item.description, undefined)}
              >
                {item.title}
              </Accordion.Trigger>
              <Accordion.Content>
                {item.content}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Studio>
  );
}
