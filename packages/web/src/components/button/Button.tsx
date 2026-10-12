import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { ButtonProps } from "./types";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center select-none font-medium outline-none transition-all duration-[var(--hm-motion-duration-fast)] ease-[var(--hm-motion-easing-standard)] active:scale-[var(--hm-motion-press-scale)] focus-visible:ring-2 focus-visible:ring-[var(--hm-color-focus-ring)] focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--hm-color-surface-primary)] text-[var(--hm-color-content-on-primary)] hover:bg-[var(--hm-color-surface-primary-hover)] active:bg-[var(--hm-color-surface-primary-active)]",
        secondary:
          "bg-[var(--hm-color-surface-secondary)] text-[var(--hm-color-content-primary)] border border-[var(--hm-color-border-subtle)] hover:bg-[var(--hm-color-surface-secondary-hover)] active:bg-[var(--hm-color-surface-secondary-active)]",
        ghost:
          "bg-transparent text-[var(--hm-color-content-primary)] hover:bg-[var(--hm-color-surface-ghost-hover)] active:bg-[var(--hm-color-surface-ghost-active)]",
        destructive:
          "bg-[var(--hm-color-surface-destructive)] text-[var(--hm-color-content-destructive)] hover:bg-[var(--hm-color-surface-destructive-hover)] active:bg-[var(--hm-color-surface-destructive-active)]"
      },
      size: {
        sm: "h-[var(--hm-button-height-sm)] px-[var(--hm-button-padding-x-sm)] text-sm gap-[var(--hm-button-gap-sm)] rounded-[var(--hm-radius-sm)]",
        md: "h-[var(--hm-button-height-md)] px-[var(--hm-button-padding-x-md)] text-sm font-medium gap-[var(--hm-button-gap-md)] rounded-[var(--hm-radius-md)]",
        lg: "h-[var(--hm-button-height-lg)] px-[var(--hm-button-padding-x-lg)] text-base font-medium gap-[var(--hm-button-gap-lg)] rounded-[var(--hm-radius-lg)]"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
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
    loading = false,
    disabled = false,
    leadingIcon,
    trailingIcon,
    children,
    className,
    type = "button",
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {/* Loading Overlay with Object Continuity */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-[var(--hm-motion-duration-fast)]">
          <LoadingSpinner size={size} />
        </span>
      )}

      {/* Button Content (preserved during loading to prevent dimensional collapse) */}
      <span
        className={`inline-flex items-center gap-[inherit] transition-opacity duration-[var(--hm-motion-duration-fast)] ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {leadingIcon && <span className="inline-flex shrink-0">{leadingIcon}</span>}
        {children && <span>{children}</span>}
        {trailingIcon && <span className="inline-flex shrink-0">{trailingIcon}</span>}
      </span>
    </button>
  );
});

Button.displayName = "Button";
