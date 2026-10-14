import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";

export type CardVariant = "outlined" | "filled";

export type CardPadding = "none" | "sm" | "surface";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /**
   * Ref forwarded to the underlying element.
   */
  ref?: Ref<HTMLElement>;

  /**
   * The polymorphic element type to render.
   * @default "div"
   */
  as?: ElementType;

  /**
   * Visual surface styling variant.
   * - `outlined`: Transparent background with subtle border stroke.
   * - `filled`: Solid surface background with subtle border stroke.
   * @default "outlined"
   */
  variant?: CardVariant;

  /**
   * Internal padding scale.
   * - `none`: 0 padding
   * - `sm`: Compact padding (p-4)
   * - `surface`: Standard token surface padding (p-surface)
   * @default "surface"
   */
  padding?: CardPadding;

  /**
   * Card children content.
   */
  children?: ReactNode;
}
