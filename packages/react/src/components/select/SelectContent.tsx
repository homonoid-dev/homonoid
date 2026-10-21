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
import { all, cond, match } from "../../utils/condition";
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

    if (!all(isMounted, !disabled)) {
      return null;
    }

    return (
      <FloatingPortal>
        <FloatingFocusManager
          context={context}
          modal={false}
          returnFocus={true}
          initialFocus={-1}
        >
          <div
            ref={mergedRef}
            tabIndex={-1}
            style={floatingStyles}
            {...getFloatingProps(props as Record<string, unknown>)}
            className="z-50 outline-none"
          >
            <div
              style={{
                ...transitionStyles,
                ...style,
              }}
              data-state={cond(open, "open", "closed")}
              className={cn(
                "transform-gpu overflow-hidden bg-surface border-[0.5px] border-border shadow-lg p-1 focus:outline-none",
                cond(context.placement.startsWith("top"), "origin-bottom", "origin-top"),
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
