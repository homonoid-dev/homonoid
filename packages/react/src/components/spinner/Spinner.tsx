import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, all, cond } from "../../utils/condition";
import type { SpinnerProps } from "./types";

export const variants = cva(
  "relative inline-flex items-center justify-center shrink-0 select-none transform-gpu origin-center",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
      },
      color: {
        current: "text-current",
        primary: "text-primary",
        subtle: "text-subtle-foreground",
        foreground: "text-foreground",
        destructive: "text-destructive"
      }
    },
    defaultVariants: {
      size: "md",
      color: "current"
    }
  }
);

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    size,
    color,
    animation = "border",
    label = "Loading",
    className,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    ...props
  },
  ref
) {
  const isHidden = any(ariaHidden === true, ariaHidden === "true");

  return (
    <span
      ref={ref}
      role={cond(isHidden, undefined, "status")}
      aria-label={cond(isHidden, undefined, ariaLabel ?? label)}
      aria-hidden={ariaHidden}
      className={cn(variants({ size, color }), className)}
      {...props}
    >
      {all(!isHidden, Boolean(label)) && <span className="sr-only">{label}</span>}

      {animation === "border" && (
        <svg
          className="w-full h-full animate-spinner-border origin-center"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9.5"
            stroke="currentColor"
            strokeWidth="2.5"
            className="opacity-20"
          />
          <path
            d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}

      {animation === "grow" && (
        <span
          className="block w-[75%] h-[75%] rounded-full bg-current animate-spinner-grow transform-gpu origin-center"
          aria-hidden="true"
        />
      )}

      {animation === "orbit" && (
        <svg
          className="w-full h-full animate-spinner-orbit origin-center"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            className="opacity-15"
          />
          <circle cx="12" cy="3.5" r="2.25" fill="currentColor" />
          <circle
            cx="19.36"
            cy="16.25"
            r="1.8"
            fill="currentColor"
            className="opacity-70"
          />
          <circle
            cx="4.64"
            cy="16.25"
            r="1.4"
            fill="currentColor"
            className="opacity-40"
          />
        </svg>
      )}

      {animation === "dash" && (
        <svg
          className="w-full h-full animate-spinner-dash origin-center"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" opacity={1} />
          <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" transform="rotate(45 12 12)" opacity={0.12} />
          <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" transform="rotate(90 12 12)" opacity={0.18} />
          <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" transform="rotate(135 12 12)" opacity={0.28} />
          <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" transform="rotate(180 12 12)" opacity={0.42} />
          <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" transform="rotate(225 12 12)" opacity={0.58} />
          <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" transform="rotate(270 12 12)" opacity={0.72} />
          <line x1="12" y1="2.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" transform="rotate(315 12 12)" opacity={0.86} />
        </svg>
      )}
    </span>
  );
});

Spinner.displayName = "Spinner";
