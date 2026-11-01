"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useEmptyContext } from "./EmptyContext";
import type { EmptyMediaProps } from "./types";

const mediaVariants = cva(
  "inline-flex items-center justify-center shrink-0 transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
  {
    variants: {
      variant: {
        default: "bg-subtle text-foreground",
        subtle: "bg-subtle/60 text-subtle-foreground",
        surface: "bg-surface text-foreground border border-border",
      },
      size: {
        sm: "p-2 rounded-xl [&>svg]:size-5",
        md: "p-3 rounded-2xl [&>svg]:size-6",
        lg: "p-4 rounded-3xl [&>svg]:size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const EmptyMedia = forwardRef<HTMLDivElement, EmptyMediaProps>(
  function EmptyMedia(
    { variant = "default", className, children, ...props },
    ref
  ) {
    const { size } = useEmptyContext();

    return (
      <div
        ref={ref}
        data-slot="empty-media"
        className={cn(mediaVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EmptyMedia.displayName = "Empty.Media";
