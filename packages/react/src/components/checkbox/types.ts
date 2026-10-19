import type { InputHTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type CheckboxSize = Size;
export type CheckboxRadius = "none" | "sm" | "md" | "lg" | "full";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "checked"> {
  /**
   * Ref forwarded to the underlying native input element.
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Standard control scale size.
   * - `sm`: 16px × 16px
   * - `md`: 20px × 20px
   * - `lg`: 24px × 24px
   * @default "md"
   */
  size?: CheckboxSize;

  /**
   * Corner radius curvature.
   * - `none`: Sharp square corners (`rounded-none`).
   * - `sm`: Small rounded corners (`rounded-sm`).
   * - `md`: Medium rounded corners (`rounded-md`).
   * - `lg`: Large rounded corners (`rounded-lg`).
   * - `full`: Circular checkbox (`rounded-full`).
   * @default "md"
   */
  radius?: CheckboxRadius;

  /**
   * Controlled checked state.
   * Can be a boolean or `"indeterminate"` for mixed parent selections.
   */
  checked?: boolean | "indeterminate";

  /**
   * Default checked state for uncontrolled mode.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Whether the checkbox is in an indeterminate state.
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Whether the checkbox is in an invalid / validation error state.
   * @default false
   */
  invalid?: boolean;

  /**
   * Optional textual label rendered alongside the checkbox control.
   */
  label?: ReactNode;

  /**
   * Optional secondary description rendered beneath the label.
   */
  description?: ReactNode;

  /**
   * Callback invoked when the checked state toggles.
   */
  onChange?: (checked: boolean) => void;
}
