"use client";

import {
  forwardRef,
  useCallback,
  type KeyboardEvent,
  type ForwardRefExoticComponent,
  type RefAttributes
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, all, cond, match, when } from "../../utils/condition";
import { OrbBars } from "./OrbBars";
import { OrbCloud } from "./OrbCloud";
import type { OrbProps, OrbState, OrbBarsProps, OrbCloudProps } from "./types";

export const orbVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 select-none transform-gpu origin-center transition-[transform,opacity] duration-[var(--motion-duration-normal)] ease-[var(--motion-easing-standard)]",
  {
    variants: {
      size: {
        sm: "w-orb-sm h-orb-sm",
        md: "w-orb-md h-orb-md",
        lg: "w-orb-lg h-orb-lg"
      },
      interactive: {
        true: "cursor-pointer focus-ring active:scale-[var(--motion-press-scale)]",
        false: "pointer-events-auto"
      }
    },
    defaultVariants: {
      size: "md",
      interactive: false
    }
  }
);

const getStateAnnouncement = (state: OrbState): string =>
  match<OrbState, string>(
    state,
    {
      idle: "Voice assistant idle",
      connecting: "Voice assistant connecting",
      listening: "Voice assistant listening",
      thinking: "Voice assistant thinking",
      speaking: "Voice assistant speaking",
      error: "Voice assistant error"
    },
    "Voice assistant active"
  );

interface OrbComponent
  extends ForwardRefExoticComponent<OrbProps & RefAttributes<HTMLElement>> {
  Bars: typeof OrbBars;
  Cloud: typeof OrbCloud;
}

const OrbBase = forwardRef<HTMLElement, OrbProps>(function Orb(
  {
    theme = "cloud",
    state = "idle",
    volume = 0,
    size = "md",
    interactive = false,
    label,
    className,
    children,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    onKeyDown,
    ...props
  },
  ref
) {
  const isHidden = any(ariaHidden === true, ariaHidden === "true");
  const defaultAnnouncement = getStateAnnouncement(state);
  const resolvedLabel = ariaLabel ?? label ?? defaultAnnouncement;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event);
      if (interactive && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        event.currentTarget.click();
      }
    },
    [interactive, onKeyDown]
  );

  const Component = cond(interactive, "button", "div") as "button" | "div";

  return (
    <Component
      ref={ref as any}
      role={cond(interactive, "button", cond(isHidden, undefined, "status"))}
      tabIndex={cond(interactive, 0, undefined)}
      aria-label={cond(isHidden, undefined, resolvedLabel)}
      aria-live={cond(all(!interactive, !isHidden), "polite", undefined)}
      aria-hidden={ariaHidden}
      onKeyDown={handleKeyDown}
      className={cn(orbVariants({ size, interactive }), className)}
      {...(props as any)}
    >
      {/* Dynamic Screen Reader Announcement */}
      {when(all(!isHidden, Boolean(resolvedLabel)), () => (
        <span className="sr-only">{resolvedLabel}</span>
      ))}

      {/* Visual Surface Theme */}
      {match(
        theme,
        {
          cloud: <OrbCloud state={state} volume={volume} size={size} />,
          bars: <OrbBars state={state} volume={volume} size={size} />
        },
        <OrbCloud state={state} volume={volume} size={size} />
      )}

      {/* Optional Custom Slots or Overlays */}
      {children}
    </Component>
  );
});

OrbBase.displayName = "Orb";

export const Orb = Object.assign(OrbBase, {
  Bars: OrbBars,
  Cloud: OrbCloud
}) as OrbComponent;
