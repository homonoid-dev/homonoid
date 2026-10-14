import type { HTMLAttributes, ReactNode } from "react";

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
