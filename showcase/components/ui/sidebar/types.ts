import type { HTMLAttributes, ReactNode, MouseEvent } from "react";
import type { TileProps } from "@homonoid/react";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
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
   * Visual presentation style matching Tile variant.
   * @default "plain"
   */
  variant?: TileProps["variant"];

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