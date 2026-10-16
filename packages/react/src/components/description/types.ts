import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";

export type DescriptionVariant = "muted" | "surface";

export interface DescriptionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Ref forwarded to the underlying element.
   */
  ref?: Ref<HTMLElement>;

  /**
   * The polymorphic element type to render.
   * @default "p"
   */
  as?: ElementType;

  /**
   * Visual intent variant.
   * - `muted`: Subdued neutral tone (`text-muted`).
   * - `surface`: Primary neutral foreground tone (`text-foreground`).
   * @default "muted"
   */
  variant?: DescriptionVariant;

  /**
   * Description content.
   */
  children?: ReactNode;
}
