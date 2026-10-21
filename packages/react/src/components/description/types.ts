import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type DescriptionVariant = "muted" | "surface";
export type DescriptionSize = Size;

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
   * Typographic scale size.
   * - `sm`: 0.75rem (12px), compact captions and control helpers
   * - `md`: 0.875rem (14px), standard secondary copy
   * - `lg`: 1.0rem (16px), regular body description
   * @default "sm"
   */
  size?: DescriptionSize;

  /**
   * Description content.
   */
  children?: ReactNode;
}
