"use client";

import { useMemo, useState } from "react";
import {
  cond,
  when,
  Select,
  Switch,
  type Color,
  type Radius,
  type Size,
  type SwitchPlacement,
  type Variant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getSwitchCode } from "./model";

const PLACEMENT_OPTIONS = [
  { value: "trailing", label: "Placement: Trailing" },
  { value: "leading", label: "Placement: Leading" },
];

export function SwitchView() {
  const [size, setSize] = useState<Size>("md");
  const [radius, setRadius] = useState<Radius>("full");
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [tile, setTile] = useState(false);
  const [tileVariant, setTileVariant] = useState<Variant>("outlined");
  const [tileColor, setTileColor] = useState<Color>("surface");
  const [tilePlacement, setTilePlacement] = useState<SwitchPlacement>("trailing");

  const code = useMemo(
    () =>
      getSwitchCode({
        size,
        radius,
        checked,
        disabled,
        invalid,
        showDescription,
        tile,
        tileVariant,
        tileColor,
        tilePlacement,
      }),
    [
      size,
      radius,
      checked,
      disabled,
      invalid,
      showDescription,
      tile,
      tileVariant,
      tileColor,
      tilePlacement,
    ]
  );

  return (
    <Studio
      title="Switch"
      description="Interactive binary toggle communicating immediate preference activation across standalone inputs and structured tile rows."
      code={code}
      controls={{
        variant: cond(
          tile,
          {
            value: tileVariant,
            options: ["contained", "outlined", "plain"],
            onChange: setTileVariant,
          },
          undefined
        ),
        color: cond(
          tile,
          {
            value: tileColor,
            options: ["surface", "subtle", "primary", "destructive"],
            onChange: setTileColor,
          },
          undefined
        ),
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
            id: "checked",
            label: "Checked",
            description: "Affirmative active toggle state",
            checked,
            onChange: setChecked,
          },
          {
            id: "description",
            label: "Description",
            description: "Display supporting guidance copy",
            checked: showDescription,
            onChange: setShowDescription,
          },
          {
            id: "invalid",
            label: "Invalid",
            description: "Display validation error state",
            checked: invalid,
            onChange: setInvalid,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Disable interactive gestures",
            checked: disabled,
            onChange: setDisabled,
          },
          {
            id: "tile",
            label: "Tile Container",
            description: "Wrap inside interactive tile",
            checked: tile,
            onChange: setTile,
          },
        ],
        children: when(
          tile,
          <Select
            value={tilePlacement}
            onValueChange={(val) => setTilePlacement(val as SwitchPlacement)}
            size="sm"
            placeholder="Control placement"
            options={PLACEMENT_OPTIONS}
          />
        ),
      }}
    >
      {cond(
        tile,
        <div className="w-full max-w-md p-6">
          <Switch.Tile
            variant={tileVariant}
            color={tileColor}
            size={size}
            radius={radius}
            placement={tilePlacement}
            checked={checked}
            disabled={disabled}
            invalid={invalid}
            label="Airplane Mode"
            description={when(
              showDescription,
              "Disable all wireless connections and network radios."
            )}
            onChange={setChecked}
          />
        </div>,
        <div className="flex items-center justify-center p-12">
          <Switch
            size={size}
            radius={radius}
            checked={checked}
            disabled={disabled}
            invalid={invalid}
            label="Airplane Mode"
            description={when(
              showDescription,
              "Disable all wireless connections and network radios."
            )}
            onChange={setChecked}
          />
        </div>
      )}
    </Studio>
  );
}

