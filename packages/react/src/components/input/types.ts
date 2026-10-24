import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import type { Color, Radius, Size, Variant } from "../../types";

export type InputSize = Size;
export type InputVariant = Variant;
export type InputRadius = Radius;
export type InputColor = Color;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /**
   * Ref forwarded to the underlying native input element.
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Structural surface treatment.
   * - `outlined`: Default bordered boundary with resting hairline stroke.
   * - `contained`: Tinted subtle surface fill with subdued border.
   * - `plain`: Clean borderless container without resting background.
   * @default "outlined"
   */
  variant?: InputVariant;

  /**
   * Standard control scale size.
   * - `sm`: 32px frame (`--h-control-sm`)
   * - `md`: 40px frame (`--h-control-md`)
   * - `lg`: 48px frame (`--h-control-lg`)
   * @default "md"
   */
  size?: InputSize;

  /**
   * Border radius curvature for the container frame.
   * - `none`: Square container boundary.
   * - `sm`: Subtle 4px rounded corners (`rounded-sm`).
   * - `md`: Standard 6px rounded corners (`rounded-md`).
   * - `lg`: Prominent 8px rounded corners (`rounded-lg`).
   * - `full`: Continuous pill curvature (`rounded-full`).
   */
  radius?: InputRadius;

  /**
   * Optional primary textual or visual label associated with the input.
   */
  label?: ReactNode;

  /**
   * Optional helper text or guidance rendered beneath the input container.
   */
  description?: ReactNode;

  /**
   * Optional error message rendered beneath the input container.
   * Automatically sets `invalid` state when provided.
   */
  error?: ReactNode;

  /**
   * Whether the input is in an invalid/error state.
   * @default false
   */
  invalid?: boolean;

  /**
   * Slot rendered before the input element (e.g. prefix text, icon, or custom trigger).
   */
  leading?: ReactNode;

  /**
   * Slot rendered after the input element (e.g. suffix text, icon, custom clear button, or action).
   */
  trailing?: ReactNode;
}
