"use client";

import {
  forwardRef,
  useMemo,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import { EmptyContext, type EmptyContextValue } from "./EmptyContext";
import { EmptyMedia } from "./EmptyMedia";
import { EmptyHeader } from "./EmptyHeader";
import { EmptyTitle } from "./EmptyTitle";
import { EmptyDescription } from "./EmptyDescription";
import { EmptyActions } from "./EmptyActions";
import type { EmptyProps } from "./types";

const emptyVariants = cva(
  "w-full flex flex-col items-center justify-center text-center select-none subpixel-antialiased transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
  {
    variants: {
      variant: {
        plain: "bg-transparent",
        outlined: "bg-transparent border border-border rounded-3xl",
        contained: "bg-surface border border-transparent rounded-3xl",
      },
      size: {
        sm: "p-surface-sm gap-3",
        md: "p-surface-md gap-4",
        lg: "p-surface-lg gap-6",
      },
      borderStyle: {
        dashed: "border-dashed",
        solid: "border-solid",
      },
    },
    defaultVariants: {
      variant: "plain",
      size: "md",
      borderStyle: "dashed",
    },
  }
);

interface EmptyComponent
  extends ForwardRefExoticComponent<EmptyProps & RefAttributes<HTMLDivElement>> {
  Media: typeof EmptyMedia;
  Header: typeof EmptyHeader;
  Title: typeof EmptyTitle;
  Description: typeof EmptyDescription;
  Actions: typeof EmptyActions;
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  {
    variant = "plain",
    size = "md",
    borderStyle = "dashed",
    icon,
    title,
    description,
    action,
    role = "status",
    className,
    children,
    ...props
  },
  ref
) {
  const contextValue: EmptyContextValue = useMemo(
    () => ({
      size,
      variant,
    }),
    [size, variant]
  );

  const hasAtomicContent = any(
    Boolean(icon),
    Boolean(title),
    Boolean(description),
    Boolean(action)
  );

  return (
    <EmptyContext.Provider value={contextValue}>
      <div
        ref={ref}
        role={role}
        aria-live="polite"
        data-slot="empty"
        data-variant={variant}
        data-size={size}
        className={cn(
          emptyVariants({
            variant,
            size,
            borderStyle: cond(variant === "outlined", borderStyle, undefined),
          }),
          className
        )}
        {...props}
      >
        {cond(
          Boolean(children),
          children,
          when(
            hasAtomicContent,
            <>
              {when(icon, <EmptyMedia>{icon}</EmptyMedia>)}
              {when(
                any(Boolean(title), Boolean(description)),
                <EmptyHeader>
                  {when(title, <EmptyTitle>{title}</EmptyTitle>)}
                  {when(
                    description,
                    <EmptyDescription>{description}</EmptyDescription>
                  )}
                </EmptyHeader>
              )}
              {when(action, <EmptyActions>{action}</EmptyActions>)}
            </>
          )
        )}
      </div>
    </EmptyContext.Provider>
  );
}) as EmptyComponent;

Empty.displayName = "Empty";
Empty.Media = EmptyMedia;
Empty.Header = EmptyHeader;
Empty.Title = EmptyTitle;
Empty.Description = EmptyDescription;
Empty.Actions = EmptyActions;
