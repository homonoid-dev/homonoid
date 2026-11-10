"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Sliders } from "lucide-react";
import {
  cond,
  Tile,
  type TileColor,
  type TileRadius,
  type TileSize,
  type TileVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getTileCode } from "./model";

export function TileView() {
  const [variant, setVariant] = useState<TileVariant>("outlined");
  const [color, setColor] = useState<TileColor>("surface");
  const [size, setSize] = useState<TileSize>("md");
  const [radius, setRadius] = useState<TileRadius>("lg");
  const [interactive, setInteractive] = useState(true);
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showLeading, setShowLeading] = useState(true);
  const [showTrailing, setShowTrailing] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  const code = useMemo(
    () =>
      getTileCode({
        variant,
        color,
        size,
        radius,
        interactive,
        selected,
        disabled,
        showLeading,
        showTrailing,
        showDescription,
      }),
    [
      variant,
      color,
      size,
      radius,
      interactive,
      selected,
      disabled,
      showLeading,
      showTrailing,
      showDescription,
    ]
  );

  return (
    <Studio
      title="Tile"
      description="Structured horizontal list container providing leading visual anchors, continuous content alignment, and interactive trailing accessory slots."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["outlined", "contained", "plain"],
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
            id: "interactive",
            label: "Interactive",
            description: "Enable tactile hover and press gestures",
            checked: interactive,
            onChange: setInteractive,
          },
          {
            id: "selected",
            label: "Selected",
            description: "Display affirmative selected state",
            checked: selected,
            onChange: setSelected,
          },
          {
            id: "leading",
            label: "Leading Icon",
            description: "Display contextual visual glyph",
            checked: showLeading,
            onChange: setShowLeading,
          },
          {
            id: "trailing",
            label: "Trailing Accessory",
            description: "Display navigation chevron",
            checked: showTrailing,
            onChange: setShowTrailing,
          },
          {
            id: "description",
            label: "Description",
            description: "Display supporting guidance copy",
            checked: showDescription,
            onChange: setShowDescription,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Inactivate pointer interactions",
            checked: disabled,
            onChange: setDisabled,
          },
        ],
      }}
    >
      <div className="w-full max-w-md p-6">
        <Tile
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          interactive={interactive}
          selected={selected}
          disabled={disabled}
          label="Security Preferences"
          description={cond(
            showDescription,
            "Configure verification credentials and device access.",
            undefined
          )}
          leading={cond(
            showLeading,
            <Sliders className="size-4" />,
            undefined
          )}
          trailing={cond(
            showTrailing,
            <ChevronRight className="size-4 text-muted" />,
            undefined
          )}
          onClick={cond(
            interactive && !disabled,
            () => setSelected((prev) => !prev),
            undefined
          )}
        />
      </div>
    </Studio>
  );
}

