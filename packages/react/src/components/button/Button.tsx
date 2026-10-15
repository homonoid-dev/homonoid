import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any } from "../../utils/condition";
import { Spinner } from "../spinner/Spinner";
import type { ButtonProps } from "./types";

export const variants = cva(
  "relative inline-flex items-center justify-center select-none font-medium transform-gpu origin-center transition-[color,background-color,border-color,opacity,box-shadow,transform] duration-[var(--motion-duration-release)] ease-[var(--motion-easing-fluid)] active:duration-[var(--motion-duration-press)] active:ease-out active:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100",
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
        sm: "h-control-sm px-3.5 text-sm gap-control-gap rounded-md",
        md: "h-control-md px-control-x text-sm font-medium gap-control-gap rounded-lg",
        lg: "h-control-lg px-5 text-base font-medium gap-control-gap rounded-xl"
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none"
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
      layout: "inline"
    }
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "plain",
    color = "primary",
    size,
    shape,
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
      className={cn(variants({ variant, color, size, shape, layout }), className)}
      {...props}
    >
      {/* Loading Overlay with Object Continuity */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-[var(--motion-duration-fast)]">
          <Spinner
            size={size === "lg" ? "md" : "sm"}
            animation="border"
            aria-hidden="true"
          />
        </span>
      )}

      {/* Button Content (preserved during loading to prevent dimensional collapse) */}
      <span
        className={`inline-flex items-center gap-[inherit] transition-opacity duration-[var(--motion-duration-fast)] ${loading ? "opacity-0" : "opacity-100"
          }`}
      >
        {leading && <span className="inline-flex shrink-0">{leading}</span>}
        {children && <span>{children}</span>}
        {trailing && <span className="inline-flex shrink-0">{trailing}</span>}
      </span>
    </button>
  );
});

Button.displayName = "Button";
