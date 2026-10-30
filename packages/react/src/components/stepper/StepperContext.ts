"use client";

import { createContext, useContext } from "react";
import type { Size, Color } from "../../types";
import type {
  StepperIndicators,
  StepperOrientation,
  StepperVariant,
} from "./types";

export interface StepperContextValue {
  value: number | string;
  setValue: (value: number | string) => void;
  orientation: StepperOrientation;
  variant: StepperVariant;
  color: Color;
  size: Size;
  linear: boolean;
  indicators?: StepperIndicators;
  stepValues: Array<number | string>;
  registerStep: (step: number | string) => () => void;
}

export const StepperContext = createContext<StepperContextValue | null>(null);

export function useStepperContext(): StepperContextValue {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error(
      "Stepper compound components must be rendered within a <Stepper> provider."
    );
  }
  return context;
}

