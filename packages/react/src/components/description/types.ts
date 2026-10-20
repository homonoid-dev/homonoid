import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type DescriptionVariant = "muted" | "surface";
export type DescriptionSize = Size | "xs";

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
   * - `xs`: 0.75rem (12px), compact captions
   * - `sm`: 0.875rem (14px), standard secondary copy
   * - `md`: 1.0rem (16px), regular body description
   * - `lg`: 1.125rem (18px), prominent introductory description
   * @default "sm"
   */
  size?: DescriptionSize;

  /**
   * Description content.
   */
  children?: ReactNode;
}
