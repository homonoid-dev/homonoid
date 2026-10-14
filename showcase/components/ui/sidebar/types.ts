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
