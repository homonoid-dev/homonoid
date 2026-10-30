import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Component,
  MousePointerClick,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItemModel } from "@/components/ui/toc";

export interface StepperSectionItem extends TocItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const STEPPER_SECTIONS: Record<string, StepperSectionItem> = {
  atomic: {
    id: "atomic-usage",
    label: "Atomic Usage",
    icon: Component,
  },
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  interactive: {
    id: "interactive-navigation",
    label: "Interactive Navigation",
    icon: MousePointerClick,
  },
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Infinity,
  },
  accessibility: {
    id: "accessibility",
    label: "Accessibility",
    icon: Accessibility,
  },
  tokens: {
    id: "design-tokens",
    label: "Design Tokens",
    icon: Palette,
  },
  styleReference: {
    id: "style-reference",
    label: "Style Reference",
    icon: BookOpen,
  },
};

export const STEPPER_SECTIONS_LIST: StepperSectionItem[] = Object.values(STEPPER_SECTIONS);

export const STEPPER_DEFAULT_CODE_SAMPLE = `import { Stepper } from "@homonoid/react";

export function Example() {
  const steps = [
    {
      value: 1,
      title: "Account",
      description: "Profile information",
      content: <div className="py-6 text-center text-sm">Account Settings Panel</div>,
    },
    {
      value: 2,
      title: "Billing",
      description: "Payment methods",
      content: <div className="py-6 text-center text-sm">Billing Details Panel</div>,
    },
    {
      value: 3,
      title: "Review",
      description: "Order verification",
      content: <div className="py-6 text-center text-sm">Order Review Panel</div>,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Stepper
        defaultValue={2}
        steps={steps}
      />
    </div>
  );
}`;

export const STEPPER_ATOMIC_CODE_SAMPLE = `import { Stepper } from "@homonoid/react";

export function Example() {
  const steps = [
    {
      value: 1,
      title: "Credentials",
      description: "Personal login credentials",
      content: <div className="py-6 text-center text-sm">Credentials Step View</div>,
    },
    {
      value: 2,
      title: "Preferences",
      description: "Application preferences",
      content: <div className="py-6 text-center text-sm">Preferences Step View</div>,
    },
    {
      value: 3,
      title: "Finished",
      description: "Complete setup process",
      content: <div className="py-6 text-center text-sm">Completion Step View</div>,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Stepper
        defaultValue={1}
        variant="circle"
        steps={steps}
      />
    </div>
  );
}`;

export const STEPPER_VARIANTS_CODE_SAMPLE = `import { Stepper } from "@homonoid/react";

export function Example() {
  const steps = [
    { value: 1, title: "User Details" },
    { value: 2, title: "Payment Info" },
    { value: 3, title: "Auth OTP" },
    { value: 4, title: "Preview Form" },
  ];

  return (
    <div className="w-full">
      <Stepper defaultValue={2} variant="bar">
        <Stepper.List className="grid grid-cols-4 gap-4">
          {steps.map((step) => (
            <Stepper.Item key={step.value} step={step.value}>
              <Stepper.Trigger className="group flex w-full flex-col items-start gap-3">
                <Stepper.Indicator className="h-1 w-full rounded-full transition-colors group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary group-data-[state=inactive]:bg-border" />
                <Stepper.Title className="text-sm font-medium transition-colors group-data-[state=active]:text-foreground group-data-[state=completed]:text-foreground group-data-[state=inactive]:text-foreground-muted">
                  {step.title}
                </Stepper.Title>
              </Stepper.Trigger>
            </Stepper.Item>
          ))}
        </Stepper.List>
        <Stepper.View className="py-8 text-center text-sm">
          Payment Info content
        </Stepper.View>
      </Stepper>
    </div>
  );
}`;

export const STEPPER_INTERACTIVE_CODE_SAMPLE = `import { useState } from "react";
import { Stepper, Button } from "@homonoid/react";

export function Example() {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    { value: 1, title: "Registration", description: "Account identity" },
    { value: 2, title: "Verification", description: "Identity check" },
    { value: 3, title: "Confirmation", description: "Final submission" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <Stepper value={currentStep} onValueChange={(val) => setCurrentStep(Number(val))}>
        <Stepper.List>
          {steps.map((step, index) => (
            <Stepper.Item key={step.value} step={step.value} className="relative flex-1">
              <Stepper.Trigger className="flex w-full flex-col items-start gap-2">
                <Stepper.Indicator />
                <div className="flex flex-col gap-0.5">
                  <Stepper.Title>{step.title}</Stepper.Title>
                  <Stepper.Description>{step.description}</Stepper.Description>
                </div>
              </Stepper.Trigger>
              {index < steps.length - 1 && <Stepper.Separator />}
            </Stepper.Item>
          ))}
        </Stepper.List>
        <Stepper.View className="py-6 text-center text-sm">
          Step {currentStep} Active Content
        </Stepper.View>
      </Stepper>
      <div className="flex justify-between items-center">
        <Button
          variant="outlined"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={currentStep === steps.length}
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}`;
