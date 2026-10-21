import type {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
} from "react";
import type { Placement } from "@floating-ui/react";
import type { Radius, Size } from "../../types";

export type DropdownSize = Size;
export type DropdownRadius = Radius;
export type DropdownColor = "surface" | "subtle" | "primary" | "destructive";

export interface DropdownProps {
  /**
   * Controlled open state.
   */
  open?: boolean;

  /**
   * Initial uncontrolled open state.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Preferred floating placement relative to trigger.
   * @default "bottom-start"
   */
  placement?: Placement;

  /**
   * Distance in pixels between trigger and floating menu surface.
   * @default 8
   */
  offset?: number;

  /**
   * Spatial density scale passed down to menu items.
   * @default "md"
   */
  size?: DropdownSize;

  /**
   * Corner radius token applied to the menu surface.
   * @default "lg"
   */
  radius?: DropdownRadius;

  /**
   * Whether the dropdown menu is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom id for DOM association.
   */
  id?: string;

  /**
   * Dropdown subcomponents or child nodes.
   */
  children?: ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

export interface DropdownTriggerProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;

  /**
   * Pass Floating UI trigger props and ref directly into the single child element.
   * @default false
   */
  asChild?: boolean;

  /**
   * Trigger content.
   */
  children?: ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Menu content children.
   */
  children?: ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * Inline styles.
   */
  style?: CSSProperties;
}

export interface DropdownListProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  /**
   * List item children.
   */
  children?: ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

export interface DropdownItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Action callback executed upon clicking or keyboard activation.
   */
  onSelect?: (event: Event) => void;

  /**
   * Click event handler.
   */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;

  /**
   * Visual intent color for the item.
   * @default "surface"
   */
  color?: DropdownColor;

  /**
   * Leading accessory slot such as an icon.
   */
  leading?: ReactNode;

  /**
   * Trailing accessory slot such as a keyboard shortcut badge.
   */
  trailing?: ReactNode;

  /**
   * Primary title copy.
   */
  label?: ReactNode;

  /**
   * Secondary supporting text.
   */
  description?: ReactNode;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether activating the item automatically dismisses the dropdown menu.
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Arbitrary children if not using label prop.
   */
  children?: ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

export interface DropdownGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Group children.
   */
  children?: ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}

export interface DropdownSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Additional CSS classes.
   */
  className?: string;
}
