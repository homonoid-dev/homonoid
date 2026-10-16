"use client";

import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useTooltipContext } from "./TooltipContext";
import { cn } from "../../utils/cn";
import { iff } from "../../utils/condition";
import type { TooltipTriggerProps } from "./types";

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  function TooltipTrigger({ children, asChild = false, className }, ref) {
    const { setReference, getReferenceProps } = useTooltipContext();

    if (iff(asChild, true, isValidElement(children))) {
      const child = children as ReactElement<Record<string, unknown>>;
      const childRef = (child.props as { ref?: React.Ref<HTMLElement> })?.ref;
      const mergedRef = useMergeRefs([setReference, ref, childRef]);
      const referenceProps = getReferenceProps({
        ...child.props,
        className: cn(child.props.className as string | undefined, className),
      });

      return cloneElement(child, {
        ...referenceProps,
        ref: mergedRef,
      });
    }

    const mergedRef = useMergeRefs([setReference, ref]);

    return (
      <span
        ref={mergedRef}
        {...getReferenceProps()}
        className={cn("inline-flex items-center", className)}
      >
        {children}
      </span>
    );
  }
);

TooltipTrigger.displayName = "Tooltip.Trigger";
