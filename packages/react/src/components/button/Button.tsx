import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import { Spinner } from "../spinner/Spinner";
import type { ButtonProps } from "./types";

export const variants = cva(
  "relative inline-flex items-center justify-center font-medium select-none subpixel-antialiased overflow-hidden transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "bg-transparent border",
        plain: "bg-transparent"
      },
      color: {
        primary: "",
        subtle: "",
        surface: "",
        destructive: ""
      },
      size: {
        sm: "h-control-sm px-3.5 text-sm gap-control-gap",
        md: "h-control-md px-control-x text-sm font-medium gap-control-gap",
        lg: "h-control-lg px-5 text-base font-medium gap-control-gap"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      },
      layout: {
        inline: "w-auto",
        full: "w-full flex",
        icon: "aspect-square p-0 shrink-0"
      }
    },
    compoundVariants: [
      {
        layout: "icon",
        size: "sm",
        className: "w-control-sm"
      },
      {
        layout: "icon",
        size: "md",
        className: "w-control-md"
      },
      {
        layout: "icon",
        size: "lg",
        className: "w-control-lg"
      },

      // Contained Variants (Solid fills)
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
      },
      {
        variant: "contained",
        color: "subtle",
        className: "bg-subtle text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active"
      },
      {
        variant: "contained",
        color: "surface",
        className: "bg-surface text-surface-foreground hover:bg-surface-hover active:bg-surface-active"
      },
      {
        variant: "contained",
        color: "destructive",
        className: "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active"
      },

      // Outlined Variants (Transparent + Border)
      {
        variant: "outlined",
        color: "primary",
        className: "border-primary-border text-primary hover:bg-subtle active:bg-subtle-active"
      },
      {
        variant: "outlined",
        color: "subtle",
        className: "border-subtle-border text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active"
      },
      {
        variant: "outlined",
        color: "surface",
        className: "border-border text-surface-foreground hover:bg-surface-hover active:bg-surface-active"
      },
      {
        variant: "outlined",
        color: "destructive",
        className: "border-destructive-border text-destructive hover:bg-destructive-hover/5 active:bg-destructive-active/20"
      },

      // Plain Variants (Plain / Ghost without background or border)
      {
        variant: "plain",
        color: "primary",
        className: "text-primary hover:bg-subtle active:bg-subtle-active"
      },
      {
        variant: "plain",
        color: "subtle",
        className: "text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active"
      },
      {
        variant: "plain",
        color: "surface",
        className: "text-surface-foreground hover:bg-surface-hover active:bg-surface-active"
      },
      {
        variant: "plain",
        color: "destructive",
        className: "text-destructive hover:bg-destructive-hover/5 active:bg-destructive-active/20"
      }
    ],
    defaultVariants: {
      variant: "plain",
      color: "primary",
      size: "md",
      radius: "full",
      layout: "inline"
    }
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
          "inline-flex items-center gap-[inherit] transition-all duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)]",
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
