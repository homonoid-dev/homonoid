"use client";

import type { ReactNode, Ref } from "react";
import { cn } from "../../utils/cn";
import { all, any, cond, match, when } from "../../utils/condition";
import type { InputSize } from "./types";

export interface InputFloatingLabelProps {
  id: string;
  htmlFor: string;
  label?: ReactNode;
  required?: boolean;
  isFloating: boolean;
  isFloated: boolean;
  isFocused: boolean;
  isExpanded: boolean;
  isInvalid: boolean;
  disabled: boolean;
  size: InputSize;
  labelRef: Ref<HTMLLabelElement>;
}

export function InputFloatingLabel({
  id,
  htmlFor,
  label,
  required,
  isFloating,
  isFloated,
  isFocused,
  isExpanded,
  isInvalid,
  disabled,
  size,
  labelRef,
}: InputFloatingLabelProps) {
  const floatingLabelColor = cond(
    isInvalid,
    "text-destructive",
    cond(any(isFocused, isExpanded), "text-primary", "text-muted")
  );

  const restingLabelSize = match(
    size,
    {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    "text-sm"
  );

  const outlineMotionDuration = cond(
    isFloated,
    "duration-[var(--motion-duration-fast)]",
    "duration-500"
  );

  return when(
    all(isFloating, Boolean(label)),
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none z-10 flex items-center",
        "transform-gpu transition ease-[var(--motion-easing)] motion-reduce:transition-none",
        outlineMotionDuration,
        cond(isFloated, "-translate-y-1/2", "translate-y-0")
      )}
    >
      <div className="relative inline-grid items-center">
        <label
          ref={labelRef}
          id={id}
          htmlFor={htmlFor}
          data-slot="input-floating-label"
          data-floated={cond(isFloated, "true", "false")}
          className={cn(
            "col-start-1 row-start-1 inline-flex items-center rounded-xs truncate leading-normal origin-left",
            "transform-gpu antialiased font-normal",
            "transition ease-[var(--motion-easing)] motion-reduce:transition-none",
            outlineMotionDuration,
            restingLabelSize,
            floatingLabelColor,
            cond(isFloated, "scale-85", "scale-100"),
            cond(disabled, "opacity-50", undefined)
          )}
        >
          {label}
          {when(
            required,
            <span className="text-destructive ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      </div>
    </div>
  );
}

