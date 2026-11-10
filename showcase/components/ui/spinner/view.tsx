"use client";

import { useMemo, useState } from "react";
import {
  cond,
  Spinner,
  type SpinnerAnimation,
  type SpinnerColor,
  type SpinnerSize,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getSpinnerCode } from "./model";

export function SpinnerView() {
  const [animation, setAnimation] = useState<SpinnerAnimation>("border");
  const [size, setSize] = useState<SpinnerSize>("md");
  const [color, setColor] = useState<SpinnerColor>("primary");
  const [showLabel, setShowLabel] = useState(true);

  const code = useMemo(
    () =>
      getSpinnerCode({
        animation,
        size,
        color,
        showLabel,
      }),
    [animation, size, color, showLabel]
  );

  return (
    <Studio
      title="Spinner"
      description="Visual indicator communicating active background operations while preserving spatial continuity."
      code={code}
      controls={{
        variant: {
          value: animation,
          options: ["border", "grow", "orbit", "dash"],
          onChange: setAnimation,
        },
        color: {
          value: color,
          options: ["primary", "surface", "subtle", "destructive", "current"],
          onChange: setColor,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        switches: [
          {
            id: "label",
            label: "Accessibility Label",
            description: "Provide screen reader status description",
            checked: showLabel,
            onChange: setShowLabel,
          },
        ],
      }}
    >
      <div className="flex items-center justify-center p-12">
        <Spinner
          animation={animation}
          size={size}
          color={color}
          label={cond(showLabel, "Loading", "")}
        />
      </div>
    </Studio>
  );
}

