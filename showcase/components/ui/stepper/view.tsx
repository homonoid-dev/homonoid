"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Stepper,
  type Color,
  type Size,
  type StepperVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getStepperCode } from "./model";

export function StepperView() {
  const [variant, setVariant] = useState<StepperVariant>("circle");
  const [size, setSize] = useState<Size>("md");
  const [color, setColor] = useState<Color>("primary");
  const [linear, setLinear] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [activeStep, setActiveStep] = useState(2);

  const steps = useMemo(
    () => [
      {
        value: 1,
        title: "Account",
        ...(showDescriptions ? { description: "Profile credentials" } : {}),
      },
      {
        value: 2,
        title: "Workspace",
        ...(showDescriptions ? { description: "Cluster configuration" } : {}),
      },
      {
        value: 3,
        title: "Review",
        ...(showDescriptions ? { description: "Verify deployment" } : {}),
      },
    ],
    [showDescriptions]
  );

  const code = useMemo(
    () =>
      getStepperCode({
        variant,
        size,
        color,
        linear,
        showDescriptions,
        activeStep,
      }),
    [
      variant,
      size,
      color,
      linear,
      showDescriptions,
      activeStep,
    ]
  );

  return (
    <Studio
      title="Stepper"
      description="Sequential multistep progress navigation decomposed into manageable milestones with interactive checkpoint navigation."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["circle", "bar"],
          onChange: setVariant,
        },
        color: {
          value: color,
          options: ["primary", "subtle", "surface", "destructive"],
          onChange: setColor,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        switches: [
          {
            id: "linear",
            label: "Linear Flow",
            description: "Enforce sequential milestone progression",
            checked: linear,
            onChange: setLinear,
          },
          {
            id: "descriptions",
            label: "Descriptions",
            description: "Display supporting milestone details",
            checked: showDescriptions,
            onChange: setShowDescriptions,
          },
        ],
      }}
    >
      <div className="w-full max-w-xl flex flex-col gap-8 p-6">
        <Stepper
          value={activeStep}
          onValueChange={(val) => setActiveStep(Number(val))}
          variant={variant}
          size={size}
          color={color}
          linear={linear}
          steps={steps}
        />
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="outlined"
            size="sm"
            disabled={activeStep <= 1}
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            size="sm"
            disabled={activeStep >= 3}
            onClick={() => setActiveStep((prev) => Math.min(3, prev + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </Studio>
  );
}
