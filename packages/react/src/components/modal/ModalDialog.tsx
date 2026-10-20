"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { useMergeRefs } from "@floating-ui/react";
import { useModalContext } from "./ModalContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { ModalDialogProps } from "./types";

export const variants = cva(
  "relative flex flex-col w-full bg-surface text-foreground border shadow-2xl overflow-hidden pointer-events-auto transform-gpu",
  {
    variants: {
      size: {
        sm: "max-w-sm rounded-3xl",
        md: "max-w-lg rounded-3xl",
        lg: "max-w-2xl rounded-3xl",
        cover: "max-w-full w-full h-[calc(100vh-var(--spacing-surface)*2)] rounded-3xl",
        full: "max-w-none w-screen h-screen rounded-none border-0",
      },
      variant: {
        default: "border-border",
        destructive: "border-destructive-border",
      },
      scroll: {
        inside: "max-h-[calc(100vh-var(--spacing-surface)*2)]",
        outside: "my-auto shrink-0",
      },
    },
    compoundVariants: [
      {
        size: "full",
        scroll: "inside",
        className: "max-h-screen h-screen",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "default",
      scroll: "inside",
    },
  }
);

export const ModalDialog = forwardRef<HTMLDivElement, ModalDialogProps>(
  function ModalDialog(
    { children, size, variant, scroll, className, style, ...props },
    ref
  ) {
    const {
      setFloating,
      getFloatingProps,
      role,
      dialogStyles,
      size: contextSize,
      variant: contextVariant,
      scroll: contextScroll,
    } = useModalContext();

    const mergedRef = useMergeRefs([setFloating, ref]);

    const activeSize = cond(Boolean(size), size, contextSize);
    const activeVariant = cond(Boolean(variant), variant, contextVariant);
    const activeScroll = cond(Boolean(scroll), scroll, contextScroll);

    return (
      <div
        ref={mergedRef}
        role={role}
        tabIndex={-1}
        aria-modal="true"
        className={cn(
          "outline-none",
          variants({
            size: activeSize,
            variant: activeVariant,
            scroll: activeScroll,
          }),
          className
        )}
        style={{
          ...dialogStyles,
          ...style,
        }}
        {...getFloatingProps(props as Record<string, unknown>)}
      >
        {children}
      </div>
    );
  }
);

ModalDialog.displayName = "Modal.Dialog";
