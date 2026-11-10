"use client";

import { useMemo, useState } from "react";
import { Bold, Italic, Pin, Underline } from "lucide-react";
import {
  cond,
  Toggle,
  type ToggleColor,
  type ToggleRadius,
  type ToggleSize,
  type ToggleVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getToggleCode } from "./model";

export function ToggleView() {
  const [variant, setVariant] = useState<ToggleVariant>("contained");
  const [color, setColor] = useState<ToggleColor>("surface");
  const [size, setSize] = useState<ToggleSize>("md");
  const [radius, setRadius] = useState<ToggleRadius>("lg");
  const [group, setGroup] = useState(true);
  const [docked, setDocked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  const code = useMemo(
    () =>
      getToggleCode({
        variant,
        color,
        size,
        radius,
        group,
        docked,
        disabled,
        pressed,
      }),
    [
      variant,
      color,
      size,
      radius,
      group,
      docked,
      disabled,
      pressed,
    ]
  );

  return (
    <Studio
      title="Toggle"
      description="Two state interactive control communicating persistent activation states across standalone icons and connected toolbar groupings."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["contained", "outlined", "plain"],
          onChange: setVariant,
        },
        color: {
          value: color,
          options: ["surface", "subtle", "primary", "destructive"],
          onChange: setColor,
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
            id: "group",
            label: "Group Container",
            description: "Combine multiple toggles into toolbar",
            checked: group,
            onChange: setGroup,
          },
          {
            id: "docked",
            label: "Docked Segments",
            description: "Join adjacent toggle borders",
            checked: docked,
            onChange: setDocked,
            disabled: !group,
          },
          {
            id: "pressed",
            label: "Pressed",
            description: "Toggle active pressed state",
            checked: pressed,
            onChange: setPressed,
            disabled: group,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Inactivate interaction",
            checked: disabled,
            onChange: setDisabled,
          },
        ],
      }}
    >
      <div className="flex items-center justify-center p-12">
        {cond(
          group,
          <Toggle.Group
            type="multiple"
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            docked={docked}
            disabled={disabled}
          >
            <Toggle.Item value="bold" aria-label="Toggle bold">
              <Bold className="size-4" />
            </Toggle.Item>
            <Toggle.Item value="italic" aria-label="Toggle italic">
              <Italic className="size-4" />
            </Toggle.Item>
            <Toggle.Item value="underline" aria-label="Toggle underline">
              <Underline className="size-4" />
            </Toggle.Item>
          </Toggle.Group>,
          <Toggle
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            pressed={pressed}
            onPressedChange={setPressed}
            disabled={disabled}
            aria-label="Toggle pin"
          >
            <Pin className="size-4" />
          </Toggle>
        )}
      </div>
    </Studio>
  );
}

