"use client";

import {
  forwardRef,
  cloneElement,
  isValidElement,
  Children,
  type ReactElement,
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { usePopoverContext } from "./PopoverContext";
import { cn } from "../../utils/cn";
import { all, cond } from "../../utils/condition";
import type { PopoverTriggerProps } from "./types";

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  function PopoverTrigger({ children, asChild = false, className, ...props }, ref) {
    const { setReference, getReferenceProps, open, dialogId } = usePopoverContext();

    const ariaProps = {
      "aria-haspopup": "dialog" as const,
      "aria-expanded": open,
      "aria-controls": cond(open, dialogId, undefined),
      "data-state": cond(open, "open", "closed"),
    };

    const childList = Children.toArray(children);
    const hasSingleElement = all(childList.length === 1, isValidElement(childList[0]));
    const shouldClone = cond(asChild, true, cond(isValidElement(children), true, hasSingleElement));

    if (shouldClone) {
      const child = (cond(isValidElement(children), children, childList[0])) as ReactElement<Record<string, unknown>>;
      const childRef = (child.props as { ref?: React.Ref<HTMLElement> })?.ref;
      const mergedRef = useMergeRefs([setReference, ref, childRef]);
      const referenceProps = getReferenceProps({
        ...ariaProps,
        ...child.props,
        ...props,
        className: cn(child.props.className as string | undefined, className),
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
        {...getReferenceProps({
          ...ariaProps,
          ...props,
        })}
        className={cn("inline-flex items-center justify-center", className)}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = "Popover.Trigger";
