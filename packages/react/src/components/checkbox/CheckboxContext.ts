"use client";

import { createContext, useContext, type ChangeEvent } from "react";
import type { CheckboxRadius, CheckboxSize } from "./types";

export interface CheckboxContextValue {
  isChecked: boolean;
  isIndeterminate: boolean;
  currentState: "unchecked" | "checked" | "indeterminate";
  disabled: boolean;
  invalid: boolean;
  size: CheckboxSize;
  radius: CheckboxRadius;
  inputId: string;
  labelId: string;
  descriptionId: string;
  inputRef: (element: HTMLInputElement | null) => void;
  inputProps: Record<string, unknown>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxContext = createContext<CheckboxContextValue | null>(null);

export function useCheckboxContext(): CheckboxContextValue {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      "Checkbox compound components must be rendered within a <Checkbox> component."
    );
  }
  return context;
}
