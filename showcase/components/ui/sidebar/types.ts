import type { HTMLAttributes, ReactNode, MouseEvent } from "react";

export type SidebarSide = "left" | "right";

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
   * Additional class name for the inner scrolling content container.
   */
  contentClassName?: string;

  /**
   * Children content within the sidebar.
   */
  children?: ReactNode;
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

export interface SidebarItemProps {
  /**
   * Destination URL or in-page anchor hash (e.g. "#variants").
   */
  href?: string;

  /**
   * Visual presentation style.
   * - `tile`: Render using the Tile component with tactile states and background fills.
   * - `plain`: Render using the minimal transparent text-only style without backgrounds.
   * @default "tile" for left sidebar, "plain" for right sidebar
   */
  variant?: "tile" | "plain";

  /**
   * Optional trailing icon displayed on the right edge.
   */
  icon?: ReactNode;

  /**
   * Explicit active state override for in-page section spy.
   */
  active?: boolean;

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

export type SidebarDestinationProps = SidebarItemProps;
