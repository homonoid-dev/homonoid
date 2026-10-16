"use client";

import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
  type MutableRefObject,
  type RefCallback,
} from "react";
import { useTooltipContext } from "./TooltipContext";
import { cn } from "../../utils/cn";
import { iff } from "../../utils/condition";
import type { TooltipTriggerProps } from "./types";

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  function TooltipTrigger({ children, asChild = false, className }, ref) {
    const { setReference, getReferenceProps } = useTooltipContext();

    const handleRef = (node: HTMLElement | null) => {
      setReference(node);
      if (typeof ref === "function") {
        (ref as RefCallback<HTMLElement>)(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    if (iff(asChild, true, isValidElement(children))) {
      const child = children as ReactElement<Record<string, unknown>>;
      const referenceProps = getReferenceProps({
        ...child.props,
        className: cn(child.props.className as string | undefined, className),
      });

      return cloneElement(child, {
        ...referenceProps,
        ref: (node: HTMLElement | null) => {
          handleRef(node);
          const childRef = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
          if (typeof childRef === "function") {
            (childRef as RefCallback<HTMLElement>)(node);
          } else if (childRef && typeof childRef === "object") {
            (childRef as MutableRefObject<HTMLElement | null>).current = node;
          }
        },
      });
    }

    return (
      <span
        ref={handleRef}
        {...getReferenceProps()}
        className={cn("inline-flex items-center", className)}
      >
        {children}
      </span>
    );
  }
);

TooltipTrigger.displayName = "Tooltip.Trigger";
