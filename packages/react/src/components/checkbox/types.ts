import type { HTMLAttributes, InputHTMLAttributes, ReactNode, Ref } from "react";
import type { Radius, Size } from "../../types";

export type CheckboxSize = Size;
export type CheckboxRadius = Radius;

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

  /**
   * Compound subcomponents or custom child layout.
   */
  children?: ReactNode;
}

export interface CheckboxControlProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional content inside the control container, such as Checkbox.Indicator.
   */
  children?: ReactNode;
}

export interface CheckboxIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional custom glyph or icon replacing the standard checkmark and horizontal bar.
   */
  children?: ReactNode;
}

export interface CheckboxContentProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Textual label and description content.
   */
  children?: ReactNode;
}

export type CheckboxPlacement = "leading" | "trailing";

export interface CheckboxTileProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Ref forwarded to the root tile container element.
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Optional form input name.
   */
  name?: string;

  /**
   * Optional form input value.
   */
  value?: string;

  /**
   * Tile structural variant.
   * @default "plain"
   */
  variant?: "plain" | "contained" | "outlined";

  /**
   * Semantic color intent.
   * @default "surface"
   */
  color?: "surface" | "subtle" | "primary" | "destructive";

  /**
   * Standard control scale size.
   * @default "md"
   */
  size?: CheckboxSize;

  /**
   * Corner radius curvature for the tile container.
   * @default "lg"
   */
  radius?: CheckboxRadius;

  /**
   * Controlled checked state.
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
   * Whether the checkbox tile is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is in an invalid state.
   * @default false
   */
  invalid?: boolean;

  /**
   * Whether the tile renders in a selected visual state.
   * @default false
   */
  selected?: boolean;

  /**
   * Where to place the checkbox control within the tile.
   * - `trailing`: checkbox sits in the trailing accessory slot (default).
   * - `leading`: checkbox sits in the leading visual anchor slot.
   * @default "trailing"
   */
  placement?: CheckboxPlacement;

  /**
   * Leading accessory when placement is "trailing", or secondary leading accessory.
   */
  leading?: ReactNode;

  /**
   * Trailing accessory when placement is "leading", or secondary trailing accessory.
   */
  trailing?: ReactNode;

  /**
   * Primary label copy.
   */
  label?: ReactNode;

  /**
   * Secondary supporting description copy.
   */
  description?: ReactNode;

  /**
   * Callback invoked when the checked state toggles.
   */
  onChange?: (checked: boolean) => void;

  /**
   * Custom child content within the tile.
   */
  children?: ReactNode;

  /**
   * Additional CSS classes for the tile container.
   */
  className?: string;
}

