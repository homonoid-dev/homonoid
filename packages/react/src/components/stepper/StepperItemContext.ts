"use client";

import { createContext, useContext } from "react";
import type { StepperState } from "./types";

export interface StepperItemContextValue {
  step: number | string;
  index: number;
  state: StepperState;
  disabled: boolean;
  isCompleted: boolean;
  isActive: boolean;
  isUpcoming: boolean;
  titleId: string;
  descriptionId: string;
}

export const StepperItemContext =
  createContext<StepperItemContextValue | null>(null);

export function useStepperItemContext(): StepperItemContextValue {
  const context = useContext(StepperItemContext);
  if (!context) {
    throw new Error(
      "Stepper milestone components must be rendered within a <Stepper.Item> provider."
    );
  }
  return context;
}

