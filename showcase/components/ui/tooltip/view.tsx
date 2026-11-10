"use client";

import { useMemo, useState } from "react";
import { Archive } from "lucide-react";
import {
  when,
  Button,
  Select,
  Tooltip,
  type TooltipAlign,
  type TooltipSide,
  type TooltipSize,
  type TooltipVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getTooltipCode } from "./model";

const SIDE_OPTIONS = [
  { value: "top", label: "Side: Top" },
  { value: "right", label: "Side: Right" },
  { value: "bottom", label: "Side: Bottom" },
  { value: "left", label: "Side: Left" },
];

const ALIGN_OPTIONS = [
  { value: "start", label: "Align: Start" },
  { value: "center", label: "Align: Center" },
  { value: "end", label: "Align: End" },
];

export function TooltipView() {
  const [variant, setVariant] = useState<TooltipVariant>("inverted");
  const [size, setSize] = useState<TooltipSize>("sm");
  const [side, setSide] = useState<TooltipSide>("top");
  const [align, setAlign] = useState<TooltipAlign>("center");
  const [showShortcut, setShowShortcut] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const code = useMemo(
    () =>
      getTooltipCode({
        variant,
        size,
        side,
        align,
        showShortcut,
        disabled,
      }),
    [
      variant,
      size,
      side,
      align,
      showShortcut,
      disabled,
    ]
  );

  return (
    <Studio
      title="Tooltip"
      description="Contextual microcopy overlay revealing keyboard accelerators and descriptive cues upon hover or focus without visual clutter."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["inverted", "surface", "primary"],
          onChange: setVariant,
        },
        size: {
          value: size,
          options: ["sm", "md"],
          onChange: setSize,
        },
        switches: [
          {
            id: "shortcut",
            label: "Keyboard Shortcut",
            description: "Display key accelerator",
            checked: showShortcut,
            onChange: setShowShortcut,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Inactivate tooltip presentation",
            checked: disabled,
            onChange: setDisabled,
          },
        ],
        children: (
          <div className="flex flex-col gap-3">
            <Select
              value={side}
              onValueChange={(val) => setSide(val as TooltipSide)}
              size="sm"
              placeholder="Side"
              options={SIDE_OPTIONS}
            />
            <Select
              value={align}
              onValueChange={(val) => setAlign(val as TooltipAlign)}
              size="sm"
              placeholder="Align"
              options={ALIGN_OPTIONS}
            />
          </div>
        ),
      }}
    >
      <div className="flex items-center justify-center p-16">
        <Tooltip
          variant={variant}
          size={size}
          side={side}
          align={align}
          disabled={disabled}
        >
          <Button
            variant="outlined"
            size="sm"
            layout="icon"
            aria-label="Archive conversation"
          >
            <Archive className="size-4" />
          </Button>
          <Tooltip.Content>
            Archive conversation
            {when(showShortcut, <Tooltip.Shortcut keyValue="command" content="E" />)}
          </Tooltip.Content>
        </Tooltip>
      </div>
    </Studio>
  );
}

