"use client";

import { forwardRef, useMemo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import { BadgeContext, type BadgeContextValue } from "./BadgeContext";
import { BadgeAnchor } from "./BadgeAnchor";
import { BadgeIndicator } from "./BadgeIndicator";
import { BadgeLabel } from "./BadgeLabel";
import { BadgeLeading } from "./BadgeLeading";
import { BadgeTrailing } from "./BadgeTrailing";
import type { BadgeProps } from "./types";

const PALETTES = {
  primary: {
    solid: "bg-primary text-primary-foreground border-transparent",
    ghost: "text-primary border-primary-border bg-transparent",
    plain: "text-primary border-transparent bg-transparent",
  },
  subtle: {
    solid: "bg-subtle text-subtle-foreground border-transparent",
    ghost: "text-subtle-foreground border-subtle-border bg-transparent",
    plain: "text-subtle-foreground border-transparent bg-transparent",
  },
  surface: {
    solid: "bg-surface text-foreground border-border",
    ghost: "text-foreground border-border bg-transparent",
    plain: "text-foreground border-transparent bg-transparent",
  },
  destructive: {
    solid: "bg-destructive text-destructive-foreground border-transparent",
    ghost: "text-destructive border-destructive-border bg-transparent",
    plain: "text-destructive border-transparent bg-transparent",
  },
} as const;

type PaletteColor = keyof typeof PALETTES;

const compounds = (Object.keys(PALETTES) as PaletteColor[]).flatMap((color) => [
  { variant: "contained" as const, color, className: PALETTES[color].solid },
  { variant: "outlined" as const, color, className: PALETTES[color].ghost },
  { variant: "plain" as const, color, className: PALETTES[color].plain },
]);

export const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium select-none border transition-colors",
  {
    variants: {
      variant: {
        contained: "border",
        outlined: "border",
        plain: "border-transparent",
      },
      color: {
        primary: "",
        subtle: "",
        surface: "",
        destructive: "",
      },
      size: {
        sm: "h-4.5 px-1.5 gap-1 text-[11px]",
        md: "h-5.5 px-2 gap-1.5 text-xs",
        lg: "h-6.5 px-2.5 gap-1.5 text-xs font-semibold",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      dot: {
        true: "p-0 aspect-square shrink-0",
        false: "leading-none tracking-tight",
      },
    },
    compoundVariants: [
      { dot: true, size: "sm", className: "size-1.5" },
      { dot: true, size: "md", className: "size-2" },
      { dot: true, size: "lg", className: "size-2.5" },
      ...compounds,
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "md",
      radius: "full",
      dot: false,
    },
  }
);

interface BadgeComponent
  extends React.ForwardRefExoticComponent<
    BadgeProps & React.RefAttributes<HTMLElement>
  > {
  Anchor: typeof BadgeAnchor;
  Indicator: typeof BadgeIndicator;
  Label: typeof BadgeLabel;
  Leading: typeof BadgeLeading;
  Trailing: typeof BadgeTrailing;
}

export const Badge = forwardRef<HTMLElement, BadgeProps>(function Badge(
  {
    as: Component = "span",
    variant = "contained",
    color = "primary",
    size = "md",
    radius = "full",
    dot = false,
    count,
    max = 99,
    placement,
    leading,
    trailing,
    label,
    className,
    children,
    ...props
  },
  ref
) {
  const contextValue = useMemo<BadgeContextValue>(
    () => ({ variant, color, size, radius }),
    [variant, color, size, radius]
  );

  // When placement is provided, act as an anchored overlay wrapping children
  if (placement) {
    return (
      <BadgeContext.Provider value={contextValue}>
        <BadgeAnchor className={className}>
          {children}
          <BadgeIndicator
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            dot={dot}
            count={count}
            max={max}
            placement={placement}
          />
        </BadgeAnchor>
      </BadgeContext.Provider>
    );
  }

  // Pure standalone indicator dot without text or children
  const isPureDot = dot && !children && !label && !leading && !trailing;
  if (isPureDot) {
    return (
      <BadgeContext.Provider value={contextValue}>
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          data-slot="badge-dot"
          className={cn(badgeVariants({ variant, color, size, radius, dot: true }), className)}
          {...props}
        />
      </BadgeContext.Provider>
    );
  }

  // Pure numeric pill when count is provided without separate text children
  const isPureCount = count !== undefined && !children && !label && !leading && !trailing;
  if (isPureCount) {
    return (
      <BadgeContext.Provider value={contextValue}>
        <BadgeIndicator
          ref={ref as React.Ref<HTMLSpanElement>}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          count={count}
          max={max}
          className={className}
          {...props}
        />
      </BadgeContext.Provider>
    );
  }

  const resolvedContent = label ?? children;
  const isAtomic = any(Boolean(leading), Boolean(trailing), dot, typeof resolvedContent === "string");

  return (
    <BadgeContext.Provider value={contextValue}>
      <Component
        ref={ref}
        data-slot="badge"
        data-variant={variant}
        data-color={color}
        data-size={size}
        className={cn(badgeVariants({ variant, color, size, radius, dot: false }), className)}
        {...props}
      >
        {cond(
          isAtomic,
          <>
            {when(dot, (
              <BadgeLeading>
                <span className="size-1.5 rounded-full bg-current" />
              </BadgeLeading>
            ))}
            {when(Boolean(leading), <BadgeLeading>{leading}</BadgeLeading>)}
            {when(Boolean(resolvedContent), <BadgeLabel>{resolvedContent}</BadgeLabel>)}
            {when(Boolean(trailing), <BadgeTrailing>{trailing}</BadgeTrailing>)}
          </>,
          children
        )}
      </Component>
    </BadgeContext.Provider>
  );
}) as BadgeComponent;

Badge.displayName = "Badge";
Badge.Anchor = BadgeAnchor;
Badge.Indicator = BadgeIndicator;
Badge.Label = BadgeLabel;
Badge.Leading = BadgeLeading;
Badge.Trailing = BadgeTrailing;

