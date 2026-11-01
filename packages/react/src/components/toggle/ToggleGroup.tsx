"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";
import { cva } from "class-variance-authority";
import { useMergeRefs } from "@floating-ui/react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import {
  ToggleGroupContext,
  type ToggleGroupContextValue,
} from "./ToggleGroupContext";
import type { ToggleGroupProps } from "./types";

const groupVariants = cva(
  "inline-flex items-center justify-center isolate",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      variant: {
        contained: "gap-1 p-1 bg-surface border border-border",
        outlined: "gap-1",
        plain: "gap-1",
      },
      docked: {
        true: "",
        false: "",
      },
      radius: {
        none: "rounded-none [&>[data-slot=toggle]]:rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      {
        docked: true,
        orientation: "horizontal",
        className:
          "-space-x-px gap-0 [&>[data-slot=toggle]]:rounded-none [&>[data-slot=toggle]:first-child]:rounded-l-[inherit] [&>[data-slot=toggle]:last-child]:rounded-r-[inherit] [&>[data-slot=toggle]:focus-visible]:z-10",
      },
      {
        docked: true,
        orientation: "vertical",
        className:
          "-space-y-px -space-x-0 gap-0 [&>[data-slot=toggle]]:rounded-none [&>[data-slot=toggle]:first-child]:rounded-t-[inherit] [&>[data-slot=toggle]:last-child]:rounded-b-[inherit] [&>[data-slot=toggle]:focus-visible]:z-10",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "plain",
      docked: false,
      radius: "md",
    },
  }
);

function normalizeValues(val: string | string[] | undefined): string[] {
  if (val === undefined || val === null) {
    return [];
  }
  if (Array.isArray(val)) {
    return val;
  }
  return [val];
}

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup(
    {
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = "plain",
      color = "surface",
      size = "md",
      radius = "md",
      orientation = "horizontal",
      disabled = false,
      rovingFocus = true,
      docked = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() =>
      normalizeValues(defaultValue)
    );

    const activeValues = useMemo(
      () =>
        cond(
          isControlled,
          normalizeValues(controlledValue),
          uncontrolledValue
        ),
      [isControlled, controlledValue, uncontrolledValue]
    );

    const internalRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs([internalRef, ref]);

    const handleItemToggle = useCallback(
      (itemValue: string) => {
        if (disabled) return;

        if (type === "single") {
          const isSelected = activeValues.includes(itemValue);
          const nextValues = cond(isSelected, [], [itemValue]);
          const nextValue = cond(isSelected, "", itemValue);

          if (!isControlled) {
            setUncontrolledValue(nextValues);
          }
          onValueChange?.(nextValue);
        } else {
          const isSelected = activeValues.includes(itemValue);
          const nextValues = cond(
            isSelected,
            activeValues.filter((v) => v !== itemValue),
            [...activeValues, itemValue]
          );

          if (!isControlled) {
            setUncontrolledValue(nextValues);
          }
          onValueChange?.(nextValues);
        }
      },
      [disabled, type, activeValues, isControlled, onValueChange]
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        if (!rovingFocus) return;
        const container = internalRef.current;
        if (!container) return;

        const items = Array.from(
          container.querySelectorAll<HTMLButtonElement>(
            'button[data-slot="toggle"]:not([disabled]):not([aria-disabled="true"])'
          )
        );

        if (items.length === 0) return;

        const currentIndex = items.indexOf(event.currentTarget);
        if (currentIndex === -1) return;

        let targetIndex = -1;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          targetIndex = (currentIndex + 1) % items.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          targetIndex = (currentIndex - 1 + items.length) % items.length;
        } else if (event.key === "Home") {
          event.preventDefault();
          targetIndex = 0;
        } else if (event.key === "End") {
          event.preventDefault();
          targetIndex = items.length - 1;
        }

        if (targetIndex >= 0 && items[targetIndex]) {
          items[targetIndex].focus();
        }
      },
      [rovingFocus]
    );

    const contextValue: ToggleGroupContextValue = useMemo(
      () => ({
        type,
        value: activeValues,
        onItemToggle: handleItemToggle,
        variant,
        color,
        size,
        radius,
        orientation,
        disabled,
        rovingFocus,
        handleKeyDown,
      }),
      [
        type,
        activeValues,
        handleItemToggle,
        variant,
        color,
        size,
        radius,
        orientation,
        disabled,
        rovingFocus,
        handleKeyDown,
      ]
    );

    const role = cond(type === "single", "radiogroup", "group");

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <div
          ref={mergedRef}
          role={role}
          aria-orientation={orientation}
          data-slot="toggle-group"
          data-orientation={orientation}
          data-variant={variant}
          className={cn(
            groupVariants({ orientation, variant, docked, radius }),
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "Toggle.Group";
