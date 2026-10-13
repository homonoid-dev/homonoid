import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type ButtonVariant = "contained" | "outlined" | "plain";
export type ButtonColor = "primary" | "subtle" | "destructive";
export type ButtonSize = Size;
export type ButtonShape = "circle" | "square";
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
   * - `subtle`: Low-contrast neutral/secondary.
   * - `destructive`: Red alert / danger action.
   * @default "primary"
   */
  color?: ButtonColor;

  /**
   * Standard control scale size.
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Geometric shape override.
   */
  shape?: ButtonShape;

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
