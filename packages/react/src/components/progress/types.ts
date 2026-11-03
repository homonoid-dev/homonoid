import type { HTMLAttributes, Ref } from "react";
import type { Color, Size } from "../../types";

export type ProgressSize = Size;
export type ProgressColor = Color | "current";
export type ProgressVariant = "circular" | "linear";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the container element.
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Current numeric progress value.
   * Clamped between `min` and `max`.
   * When undefined, component renders in an indeterminate mode.
   * @default 0
   */
  value?: number;

  /**
   * Minimum possible value.
   * @default 0
   */
  min?: number;

  /**
   * Maximum possible value.
   * @default 100
   */
  max?: number;

  /**
   * Presentation variant.
   * - `circular`: Radial SVG ring indicator.
   * - `linear`: Horizontal track bar indicator.
   * @default "circular"
   */
  variant?: ProgressVariant;

  /**
   * Standard control scale size of the progress indicator.
   * Circular:
   * - `sm`: 16px (size-4)
   * - `md`: 24px (size-6)
   * - `lg`: 32px (size-8)
   * Linear:
   * - `sm`: 4px height (h-1)
   * - `md`: 8px height (h-2)
   * - `lg`: 12px height (h-3)
   * @default "md"
   */
  size?: ProgressSize;

  /**
   * Color token role.
   * Defaults to primary.
   * @default "primary"
   */
  color?: ProgressColor;

  /**
   * Accessible description label for assistive technologies.
   * @default "Progress"
   */
  label?: string;

  /**
   * Human readable description of current progress.
   * Sets aria-valuetext.
   */
  valueText?: string;
}

