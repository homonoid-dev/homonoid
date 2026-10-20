"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { usePopoverContext } from "./PopoverContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { PopoverDialogProps } from "./types";

export const variants = cva(
  "relative flex flex-col rounded-2xl p-surface outline-none pointer-events-auto transform-gpu overflow-hidden text-sm",
  {
    variants: {
      variant: {
        surface: "bg-surface text-foreground border border-border shadow-xl",
        primary: "bg-primary text-primary-foreground border border-primary-border shadow-xl",
        inverted: "bg-foreground text-background border border-foreground/10 shadow-xl",
      },
      size: {
        sm: "w-64",
        md: "w-80",
        lg: "w-96",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      variant: "surface",
      size: "auto",
    },
  }
);

export const PopoverDialog = forwardRef<HTMLDivElement, PopoverDialogProps>(
  function PopoverDialog(
    { children, variant, size, className, ...props },
    ref
  ) {
    const {
      dialogId,
      modal,
      variant: contextVariant,
      size: contextSize,
    } = usePopoverContext();

    const activeVariant = cond(Boolean(variant), variant, contextVariant);
    const activeSize = cond(Boolean(size), size, contextSize);

    return (
      <div
        ref={ref}
        id={dialogId}
        role="dialog"
        tabIndex={-1}
        aria-modal={cond(modal, "true", "false")}
        className={cn(
          variants({
            variant: activeVariant,
            size: activeSize,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverDialog.displayName = "Popover.Dialog";
