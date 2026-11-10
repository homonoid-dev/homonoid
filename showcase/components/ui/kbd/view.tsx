"use client";

import { useMemo, useState } from "react";
import {
  cond,
  Kbd,
  type KbdColor,
  type KbdRadius,
  type KbdSize,
  type KbdVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getKbdCode } from "./model";

export function KbdView() {
  const [variant, setVariant] = useState<KbdVariant>("contained");
  const [color, setColor] = useState<KbdColor>("surface");
  const [size, setSize] = useState<KbdSize>("md");
  const [radius, setRadius] = useState<KbdRadius>("sm");
  const [compound, setCompound] = useState(false);
  const [multiKey, setMultiKey] = useState(false);

  const code = useMemo(
    () =>
      getKbdCode({
        variant,
        color,
        size,
        radius,
        compound,
        multiKey,
      }),
    [variant, color, size, radius, compound, multiKey]
  );

  return (
    <Studio
      title="Kbd"
      description="Keyboard shortcut keycaps communicating executable tactile hotkeys and assistive key identifiers across toolbars, dialogs, and menus."
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
          options: ["none", "sm", "md", "lg", "full"],
          onChange: setRadius,
        },
        switches: [
          {
            id: "compound",
            label: "Compound Architecture",
            description: "Compose Abbr and Content subprimitives",
            checked: compound,
            onChange: setCompound,
          },
          {
            id: "multiKey",
            label: "Key Combination",
            description: "Display multistep modifier sequence",
            checked: multiKey,
            onChange: setMultiKey,
          },
        ],
      }}
    >
      <div className="flex items-center justify-center p-8">
        {cond(
          compound,
          cond(
            multiKey,
            <Kbd variant={variant} color={color} size={size} radius={radius}>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>P</Kbd.Content>
            </Kbd>,
            <Kbd variant={variant} color={color} size={size} radius={radius}>
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>K</Kbd.Content>
            </Kbd>
          ),
          cond(
            multiKey,
            <Kbd
              variant={variant}
              color={color}
              size={size}
              radius={radius}
              keyValue={["command", "shift"]}
              content="P"
            />,
            <Kbd
              variant={variant}
              color={color}
              size={size}
              radius={radius}
              keyValue="command"
              content="K"
            />
          )
        )}
      </div>
    </Studio>
  );
}

