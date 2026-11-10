"use client";

import { useMemo, useState } from "react";
import {
  when,
  Button,
  Description,
  Popover,
  Select,
  type PopoverAlign,
  type PopoverSide,
  type PopoverSize,
  type PopoverVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getPopoverCode } from "./model";

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

export function PopoverView() {
  const [size, setSize] = useState<PopoverSize>("md");
  const [variant, setVariant] = useState<PopoverVariant>("surface");
  const [side, setSide] = useState<PopoverSide>("bottom");
  const [align, setAlign] = useState<PopoverAlign>("center");
  const [showActions, setShowActions] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  const code = useMemo(
    () =>
      getPopoverCode({
        size,
        variant,
        side,
        align,
        showActions,
        showDescription,
      }),
    [size, variant, side, align, showActions, showDescription]
  );

  return (
    <Studio
      title="Popover"
      description="Transient floating container anchored to interactive triggers, revealing contextual details, actions, and custom form surfaces."
      code={code}
      controls={{
        size: {
          value: size,
          options: ["sm", "md", "lg", "auto"],
          onChange: setSize,
        },
        variant: {
          value: variant,
          options: ["surface", "primary", "inverted"],
          onChange: setVariant,
        },
        switches: [
          {
            id: "description",
            label: "Description",
            description: "Show supportive deployment details",
            checked: showDescription,
            onChange: setShowDescription,
          },
          {
            id: "actions",
            label: "Action Buttons",
            description: "Render contextual button options",
            checked: showActions,
            onChange: setShowActions,
          },
        ],
        children: (
          <div className="flex flex-col gap-3">
            <Select
              value={side}
              onValueChange={(val) => setSide(val as PopoverSide)}
              size="sm"
              placeholder="Side"
              options={SIDE_OPTIONS}
            />
            <Select
              value={align}
              onValueChange={(val) => setAlign(val as PopoverAlign)}
              size="sm"
              placeholder="Align"
              options={ALIGN_OPTIONS}
            />
          </div>
        ),
      }}
    >
      <div className="flex items-center justify-center p-16">
        <Popover size={size} variant={variant} side={side} align={align}>
          <Button variant="contained">View Details</Button>
          <Popover.Content className="max-w-xs">
            <Popover.Dialog>
              <Popover.Heading>Branch Deployment</Popover.Heading>
              {when(
                showDescription,
                <Description size="sm" className="mt-1">
                  Preview instance deployed at feature branch commit 4b29f0c.
                </Description>
              )}
              {when(
                showActions,
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outlined">
                    Dismiss
                  </Button>
                  <Button size="sm" variant="contained">
                    Inspect
                  </Button>
                </div>
              )}
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      </div>
    </Studio>
  );
}
