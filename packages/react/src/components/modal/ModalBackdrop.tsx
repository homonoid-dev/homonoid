"use client";

import { forwardRef, useEffect } from "react";
import { cva } from "class-variance-authority";
import {
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useModalContext } from "./ModalContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { ModalBackdropProps } from "./types";

export const backdropVariants = cva(
  "fixed inset-0 z-50",
  {
    variants: {
      variant: {
        opaque: "bg-black/60",
        blur: "bg-black/40 backdrop-blur-md",
        transparent: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "blur",
    },
  }
);

export const ModalBackdrop = forwardRef<HTMLDivElement, ModalBackdropProps>(
  function ModalBackdrop(
    {
      children,
      variant = "blur",
      isDismissable = true,
      lockScroll = true,
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) {
    const {
      context,
      isMounted,
      backdropStyles,
      scroll,
      setOpen,
      setIsDismissable,
    } = useModalContext();

    useEffect(() => {
      setIsDismissable(isDismissable);
    }, [isDismissable, setIsDismissable]);

    if (!isMounted) {
      return null;
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
      if (
        event.target === event.currentTarget &&
        isDismissable &&
        !event.defaultPrevented
      ) {
        setOpen(false);
      }
    };

    return (
      <FloatingPortal>
        <FloatingOverlay
          ref={ref}
          lockScroll={lockScroll}
          onClick={handleClick}
          className={cn(
            backdropVariants({ variant }),
            cond(
              scroll === "outside",
              "overflow-y-auto overflow-x-hidden",
              "overflow-hidden flex items-center justify-center"
            ),
            className
          )}
          style={{
            ...backdropStyles,
            ...style,
          }}
          {...props}
        >
          <FloatingFocusManager context={context} modal={true}>
            <div className="contents">{children}</div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  }
);

ModalBackdrop.displayName = "Modal.Backdrop";
