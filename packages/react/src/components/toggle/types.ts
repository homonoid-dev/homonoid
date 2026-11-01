import type {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
} from "react";
import type { Color, Radius, Size, Variant } from "../../types";

export type ToggleVariant = Variant;
export type ToggleColor = Color;
export type ToggleSize = Size;
export type ToggleRadius = Radius;

export type ToggleType = "single" | "multiple";
export type ToggleOrientation = "horizontal" | "vertical";

export interface ToggleProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onClick" | "onChange"> {
  ref?: Ref<HTMLButtonElement>;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  color?: ToggleColor;
  size?: ToggleSize;
  radius?: ToggleRadius;
  layout?: "inline" | "full" | "icon";
  disabled?: boolean;
  value?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

export interface ToggleGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  type?: ToggleType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  variant?: ToggleVariant;
  color?: ToggleColor;
  size?: ToggleSize;
  radius?: ToggleRadius;
  orientation?: ToggleOrientation;
  disabled?: boolean;
  rovingFocus?: boolean;
  docked?: boolean;
  children?: ReactNode;
}

export interface ToggleItemProps extends ToggleProps {
  value: string;
}
