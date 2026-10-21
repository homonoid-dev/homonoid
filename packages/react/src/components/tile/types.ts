import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import type { Radius, Size } from "../../types";

export type TileVariant = "plain" | "contained" | "outlined";
export type TileColor = "surface" | "subtle" | "primary" | "destructive";
export type TileSize = Size;
export type TileRadius = Radius;

export interface TileProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /**
   * Ref forwarded to the root element.
   */
  ref?: Ref<HTMLElement>;

  /**
   * Underlying HTML element tag or component to render.
   * Defaults to button when interactive or div when static.
   */
  as?: ElementType;

  /**
   * Structural surface treatment.
   * plain provides a transparent background with subtle hover and active feedback.
   * contained provides a solid surface fill.
   * outlined frames the surface with a hairline border.
   * @default "plain"
   */
  variant?: TileVariant;

  /**
   * Semantic color palette intent.
   * surface provides the standard neutral container palette.
   * subtle provides a low contrast secondary tint.
   * primary provides a brand accent tint.
   * destructive provides an alert tint.
   * @default "surface"
   */
  color?: TileColor;

  /**
   * Standard control scale density.
   * @default "md"
   */
  size?: TileSize;

  /**
   * Corner radius curvature.
   * @default "lg"
   */
  radius?: TileRadius;

  /**
   * Whether the tile is interactive.
   * Inferred from the presence of onClick, href, or interactive role when omitted.
   */
  interactive?: boolean;

  /**
   * Whether the tile is currently selected or active.
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the tile is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional leading slot element such as an icon, avatar, or indicator.
   */
  leading?: ReactNode;

  /**
   * Optional primary headline copy or node.
   */
  label?: ReactNode;

  /**
   * Optional alias for label.
   */
  title?: ReactNode;

  /**
   * Optional supporting subtitle or description copy.
   */
  description?: ReactNode;

  /**
   * Optional trailing slot element such as a chevron, switch, or badge.
   */
  trailing?: ReactNode;
}

export interface TileLeadingProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

export interface TileContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

export interface TileTrailingProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}
