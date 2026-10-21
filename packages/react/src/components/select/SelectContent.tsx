"use client";

import { forwardRef } from "react";
import {
  FloatingPortal,
  FloatingFocusManager,
  useTransitionStyles,
  useMergeRefs,
} from "@floating-ui/react";
import { useSelectContext } from "./SelectContext";
import { cn } from "../../utils/cn";
import { all, match } from "../../utils/condition";
import type { SelectContentProps } from "./types";

const radiusClasses: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-3xl",
};

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent({ children, className, style, ...props }, ref) {
    const {
      context,
      setFloating,
      floatingStyles,
      getFloatingProps,
      disabled,
      open,
      radius,
    } = useSelectContext();

    const { isMounted, styles: transitionStyles } = useTransitionStyles(
      context,
      {
        duration: {
          open: 160,
          close: 100,
        },
        common: {
          transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
        },
        initial: {
          opacity: 0,
          transform: "scale(0.96)",
        },
        open: {
          opacity: 1,
          transform: "scale(1)",
        },
        close: {
          opacity: 0,
          transform: "scale(0.96)",
        },
      }
    );

    const mergedRef = useMergeRefs([setFloating, ref]);

    if (!all(isMounted, !disabled, open)) {
      return null;
    }

    return (
      <FloatingPortal>
        <FloatingFocusManager context={context} modal={false} returnFocus={true}>
          <div
            ref={mergedRef}
            style={floatingStyles}
            {...getFloatingProps(props as Record<string, unknown>)}
            className="z-50 outline-none"
          >
            <div
              style={{
                ...transitionStyles,
                ...style,
              }}
              className={cn(
                "transform-gpu origin-top overflow-hidden bg-surface border border-border shadow-2xl",
                match(radius, radiusClasses, "rounded-2xl"),
                className
              )}
            >
              {children}
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  }
);

SelectContent.displayName = "Select.Content";
