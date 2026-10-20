import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";

export type CardVariant = "outlined" | "filled";

export type CardColor = "surface" | "subtle" | "primary" | "destructive";

export type CardPadding = "none" | "sm" | "md" | "lg" | "surface";

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
   * - `outlined`: Transparent background with optional border stroke.
   * - `filled`: Solid surface background with optional border stroke.
   * @default "outlined"
   */
  variant?: CardVariant;

  /**
   * Semantic color palette intent.
   * - `surface`: Neutral background and border.
   * - `subtle`: Low-contrast Chroma subtle tint and border.
   * - `primary`: Chroma brand primary highlight.
   * - `destructive`: Danger alert / error callout.
   * @default "surface"
   */
  color?: CardColor;

  /**
   * Whether to display a hairline border stroke.
   * @default true
   */
  border?: boolean;

  /**
   * Internal padding scale.
   * - `none`: 0 padding
   * - `sm`: Compact surface padding (p-surface-sm)
   * - `md`: Medium surface padding (p-surface-md)
   * - `lg`: Large surface padding (p-surface-lg)
   * - `surface`: Standard token surface padding (p-surface)
   * @default "surface"
   */
  padding?: CardPadding;

  /**
   * Card children content.
   */
  children?: ReactNode;
}
