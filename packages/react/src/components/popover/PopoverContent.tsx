"use client";

import { forwardRef } from "react";
import {
  FloatingPortal,
  FloatingFocusManager,
  useTransitionStyles,
  useMergeRefs,
} from "@floating-ui/react";
import { usePopoverContext } from "./PopoverContext";
import { cn } from "../../utils/cn";
import { all } from "../../utils/condition";
import type { PopoverContentProps } from "./types";

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent({ children, className, style, ...props }, ref) {
    const {
      context,
      setFloating,
      floatingStyles,
      getFloatingProps,
      disabled,
      modal,
    } = usePopoverContext();

    const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
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
    });

    const mergedRef = useMergeRefs([setFloating, ref]);

    if (!all(isMounted, !disabled)) {
      return null;
    }

    return (
      <FloatingPortal>
        <FloatingFocusManager context={context} modal={modal} returnFocus={true}>
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
              className={cn("transform-gpu origin-center", className)}
            >
              {children}
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  }
);

PopoverContent.displayName = "Popover.Content";
