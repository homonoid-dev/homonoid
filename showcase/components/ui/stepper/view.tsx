"use client";

import { useState } from "react";
import { Stepper, Button, Description } from "@homonoid/react";
import { Exhibit } from "@/components/ui/exhibit";
import {
  STEPPER_SECTIONS,
  STEPPER_SECTIONS_LIST,
  STEPPER_DEFAULT_CODE_SAMPLE,
  STEPPER_ATOMIC_CODE_SAMPLE,
  STEPPER_VARIANTS_CODE_SAMPLE,
  STEPPER_INTERACTIVE_CODE_SAMPLE,
} from "./model";

export function StepperView() {
  const sections = STEPPER_SECTIONS;
  const [currentStep, setCurrentStep] = useState(2);

  const defaultSteps = [
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

  const atomicSteps = [
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

  const barSteps = [
    { value: 1, title: "User Details" },
    { value: 2, title: "Payment Info" },
    { value: 3, title: "Auth OTP" },
    { value: 4, title: "Preview Form" },
  ];

  const interactiveSteps = [
    { value: 1, title: "Registration", description: "Account identity" },
    { value: 2, title: "Verification", description: "Identity check" },
    { value: 3, title: "Confirmation", description: "Final submission" },
  ];

  return (
    <Exhibit
      title="Stepper"
      summary="A stepper coordinates sequential multistep progression using interactive milestone checkpoints, contextual titles, and synchronized view panels."
      description="Homonoid steppers support both zero boilerplate atomic declarations and fully composable compound subcomponents with native keyboard navigation and fluid state transitions."
      component="stepper"
      importCode='import { Stepper } from "@homonoid/react";'
      defaultCode={STEPPER_DEFAULT_CODE_SAMPLE}
      defaultStage={
        <div className="w-full max-w-xl">
          <Stepper
            defaultValue={2}
            steps={defaultSteps}
          />
        </div>
      }
      sections={STEPPER_SECTIONS_LIST}
    >
      {/* Atomic Usage Section */}
      <Exhibit.Stage section={sections.atomic} code={STEPPER_ATOMIC_CODE_SAMPLE}>
        <div className="w-full max-w-xl">
          <Stepper
            defaultValue={1}
            variant="circle"
            steps={atomicSteps}
          />
        </div>
      </Exhibit.Stage>

      {/* Variants Section */}
      <Exhibit.Stage section={sections.variants} code={STEPPER_VARIANTS_CODE_SAMPLE}>
        <div className="w-full max-w-xl">
          <Stepper defaultValue={2} variant="bar">
            <Stepper.List className="grid grid-cols-4 gap-4">
              {barSteps.map((step) => (
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
      </Exhibit.Stage>

      {/* Interactive Navigation Section */}
      <Exhibit.Stage section={sections.interactive} code={STEPPER_INTERACTIVE_CODE_SAMPLE}>
        <div className="w-full max-w-xl flex flex-col gap-6">
          <Stepper value={currentStep} onValueChange={(val) => setCurrentStep(Number(val))}>
            <Stepper.List>
              {interactiveSteps.map((step, index) => (
                <Stepper.Item key={step.value} step={step.value} className="relative flex-1">
                  <Stepper.Trigger className="flex w-full flex-col items-start gap-2">
                    <Stepper.Indicator />
                    <div className="flex flex-col gap-0.5">
                      <Stepper.Title>{step.title}</Stepper.Title>
                      <Stepper.Description>{step.description}</Stepper.Description>
                    </div>
                  </Stepper.Trigger>
                  {index < interactiveSteps.length - 1 && <Stepper.Separator />}
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
              disabled={currentStep === interactiveSteps.length}
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Exhibit.Stage>

      {/* Object Continuity Section */}
      <Exhibit.Section section={sections.continuity}>
        <Description>
          Indicator dimensions and touch targets remain dimensionally stable throughout active, completed, and resting states without layout shifting or jitter.
        </Description>
        <Description>
          Status transitions crossfade background colors, border strokes, and icon glyphs smoothly using tokens calibrated for smooth continuity.
        </Description>
        <Description>
          Content panels preserve baseline spacing during active step changes, preventing vertical content jumping across stages.
        </Description>
      </Exhibit.Section>

      {/* Accessibility Section */}
      <Exhibit.Section section={sections.accessibility}>
        <Description>
          Stepper navigation landmarks render as accessible ordered lists with appropriate programmatic labels.
        </Description>
        <Description>
          The active milestone applies aria current step attributes to inform screen reader technologies of current user positioning.
        </Description>
        <Description>
          Native keyboard navigation allows users to traverse milestones using arrow keys and activate steps using Enter or Space.
        </Description>
      </Exhibit.Section>

      {/* Design Tokens Section */}
      <Exhibit.Section section={sections.tokens}>
        <Description>
          Circular indicators consume standardized spatial control dimensions and full radius geometry tokens.
        </Description>
        <Description>
          Step titles and descriptions inherit typography weights and leading tokens directly from Label and Description primitives under the hood.
        </Description>
        <Description>
          Milestone lifecycle states adapt to semantic primary, subtle, surface, and destructive color palettes across light and dark modes.
        </Description>
      </Exhibit.Section>

      {/* Style Reference Section */}
      <Exhibit.Section section={sections.styleReference}>
        <Description>
          Developers can declare linear or non linear workflows through simple properties or build custom step layouts using dot notation primitives.
        </Description>
        <Description>
          The component exposes Stepper.List, Stepper.Item, Stepper.Trigger, Stepper.Indicator, Stepper.Title, Stepper.Description, Stepper.Separator, and Stepper.View for complete layout flexibility.
        </Description>
      </Exhibit.Section>
    </Exhibit>
  );
}

