"use client";

import { useMemo, useState } from "react";
import {
  cond,
  Label,
  Progress,
  type ProgressColor,
  type ProgressSize,
  type ProgressVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getProgressCode } from "./model";

export function ProgressView() {
  const [variant, setVariant] = useState<ProgressVariant>("circular");
  const [size, setSize] = useState<ProgressSize>("md");
  const [color, setColor] = useState<ProgressColor>("primary");
  const [indeterminate, setIndeterminate] = useState(false);
  const [showValue, setShowValue] = useState(true);

  const value = cond(indeterminate, undefined, 65);

  const code = useMemo(
    () =>
      getProgressCode({
        variant,
        size,
        color,
        indeterminate,
        showValue,
      }),
    [variant, size, color, indeterminate, showValue]
  );

  return (
    <Studio
      title="Progress"
      description="Visual completion telemetry providing continuous spatial continuity and determinate measurement across sequential operations."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["circular", "linear"],
          onChange: setVariant,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        color: {
          value: color,
          options: ["primary", "surface", "subtle", "destructive", "current"],
          onChange: setColor,
        },
        switches: [
          {
            id: "indeterminate",
            label: "Indeterminate",
            description: "Display continuous sweep animation",
            checked: indeterminate,
            onChange: setIndeterminate,
          },
          {
            id: "value",
            label: "Metric Label",
            description: "Display numeric progress readout",
            checked: showValue,
            onChange: setShowValue,
            disabled: indeterminate,
          },
        ],
      }}
    >
      <div className="flex items-center justify-center p-8 w-full max-w-sm">
        {cond(
          variant === "linear",
          cond(
            showValue && !indeterminate,
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <Label size="sm">Uploading assets</Label>
                <span className="text-xs text-muted font-medium">65%</span>
              </div>
              <Progress variant="linear" size={size} color={color} value={value} />
            </div>,
            <div className="w-full">
              <Progress variant="linear" size={size} color={color} value={value} />
            </div>
          ),
          cond(
            showValue && !indeterminate,
            <div className="flex items-center gap-3">
              <Progress variant="circular" size={size} color={color} value={value} />
              <span className="text-sm text-muted font-medium">65%</span>
            </div>,
            <Progress variant="circular" size={size} color={color} value={value} />
          )
        )}
      </div>
    </Studio>
  );
}
