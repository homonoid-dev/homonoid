import type {
  HTMLAttributes,
  ButtonHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
  ComponentType,
} from "react";
import type { Color, Radius, Size, Variant } from "../../types";

export type TabsVariant = Variant;
export type TabsColor = Color;
export type TabsSize = Size;
export type TabsRadius = Radius;
export type TabsOrientation = "horizontal" | "vertical";

export interface TabsItem {
  value: string;
  label?: ReactNode;
  icon?: ComponentType<{ className?: string }> | ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  ref?: Ref<HTMLDivElement>;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  color?: TabsColor;
  size?: TabsSize;
  radius?: TabsRadius;
  orientation?: TabsOrientation;
  disabled?: boolean;
  rovingFocus?: boolean;
  items?: TabsItem[];
  children?: ReactNode;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  variant?: TabsVariant;
  color?: TabsColor;
  size?: TabsSize;
  radius?: TabsRadius;
  orientation?: TabsOrientation;
  rovingFocus?: boolean;
  children?: ReactNode;
}

export interface TabsTabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  ref?: Ref<HTMLButtonElement>;
  value: string;
  disabled?: boolean;
  variant?: TabsVariant;
  color?: TabsColor;
  size?: TabsSize;
  radius?: TabsRadius;
  layout?: "inline" | "full" | "icon";
  leading?: ReactNode;
  trailing?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  value: string;
  children?: ReactNode;
}
