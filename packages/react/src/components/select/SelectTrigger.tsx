"use client";

import { forwardRef, type MouseEvent } from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useSelectContext } from "./SelectContext";
import { Tile } from "../tile/Tile";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { SelectTriggerProps } from "./types";

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ children, className, ...props }, ref) {
    const {
      open,
      triggerId,
      listboxId,
      labelId,
      descriptionId,
      disabled,
      invalid,
      size,
      radius,
      variant,
      color,
      setReference,
      getReferenceProps,
    } = useSelectContext();

    const mergedRef = useMergeRefs([setReference, ref]);

    const ariaProps = {
      id: triggerId,
      role: "combobox",
      "aria-expanded": open,
      "aria-haspopup": "listbox" as const,
      "aria-controls": cond(open, listboxId, undefined),
      "aria-labelledby": labelId,
      "aria-describedby": descriptionId,
      "data-state": cond(open, "open", "closed"),
      disabled,
      "aria-disabled": cond(disabled, true, undefined),
    };

    return (
      <Tile
        ref={mergedRef as React.Ref<HTMLElement>}
        as="button"
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        disabled={disabled}
        interactive={!disabled}
        trailing={
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 transition-transform duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] text-muted",
              cond(open, "rotate-180", "rotate-0")
            )}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        className={cn(
          "w-full justify-between font-normal text-left",
          cond(
            size === "sm",
            "h-control-sm py-0",
            cond(size === "lg", "h-control-lg py-0", "h-control-md py-0")
          ),
          cond(invalid, "border-destructive focus-visible:ring-destructive/50 text-destructive", ""),
          className
        )}
        {...getReferenceProps({
          ...ariaProps,
          ...props,
          onClick(event: MouseEvent<HTMLButtonElement>) {
            if (disabled) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            props.onClick?.(event);
          },
        })}
      >
        {children}
      </Tile>
    );
  }
);

SelectTrigger.displayName = "Select.Trigger";
