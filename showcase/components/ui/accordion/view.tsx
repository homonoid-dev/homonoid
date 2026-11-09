"use client";

import { useState } from "react";
import { HelpCircle, Activity, Shield } from "lucide-react";
import { Accordion, cond, type Size } from "@homonoid/react";
import { Studio } from "@/components/ui/studio";

const CODE_EXAMPLE = `import { Accordion } from "@homonoid/react";

export function Example() {
  return (
    <Accordion defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>What is Homonoid?</Accordion.Trigger>
        <Accordion.Content>
          A tactile design system built with continuous aesthetics and object continuity.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>How does motion work?</Accordion.Trigger>
        <Accordion.Content>
          Interactive surfaces respond with continuous easing and dynamic scale transitions.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Built with full keyboard navigation and comprehensive assistive technology support.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}`;

export function AccordionView() {
  const [variant, setVariant] = useState<"plain" | "outlined" | "contained">("plain");
  const [size, setSize] = useState<Size>("md");
  const [multiple, setMultiple] = useState(false);
  const [collapsible, setCollapsible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [showLeading, setShowLeading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Studio
      title="Accordion"
      description="Vertically stacked disclosure surfaces engineered with continuous motion physics and dimensional height stability. Delivers intuitive keyboard navigation and reliable assistive technology semantics across all expansion states."
      code={CODE_EXAMPLE}
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
        <Accordion.Item value="item-1">
          <Accordion.Trigger
            leading={cond(showLeading, <HelpCircle className="size-4 text-muted shrink-0" />, undefined)}
            description={cond(showDescription, "Tactile continuous aesthetics", undefined)}
          >
            What is Homonoid?
          </Accordion.Trigger>
          <Accordion.Content>
            A tactile design system built with continuous aesthetics and object continuity.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger
            leading={cond(showLeading, <Activity className="size-4 text-muted shrink-0" />, undefined)}
            description={cond(showDescription, "Dynamic scale transitions", undefined)}
          >
            How does motion work?
          </Accordion.Trigger>
          <Accordion.Content>
            Interactive surfaces respond with continuous easing and dynamic scale transitions.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger
            leading={cond(showLeading, <Shield className="size-4 text-muted shrink-0" />, undefined)}
            description={cond(showDescription, "Accessible keyboard semantics", undefined)}
          >
            Is it accessible?
          </Accordion.Trigger>
          <Accordion.Content>
            Built with full keyboard navigation and comprehensive assistive technology support.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Studio>
  );
}
