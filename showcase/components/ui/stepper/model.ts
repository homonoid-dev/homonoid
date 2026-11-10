import type { Color, Size, StepperOrientation, StepperVariant } from "@homonoid/react";

export interface StepperCodeOptions {
  orientation: StepperOrientation;
  variant: StepperVariant;
  size: Size;
  color: Color;
  linear: boolean;
  showDescriptions: boolean;
  activeStep: number;
}

export function getStepperCode(options: StepperCodeOptions): string {
  const {
    orientation,
    variant,
    size,
    color,
    linear,
    showDescriptions,
    activeStep,
  } = options;

  const props: string[] = [];

  if (orientation !== "horizontal") {
    props.push(`orientation="${orientation}"`);
  }
  if (variant !== "circle") {
    props.push(`variant="${variant}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (color !== "primary") {
    props.push(`color="${color}"`);
  }
  if (linear) {
    props.push("linear");
  }

  props.push("value={activeStep}");
  props.push("onValueChange={(val) => setActiveStep(Number(val))}");
  props.push("steps={steps}");

  const stepsCode = [
    "const steps = [",
    `  { value: 1, title: "Account"${showDescriptions ? ', description: "Profile credentials"' : ""} },`,
    `  { value: 2, title: "Workspace"${showDescriptions ? ', description: "Cluster configuration"' : ""} },`,
    `  { value: 3, title: "Review"${showDescriptions ? ', description: "Verify deployment"' : ""} },`,
    "];",
  ].join("\n");

  const propsString = props.map((p) => `\n        ${p}`).join("");

  return [
    'import { useState } from "react";',
    'import { Stepper, Button } from "@homonoid/react";',
    "",
    stepsCode,
    "",
    "export function Example() {",
    `  const [activeStep, setActiveStep] = useState(${activeStep});`,
    "",
    "  return (",
    `    <div className="w-full ${orientation === "vertical" ? "max-w-md" : "max-w-xl"} flex flex-col gap-8 p-6">`,
    `      <Stepper${propsString}`,
    "      />",
    '      <div className="flex items-center justify-between pt-4 border-t border-border">',
    "        <Button",
    '          variant="outlined"',
    '          size="sm"',
    "          disabled={activeStep <= 1}",
    "          onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}",
    "        >",
    "          Previous",
    "        </Button>",
    "        <Button",
    '          variant="contained"',
    '          size="sm"',
    "          disabled={activeStep >= 3}",
    "          onClick={() => setActiveStep((prev) => Math.min(3, prev + 1))}",
    "        >",
    "          Next",
    "        </Button>",
    "      </div>",
    "    </div>",
    "  );",
    "}",
  ].join("\n");
}

