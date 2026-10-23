import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import type { Variant, Color, Radius, Size } from "../../types";

export type ButtonVariant = Variant;
export type ButtonColor = Color;
export type ButtonSize = Size;
export type ButtonRadius = Radius;
export type ButtonLayout = "inline" | "full" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Ref forwarded to the native button element.
   */
  ref?: Ref<HTMLButtonElement>;

  /**
   * Structural surface treatment.
   * - `contained`: Solid background fill.
   * - `outlined`: Transparent background with border outline.
   * - `plain`: Flat plain text/icon button (no background, no border).
   * @default "plain"
   */
  variant?: ButtonVariant;

  /**
   * Semantic color palette intent.
   * - `primary`: Chroma brand primary.
   * - `subtle`: Chroma subtle.
   * - `surface`: Chroma surface.
   * - `destructive`: Chroma destructive.
   * @default "primary"
   */
  color?: ButtonColor;

  /**
   * Standard control scale size.
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Corner radius curvature.
   * - `none`: Flat square corners.
   * - `sm`: Small rounded corners.
   * - `md`: Medium rounded corners.
   * - `lg`: Large rounded corners.
   * - `full`: Capsule pill or circular corners.
   * @default "full"
   */
  radius?: ButtonRadius;

  /**
   * Layout behavior and bounding frame.
   * @default "inline"
   */
  layout?: ButtonLayout;

  /**
   * Whether the button is in a loading state.
   * Preserves container geometry while morphing the label into a loading indicator.
   * @default false
   */
  loading?: boolean;

  /**
   * An optional icon to display before the label.
   */
  leading?: ReactNode;

  /**
   * An optional icon to display after the label.
   */
  trailing?: ReactNode;
}
