import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any } from "../../utils/condition";
import type { ButtonProps } from "./types";

export const variants = cva(
  "relative inline-flex items-center justify-center select-none font-medium transition-all duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)] active:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary: "bg-subtle text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active",
        outline: "bg-transparent text-foreground border border-border hover:bg-surface active:bg-surface-hover",
        ghost: "bg-transparent text-foreground hover:bg-surface active:bg-surface-hover",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active"
      },
      size: {
        sm: "h-control-sm px-3 text-sm gap-control-gap rounded-sm",
        md: "h-control-md px-control-x text-sm font-medium gap-control-gap rounded-md",
        lg: "h-control-lg px-5 text-base font-medium gap-control-gap rounded-lg"
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none"
      },
      layout: {
        inline: "w-auto",
        full: "w-full flex",
        icon: "aspect-square px-0 shrink-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      layout: "inline"
    }
  }
);

function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" | null }) {
  const dimension = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <svg
      className={`animate-spin ${dimension} text-current`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
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
      className={cn(variants({ variant, size, shape, layout }), className)}
      {...props}
    >
      {/* Loading Overlay with Object Continuity */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-[var(--motion-duration-fast)]">
          <LoadingSpinner size={size} />
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
