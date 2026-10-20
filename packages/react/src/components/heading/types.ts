import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type HeadingSize = Size | "xl";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Ref forwarded to the underlying heading element.
   */
  ref?: Ref<HTMLHeadingElement>;

  /**
   * The polymorphic element type to render.
   * @default "h1"
   */
  as?: ElementType;

  /**
   * Typographic scale size.
   * - `sm`: 1.0rem (16px), font-semibold
   * - `md`: 1.125rem (18px), font-bold tracking-tight
   * - `lg`: 1.5rem (24px), font-bold tracking-tight
   * - `xl`: 1.875rem (30px), font-bold tracking-tight
   * @default "lg"
   */
  size?: HeadingSize;

  /**
   * Heading content.
   */
  children?: ReactNode;
}
