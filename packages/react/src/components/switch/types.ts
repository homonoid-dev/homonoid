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

export type SwitchPlacement = "leading" | "trailing";

export interface SwitchTileProps
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
  size?: SwitchSize;

  /**
   * Corner radius curvature for the tile container.
   * @default "lg"
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
   * Whether the switch tile is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the switch is in an invalid state.
   * @default false
   */
  invalid?: boolean;

  /**
   * Whether the tile renders in a selected visual state.
   * @default false
   */
  selected?: boolean;

  /**
   * Where to place the switch control within the tile.
   * - `trailing`: switch sits in the trailing accessory slot (default).
   * - `leading`: switch sits in the leading visual anchor slot.
   * @default "trailing"
   */
  placement?: SwitchPlacement;

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

