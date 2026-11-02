import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
} from "react";
import type { TileColor, TileSize, TileVariant } from "../tile/types";

export type SidebarCollapsible = "none" | "icon" | "offcanvas";
export type SidebarVariant = "fixed" | "floating" | "bordered";
export type SidebarSide = "left" | "right";

export interface SidebarItemData {
  value?: string;
  label?: ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  badge?: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export interface SidebarGroupData {
  id?: string;
  label?: ReactNode;
  items?: SidebarItemData[];
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;

  /**
   * Controlled collapsed state.
   */
  collapsed?: boolean;

  /**
   * Default initial collapsed state.
   * @default false
   */
  defaultCollapsed?: boolean;

  /**
   * Callback fired when collapsed state changes.
   */
  onCollapsedChange?: (collapsed: boolean) => void;

  /**
   * Collapsible mode behavior.
   * - `none`: Permanent fixed navigation column.
   * - `icon`: Condenses into a compact icon rail showing leading icons.
   * - `offcanvas`: Completely translates offscreen.
   * @default "icon"
   */
  collapsible?: SidebarCollapsible;

  /**
   * Structural surface styling.
   * - `fixed`: Default full height container with border contrast.
   * - `floating`: Inset card like surface elevated from screen edges.
   * - `bordered`: Subtle outline border without full height extension.
   * @default "bordered"
   */
  variant?: SidebarVariant;

  /**
   * Screen edge docking side.
   * @default "left"
   */
  side?: SidebarSide;

  /**
   * Optional custom width class when expanded.
   * @default "w-60"
   */
  width?: string;

  /**
   * Optional custom width class when collapsed.
   * @default "w-16"
   */
  collapsedWidth?: string;

  /**
   * Optional atomic header slot.
   */
  header?: ReactNode;

  /**
   * Optional atomic footer slot.
   */
  footer?: ReactNode;

  /**
   * Optional atomic groups collection for declarative assembly.
   */
  groups?: SidebarGroupData[];

  /**
   * Optional atomic standalone navigation items list.
   */
  items?: SidebarItemData[];

  /**
   * Compound subcomponent composition nodes.
   */
  children?: ReactNode;
}

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Whether the header stays pinned at the top during body scrolling.
   * @default false
   */
  sticky?: boolean;
}

export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Accessible heading title displayed above the navigation items.
   */
  label?: ReactNode;
}

export interface SidebarItemProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  ref?: Ref<HTMLElement>;

  /**
   * Underlying HTML tag or custom routing component (e.g. Next.js Link).
   * @default "a"
   */
  as?: any;

  /**
   * Target destination URL.
   */
  href?: string;

  /**
   * Whether the item represents the active route.
   * @default false
   */
  active?: boolean;

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Leading accessory icon or graphic.
   */
  leading?: ReactNode;

  /**
   * Trailing accessory icon, badge, or status indicator.
   */
  trailing?: ReactNode;

  /**
   * Optional badge text or counter rendered before trailing indicators.
   */
  badge?: ReactNode;

  /**
   * Custom tooltip caption displayed upon hover in collapsed icon rail mode.
   * Falls back to child text if not explicitly provided.
   */
  tooltip?: ReactNode;

  /**
   * Tile visual variant treatment.
   * @default "plain"
   */
  variant?: TileVariant;

  /**
   * Tile surface color treatment.
   * @default "surface"
   */
  color?: TileColor;

  /**
   * Control scale size determining typography and spatial padding from Tile.
   * @default "sm"
   */
  size?: TileSize;
}

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Whether the footer stays pinned at the bottom during body scrolling.
   * @default false
   */
  sticky?: boolean;
}

export interface SidebarSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface SidebarTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  ref?: Ref<HTMLButtonElement>;

  /**
   * Optional custom toggle icon.
   */
  icon?: ReactNode;
}

export interface SidebarRailProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
}
