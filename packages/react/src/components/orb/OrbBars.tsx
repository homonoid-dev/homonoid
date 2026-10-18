import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { match, cond } from "../../utils/condition";
import type { OrbBarsProps, OrbSize, OrbState } from "./types";

export const barsContainerVariants = cva(
  "relative inline-flex items-center justify-center select-none origin-center transition-opacity duration-[var(--motion-duration-normal)] ease-[var(--motion-easing-standard)]",
  {
    variants: {
      size: {
        sm: "w-orb-sm h-orb-sm gap-1.5",
        md: "w-orb-md h-orb-md gap-2.5",
        lg: "w-orb-lg h-orb-lg gap-3.5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const BAR_CONFIG: Record<
  OrbSize,
  { width: string; minHeight: string; maxHeight: string }
> = {
  sm: {
    width: "8px",
    minHeight: "8px",
    maxHeight: "28px"
  },
  md: {
    width: "14px",
    minHeight: "14px",
    maxHeight: "60px"
  },
  lg: {
    width: "22px",
    minHeight: "22px",
    maxHeight: "104px"
  }
};

const getBarColorClass = (state: OrbState): string =>
  match<OrbState, string>(
    state,
    {
      error: "bg-destructive",
      speaking: "bg-primary",
      listening: "bg-primary",
      thinking: "bg-primary/80",
      connecting: "bg-primary/70",
      idle: "bg-muted"
    },
    "bg-muted"
  );

const getAnimationClass = (state: OrbState): string =>
  match<OrbState, string>(
    state,
    {
      error: "animate-orb-bars-error",
      speaking: "animate-orb-bars-speaking",
      thinking: "animate-orb-bars-thinking",
      listening: "animate-orb-bars-listening",
      connecting: "animate-orb-bars-connecting",
      idle: "animate-orb-bars-idle"
    },
    "animate-orb-bars-idle"
  );

const BAR_DELAYS_IDLE = ["0ms", "150ms", "300ms", "150ms", "0ms"];
const BAR_DELAYS_CONNECTING = ["0ms", "120ms", "240ms", "360ms", "480ms"];
const BAR_DELAYS_THINKING = ["0ms", "200ms", "400ms", "600ms", "800ms"];
const BAR_DELAYS_SPEAKING = ["60ms", "180ms", "0ms", "240ms", "120ms"];

const getBarDelay = (index: number, state: OrbState): string => {
  const delays = match<OrbState, string[]>(
    state,
    {
      connecting: BAR_DELAYS_CONNECTING,
      thinking: BAR_DELAYS_THINKING,
      speaking: BAR_DELAYS_SPEAKING,
      idle: BAR_DELAYS_IDLE,
      listening: BAR_DELAYS_IDLE,
      error: BAR_DELAYS_IDLE
    },
    BAR_DELAYS_IDLE
  );
  return delays[index] ?? "0ms";
};

export const OrbBars = forwardRef<HTMLDivElement, OrbBarsProps>(function OrbBars(
  { state = "idle", volume = 0, size = "md", className, style, ...props },
  ref
) {
  const colorClass = getBarColorClass(state);
  const animationClass = getAnimationClass(state);
  const normalizedVolume = Math.min(1, Math.max(0, volume));
  const config = match(size, BAR_CONFIG, BAR_CONFIG.md);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(barsContainerVariants({ size }), className)}
      style={{
        "--bar-width": config.width,
        "--bar-min-height": config.minHeight,
        "--bar-max-height": config.maxHeight,
        ...style
      } as any}
      {...props}
    >
      {[0, 1, 2, 3, 4].map((index) => {
        const animationDelay = getBarDelay(index, state);
        const volumeFactor = cond(
          state === "speaking",
          0.2 + normalizedVolume * 0.8,
          cond(state === "listening", 0.25 + normalizedVolume * 0.45, 1)
        );

        const hasActiveVolume =
          normalizedVolume > 0 && (state === "speaking" || state === "listening");

        return (
          <span
            key={index}
            className={cn(
              "w-[var(--bar-width)] min-h-[var(--bar-min-height)] max-h-[var(--bar-max-height)] rounded-full origin-center transition-[background-color,opacity]",
              colorClass,
              cond(hasActiveVolume, undefined, animationClass)
            )}
            style={{
              animationDelay,
              height: cond(
                hasActiveVolume,
                `calc(var(--bar-min-height) + (var(--bar-max-height) - var(--bar-min-height)) * ${volumeFactor})`,
                undefined
              )
            }}
          />
        );
      })}
    </div>
  );
});

OrbBars.displayName = "OrbBars";
