import type { HTMLAttributes, Ref } from "react";
import type { Size } from "../../types";

export type SpinnerSize = Size;
export type SpinnerColor = "current" | "primary" | "subtle" | "foreground" | "destructive";
export type SpinnerAnimation = "border" | "grow" | "orbit";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref forwarded to the native span container element.
   */
  ref?: Ref<HTMLSpanElement>;

  /**
   * Standard control scale size of the spinner.
   * - `sm`: 16px (size-4)
   * - `md`: 24px (size-6)
   * - `lg`: 32px (size-8)
   * @default "md"
   */
  size?: SpinnerSize;

  /**
   * Color token role.
   * Defaults to inheriting `currentColor` from parent element.
   * @default "current"
   */
  color?: SpinnerColor;

  /**
   * The animation variant of the spinner.
   * - `border`: High precision circular track with a rotating arc indicator.
   * - `grow`: Smooth radial pulse with organic breathing cadence.
   * - `orbit`: Orbital satellite nodes traversing along a celestial guide track.
   * @default "border"
   */
  animation?: SpinnerAnimation;

  /**
   * Accessible announcement for assistive technologies.
   * Sets aria-label and visually hidden fallback text.
   * @default "Loading"
   */
  label?: string;
}
