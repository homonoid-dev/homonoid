import type { HTMLAttributes, InputHTMLAttributes, ReactNode, Ref } from "react";
import type { Radius, Size } from "../../types";

export type SwitchSize = Size;
export type SwitchRadius = Radius;

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "checked"> {
  /**
   * Ref forwarded to the underlying native input element.
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Standard control scale size.
   * - `sm`: Track 28px × 16px, Thumb 12px
   * - `md`: Track 44px × 24px, Thumb 20px
   * - `lg`: Track 56px × 32px, Thumb 24px
   * @default "md"
   */
  size?: SwitchSize;

  /**
   * Corner radius curvature of the track and thumb.
   * - `none`: Sharp rectilinear corners (`rounded-none`).
   * - `sm`: Small rounded corners (`rounded-sm`).
   * - `md`: Medium rounded corners (`rounded-md`).
   * - `lg`: Large rounded corners (`rounded-lg`).
   * - `full`: Standard pill capsule (`rounded-full`).
   * @default "full"
   */
  radius?: SwitchRadius;

  /**
   * Controlled checked state.
   */
  checked?: boolean;

  /**
   * Default checked state for uncontrolled mode.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Whether the switch is in an invalid / validation error state.
   * @default false
   */
  invalid?: boolean;

  /**
   * Optional textual label rendered alongside the switch control.
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

  /**
   * Compound child elements or custom layout.
   */
  children?: ReactNode;
}

export interface SwitchControlProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional content inside the track capsule, such as Switch.Thumb.
   */
  children?: ReactNode;
}

export interface SwitchThumbProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional icon or glyph centered inside the sliding thumb.
   */
  children?: ReactNode;
}

export interface SwitchContentProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Content grouping elements, such as Label and Description.
   */
  children?: ReactNode;
}
