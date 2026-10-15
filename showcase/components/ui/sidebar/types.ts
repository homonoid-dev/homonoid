import type { HTMLAttributes, ReactNode, MouseEvent } from "react";

export type SidebarSide = "left" | "right";
export type SidebarDestinationKeep = "label" | "icon";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Docking orientation of the sidebar.
   * - `left`: Renders with a right border (`border-r`).
   * - `right`: Renders with a left border (`border-l`).
   * @default "left"
   */
  side?: SidebarSide;

  /**
   * Whether the sidebar can collapse into a compact mode.
   * @default false
   */
  collapsible?: boolean;

  /**
   * Controlled collapsed state.
   */
  collapsed?: boolean;

  /**
   * Default collapsed state for uncontrolled mode.
   * @default false
   */
  defaultCollapsed?: boolean;

  /**
   * Callback fired when collapsed state changes.
   */
  onCollapsedChange?: (collapsed: boolean) => void;

  /**
   * Children content within the sidebar.
   */
  children?: ReactNode;
}

export interface SidebarToggleProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "color"> {
  /**
   * Optional custom aria-label override.
   */
  "aria-label"?: string;
}

export interface SidebarHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Whether the sidebar header stays pinned at the top during scrolling.
   */
  sticky?: boolean;

  /**
   * Children content within the sidebar header.
   */
  children?: ReactNode;
}

export interface SidebarDestinationProps {
  /**
   * Destination URL or in-page anchor hash (e.g. "#variants").
   */
  href?: string;

  /**
   * Optional trailing icon displayed on the right edge.
   */
  icon?: ReactNode;

  /**
   * Explicit active state override for in-page section spy.
   */
  active?: boolean;

  /**
   * What element to preserve when the enclosing sidebar is collapsed.
   * - `icon`: Retains the icon centered and smoothly hides the text label.
   * - `label`: Retains the text label and smoothly hides the icon.
   * @default "icon"
   */
  keep?: SidebarDestinationKeep;

  /**
   * Click handler callback.
   */
  onClick?: (e: MouseEvent<HTMLElement>) => void;

  /**
   * Content label.
   */
  children?: ReactNode;

  /**
   * Custom className override.
   */
  className?: string;
}
