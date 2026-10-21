"use client";

import {
  forwardRef,
  cloneElement,
  isValidElement,
  Children,
  type MouseEvent,
  type ReactElement,
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "../../utils/cn";
import { all, cond } from "../../utils/condition";
import type { DropdownTriggerProps } from "./types";

export const DropdownTrigger = forwardRef<HTMLElement, DropdownTriggerProps>(
  function DropdownTrigger({ children, asChild = false, className, ...props }, ref) {
    const { setReference, getReferenceProps, open, menuId, triggerId, disabled } =
      useDropdownContext();

    const ariaProps = {
      id: triggerId,
      "aria-haspopup": "menu" as const,
      "aria-expanded": open,
      "aria-controls": cond(open, menuId, undefined),
      "data-state": cond(open, "open", "closed"),
      disabled,
      "aria-disabled": cond(disabled, true, undefined),
    };

    const childList = Children.toArray(children);
    const hasSingleElement = all(childList.length === 1, isValidElement(childList[0]));
    const shouldClone = cond(asChild, true, cond(isValidElement(children), true, hasSingleElement));

    if (shouldClone) {
      const child = cond(isValidElement(children), children, childList[0]) as ReactElement<Record<string, unknown>>;
      const childRef = (child.props as { ref?: React.Ref<HTMLElement> })?.ref;
      const mergedRef = useMergeRefs([setReference, ref, childRef]);
      const referenceProps = getReferenceProps({
        ...ariaProps,
        ...child.props,
        ...props,
        className: cn(child.props.className as string | undefined, className),
        onClick(event: MouseEvent<HTMLElement>) {
          if (disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          (child.props.onClick as ((event: MouseEvent<HTMLElement>) => void) | undefined)?.(event);
          props.onClick?.(event);
        },
      });

      return cloneElement(child, {
        ...referenceProps,
        ref: mergedRef,
      });
    }

    const mergedRef = useMergeRefs([setReference, ref]);

    return (
      <button
        ref={mergedRef as React.Ref<HTMLButtonElement>}
        type="button"
        id={triggerId}
        disabled={disabled}
        aria-disabled={cond(disabled, true, undefined)}
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
        className={cn(
          "inline-flex items-center justify-center font-medium select-none focus-ring cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {children}
      </button>
    );
  }
);

DropdownTrigger.displayName = "Dropdown.Trigger";
