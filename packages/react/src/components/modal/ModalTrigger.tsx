"use client";

import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useModalContext } from "./ModalContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { ModalTriggerProps } from "./types";

export const ModalTrigger = forwardRef<HTMLElement, ModalTriggerProps>(
  function ModalTrigger({ children, asChild = false, className, ...props }, ref) {
    const { setReference, getReferenceProps, open } = useModalContext();

    const ariaProps = {
      "aria-haspopup": "dialog" as const,
      "aria-expanded": open,
    };

    if (cond(asChild, true, isValidElement(children))) {
      const child = children as ReactElement<Record<string, unknown>>;
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

ModalTrigger.displayName = "Modal.Trigger";
