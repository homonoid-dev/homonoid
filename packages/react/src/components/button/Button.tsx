import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import { Spinner } from "../spinner/Spinner";
import type { ButtonProps } from "./types";

const PALETTES = {
  primary: {
    solid: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active aria-expanded:bg-primary-hover data-[state=open]:bg-primary-hover",
    ghost: "text-primary hover:bg-subtle active:bg-subtle-active aria-expanded:bg-subtle data-[state=open]:bg-subtle",
    border: "border-primary-border",
  },
  subtle: {
    solid: "bg-subtle text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active aria-expanded:bg-subtle-hover data-[state=open]:bg-subtle-hover",
    ghost: "text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active aria-expanded:bg-subtle-hover data-[state=open]:bg-subtle-hover",
    border: "border-subtle-border",
  },
  surface: {
    solid: "bg-surface text-foreground hover:bg-surface-hover active:bg-surface-active aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover",
    ghost: "text-foreground hover:bg-surface-hover active:bg-surface-active aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover",
    border: "border-border",
  },
  destructive: {
    solid: "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active aria-expanded:bg-destructive-hover data-[state=open]:bg-destructive-hover",
    ghost: "text-destructive hover:bg-destructive-hover/5 active:bg-destructive-active/20 aria-expanded:bg-destructive-hover/5 data-[state=open]:bg-destructive-hover/5",
    border: "border-destructive-border",
  },
} as const;

type Palette = keyof typeof PALETTES;

const compounds = (Object.keys(PALETTES) as Palette[]).flatMap((color) => [
  { variant: "contained" as const, color, className: PALETTES[color].solid },
  { variant: "outlined" as const, color, className: `${PALETTES[color].border} ${PALETTES[color].ghost}` },
  { variant: "plain" as const, color, className: PALETTES[color].ghost },
]);

export const variants = cva(
  "relative inline-flex items-center justify-center font-medium select-none subpixel-antialiased overflow-hidden transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] aria-expanded:scale-[var(--motion-press-scale)] data-[state=open]:scale-[var(--motion-press-scale)] focus-ring cursor-pointer aria-expanded:cursor-default data-[state=open]:cursor-default disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        contained: "border border-transparent",
        outlined: "bg-transparent border",
        plain: "bg-transparent border border-transparent",
      },
      color: {
        primary: "",
        subtle: "",
        surface: "",
        destructive: "",
      },
      size: {
        sm: "h-control-sm px-3.5 gap-control-gap text-sm",
        md: "h-control-md px-control-x gap-control-gap text-sm",
        lg: "h-control-lg px-5 gap-control-gap text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      layout: {
        inline: "w-auto",
        full: "w-full flex",
        icon: "aspect-square p-0 shrink-0",
      },
    },
    compoundVariants: [
      { layout: "icon", size: "sm", className: "w-control-sm" },
      { layout: "icon", size: "md", className: "w-control-md" },
      { layout: "icon", size: "lg", className: "w-control-lg" },
      ...compounds,
    ],
    defaultVariants: {
      variant: "plain",
      color: "primary",
      size: "md",
      radius: "full",
      layout: "inline",
    },
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "plain",
    color = "primary",
    size,
    radius = "full",
    layout,
    loading = false,
    disabled = false,
    leading,
    trailing,
    children,
    className,
    type = "button",
    ...props
  },
  ref
) {
  const isDisabled = any(disabled, loading);

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={cn(variants({ variant, color, size, radius, layout }), className)}
      {...props}
    >
      {/* Loading Indicator with Object Continuity */}
      <span
        aria-hidden={!loading}
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)]",
          cond(
            loading,
            "opacity-100 scale-100",
            "opacity-0 scale-90 pointer-events-none"
          )
        )}
      >
        <Spinner
          size={cond(size === "lg", "md", "sm")}
          aria-hidden="true"
        />
      </span>

      {/* Button Content (preserved during loading to prevent dimensional collapse) */}
      <span
        className={cn(
          "inline-flex items-center gap-[inherit] transition-[opacity,transform] duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)]",
          cond(
            loading,
            "opacity-0 scale-95 pointer-events-none",
            "opacity-100 scale-100"
          )
        )}
      >
        {when(leading, <span className="inline-flex shrink-0">{leading}</span>)}
        {when(children, <span>{children}</span>)}
        {when(trailing, <span className="inline-flex shrink-0">{trailing}</span>)}
      </span>
    </button>
  );
});

Button.displayName = "Button";
