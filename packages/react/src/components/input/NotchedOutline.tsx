"use client";

import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";

export interface NotchedOutlineProps {
  isOutlined: boolean;
  isFloated: boolean;
  isFocused: boolean;
  isInvalid: boolean;
  disabled: boolean;
  clipPath?: string;
}

export function NotchedOutline({
  isOutlined,
  isFloated,
  isFocused,
  isInvalid,
  disabled,
  clipPath,
}: NotchedOutlineProps) {
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

  const outlineMotionDuration = cond(
    isFloated,
    "duration-[var(--motion-duration-fast)]",
    "duration-500"
  );

  return when(
    isOutlined,
    <div
      aria-hidden="true"
      style={{ clipPath }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border z-10",
        "transition-[clip-path,border-color] ease-[var(--motion-easing)] motion-reduce:transition-none",
        outlineMotionDuration,
        outlineBorderColor
      )}
    />
  );
}

