import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type InputSize = Size;
export type InputVariant = "outlined" | "filled" | "plain";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /**
   * Ref forwarded to the underlying native input element.
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Structural surface treatment.
   * - `outlined`: Default bordered boundary with resting hairline stroke.
   * - `filled`: Tinted subtle surface fill with subdued border.
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
   * Visual adornment placed before the text entry area (e.g., search icon or prefix).
   */
  leading?: ReactNode;

  /**
   * Visual adornment placed after the text entry area (e.g., unit label, trailing icon).
   */
  trailing?: ReactNode;

  /**
   * Whether to display an interactive clear button when text is present.
   * Clicking the button clears the input value and invokes `onClear`.
   * @default false
   */
  clearable?: boolean;

  /**
   * Callback fired when the clear button is clicked.
   */
  onClear?: () => void;

  /**
   * Optional class name applied directly to the interactive input frame container.
   */
  containerClassName?: string;
}
