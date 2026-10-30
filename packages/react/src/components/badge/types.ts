import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import type { Color, Radius, Size } from "../../types";

export type BadgeVariant = "contained" | "outlined" | "plain";
export type BadgeColor = Color;
export type BadgeSize = Size;
export type BadgeRadius = Radius;
export type BadgePlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  /**
   * Ref forwarded to the root element.
   */
  ref?: Ref<HTMLElement>;

  /**
   * Custom element tag or component to render.
   * @default "span"
   */
  as?: ElementType;

  /**
   * Structural surface treatment.
   * @default "contained"
   */
  variant?: BadgeVariant;

  /**
   * Semantic color palette.
   * @default "primary"
   */
  color?: BadgeColor;

  /**
   * Dimensional density scale.
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Corner radius curvature.
   * @default "full"
   */
  radius?: BadgeRadius;

  /**
   * Whether to render as a standalone circular indicator dot.
   * @default false
   */
  dot?: boolean;

  /**
   * Numeric quantity to display inside the badge.
   */
  count?: number;

  /**
   * Maximum numeric threshold before displaying a plus suffix.
   * @default 99
   */
  max?: number;

  /**
   * Corner overlay placement when anchored over target children.
   */
  placement?: BadgePlacement;

  /**
   * Optional leading slot element such as a status dot or icon.
   */
  leading?: ReactNode;

  /**
   * Optional trailing slot element such as a count or accessory.
   */
  trailing?: ReactNode;

  /**
   * Primary text label copy.
   */
  label?: ReactNode;
}

export interface BadgeAnchorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the anchor element.
   */
  ref?: Ref<HTMLDivElement>;
}

export interface BadgeIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref forwarded to the indicator element.
   */
  ref?: Ref<HTMLSpanElement>;

  /**
   * Structural surface treatment.
   * @default "contained"
   */
  variant?: BadgeVariant;

  /**
   * Semantic color palette.
   * @default "primary"
   */
  color?: BadgeColor;

  /**
   * Dimensional density scale.
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Corner radius curvature.
   * @default "full"
   */
  radius?: BadgeRadius;

  /**
   * Whether to render as a circular indicator dot without text.
   * @default false
   */
  dot?: boolean;

  /**
   * Numeric count to display.
   */
  count?: number;

  /**
   * Maximum count threshold before applying plus suffix.
   * @default 99
   */
  max?: number;

  /**
   * Corner anchor placement.
   */
  placement?: BadgePlacement;
}

export interface BadgeLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref forwarded to the label element.
   */
  ref?: Ref<HTMLSpanElement>;
}

export interface BadgeLeadingProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref forwarded to the leading element.
   */
  ref?: Ref<HTMLSpanElement>;
}

export interface BadgeTrailingProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref forwarded to the trailing element.
   */
  ref?: Ref<HTMLSpanElement>;
}

