"use client";

import { useMemo, useState } from "react";
import {
  cond,
  when,
  Checkbox,
  Select,
  type CheckboxPlacement,
  type CheckboxRadius,
  type CheckboxSize,
  type Color,
  type Variant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getCheckboxCode } from "./model";

const PLACEMENT_OPTIONS = [
  { value: "trailing", label: "Placement: Trailing" },
  { value: "leading", label: "Placement: Leading" },
];

export function CheckboxView() {
  const [size, setSize] = useState<CheckboxSize>("md");
  const [radius, setRadius] = useState<CheckboxRadius>("md");
  const [checked, setChecked] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [tile, setTile] = useState(false);
  const [tileVariant, setTileVariant] = useState<Variant>("outlined");
  const [tileColor, setTileColor] = useState<Color>("surface");
  const [tilePlacement, setTilePlacement] = useState<CheckboxPlacement>("trailing");

  const code = useMemo(
    () =>
      getCheckboxCode({
        size,
        radius,
        checked,
        indeterminate,
        invalid,
        disabled,
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
      indeterminate,
      invalid,
      disabled,
      showDescription,
      tile,
      tileVariant,
      tileColor,
      tilePlacement,
    ]
  );

  return (
    <Studio
      title="Checkbox"
      description="Binary and tri-state selection control supporting affirmative selections, indeterminate parent summaries, accessible typography labels, and interactive tile containers."
      code={code}
      controls={{
        variant: cond(
          tile,
          {
            value: tileVariant,
            options: ["outlined", "contained", "plain"],
            onChange: setTileVariant,
          },
          undefined
        ),
        color: cond(
          tile,
          {
            value: tileColor,
            options: ["primary", "subtle", "surface", "destructive"],
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
          options: ["md", "full", "lg", "sm", "none"],
          onChange: setRadius,
        },
        switches: [
          {
            id: "checked",
            label: "Checked",
            description: "Affirmative selection state",
            checked,
            onChange: (val) => {
              setIndeterminate(false);
              setChecked(val);
            },
          },
          {
            id: "indeterminate",
            label: "Indeterminate",
            description: "Display mixed parent selection",
            checked: indeterminate,
            onChange: setIndeterminate,
          },
          {
            id: "description",
            label: "Description",
            description: "Show supporting guidance copy",
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
            onValueChange={(val) => setTilePlacement(val as CheckboxPlacement)}
            size="sm"
            placeholder="Control placement"
            options={PLACEMENT_OPTIONS}
          />
        ),
      }}
    >
      {cond(
        tile,
        <div className="w-full max-w-md">
          <Checkbox.Tile
            variant={tileVariant}
            color={tileColor}
            size={size}
            radius={radius}
            placement={tilePlacement}
            checked={cond(indeterminate, "indeterminate", checked)}
            disabled={disabled}
            invalid={invalid}
            label="Accept terms and conditions"
            description={when(
              showDescription,
              "You agree to our privacy policy and service terms."
            )}
            onChange={(next) => {
              setIndeterminate(false);
              setChecked(next);
            }}
          />
        </div>,
        <div className="flex items-center justify-center">
          <Checkbox
            size={size}
            radius={radius}
            checked={cond(indeterminate, "indeterminate", checked)}
            disabled={disabled}
            invalid={invalid}
            label="Accept terms and conditions"
            description={when(
              showDescription,
              "You agree to our privacy policy and service terms."
            )}
            onChange={(next) => {
              setIndeterminate(false);
              setChecked(next);
            }}
          />
        </div>
      )}
    </Studio>
  );
}

