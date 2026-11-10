"use client";

import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";

export interface InputNotchedOutlineProps {
  isOutlined: boolean;
  isFloated: boolean;
  isFocused: boolean;
  isInvalid: boolean;
  disabled: boolean;
  clipPath?: string;
}

export function InputNotchedOutline({
  isOutlined,
  isFloated,
  isFocused,
  isInvalid,
  disabled,
  clipPath,
}: InputNotchedOutlineProps) {
  const outlineBorderColor = cond(
    isInvalid,
    "border-destructive group-hover:border-destructive",
    cond(
      disabled,
      "border-border opacity-50",
      cond(
        isFocused,
        "border-primary group-hover:border-primary",
        "border-border group-hover:border-foreground/30 group-focus-within:border-primary group-focus-within:group-hover:border-primary"
      )
    )
  );

  const clipPathDuration = cond(
    isFloated,
    "var(--motion-duration-fast)",
    "var(--motion-duration-normal)"
  );

  return when(
    isOutlined,
    <div
      aria-hidden="true"
      style={{
        clipPath,
        transition: `clip-path ${clipPathDuration} var(--motion-easing), border-color var(--motion-duration-fast) var(--motion-easing)`,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border z-10 motion-reduce:transition-none",
        outlineBorderColor
      )}
    />
  );
}

