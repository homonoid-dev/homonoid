"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, match } from "../../utils/condition";
import { useBadgeContext } from "./BadgeContext";
import type { BadgeIndicatorProps } from "./types";

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

export const indicatorVariants = cva(
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
        sm: "",
        md: "",
        lg: "",
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
        false: "tabular-nums leading-none tracking-tight",
      },
    },
    compoundVariants: [
      { dot: true, size: "sm", className: "size-1.5" },
      { dot: true, size: "md", className: "size-2" },
      { dot: true, size: "lg", className: "size-2.5" },
      { dot: false, size: "sm", className: "h-4 min-w-4 px-1 text-[10px]" },
      { dot: false, size: "md", className: "h-5 min-w-5 px-1.5 text-[11px]" },
      { dot: false, size: "lg", className: "h-6 min-w-6 px-2 text-xs font-semibold" },
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

export const BadgeIndicator = forwardRef<HTMLSpanElement, BadgeIndicatorProps>(
  function BadgeIndicator(
    {
      variant: propVariant,
      color: propColor,
      size: propSize,
      radius: propRadius,
      dot = false,
      count,
      max = 99,
      placement,
      className,
      children,
      ...props
    },
    ref
  ) {
    const context = useBadgeContext();
    const variant = propVariant ?? context.variant ?? "contained";
    const color = propColor ?? context.color ?? "primary";
    const size = propSize ?? context.size ?? "md";
    const radius = propRadius ?? context.radius ?? "full";

    const displayCount = cond(
      count !== undefined,
      cond(count! > max, `${max}+`, String(count)),
      undefined
    );

    const resolvedContent = children ?? displayCount;
    const isSingle = cond(
      dot,
      false,
      cond(
        typeof resolvedContent === "string" || typeof resolvedContent === "number",
        String(resolvedContent).length === 1,
        false
      )
    );

    const placementClasses = cond(
      Boolean(placement),
      cond(
        dot,
        match(
          placement as NonNullable<typeof placement>,
          {
            "top-right": "absolute top-0.5 right-0.5 z-10",
            "top-left": "absolute top-0.5 left-0.5 z-10",
            "bottom-right": "absolute bottom-0.5 right-0.5 z-10",
            "bottom-left": "absolute bottom-0.5 left-0.5 z-10",
          },
          ""
        ),
        cond(
          isSingle,
          match(
            placement as NonNullable<typeof placement>,
            {
              "top-right": "absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 z-10",
              "top-left": "absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 z-10",
              "bottom-right": "absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 z-10",
              "bottom-left": "absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 z-10",
            },
            ""
          ),
          match(
            placement as NonNullable<typeof placement>,
            {
              "top-right": "absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 z-10",
              "top-left": "absolute top-0 left-0 -translate-y-1/2 -translate-x-1/3 z-10",
              "bottom-right": "absolute bottom-0 right-0 translate-y-1/2 translate-x-1/3 z-10",
              "bottom-left": "absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 z-10",
            },
            ""
          )
        )
      ),
      ""
    );

    return (
      <span
        ref={ref}
        data-slot="badge-indicator"
        data-variant={variant}
        data-color={color}
        data-size={size}
        className={cn(
          indicatorVariants({ variant, color, size, radius, dot }),
          cond(isSingle, "aspect-square p-0 min-w-0 shrink-0", ""),
          placementClasses,
          className
        )}
        {...props}
      >
        {cond(dot, null, resolvedContent)}
      </span>
    );
  }
);

BadgeIndicator.displayName = "BadgeIndicator";
