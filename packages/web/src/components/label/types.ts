import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type LabelSize = Size;

export interface LabelProps extends HTMLAttributes<HTMLElement> {
  /**
   * Ref forwarded to the underlying element.
   */
  ref?: Ref<HTMLElement>;

  /**
   * The polymorphic element type to render.
   * @default "h1"
   */
  as?: ElementType;

  /**
   * Typographic scale size.
   * - `sm`: 1.0rem (16px), font-semibold
   * - `md`: 1.125rem (18px), font-bold
   * - `lg`: 1.5rem (24px), font-bold
   * @default "lg"
   */
  size?: LabelSize;

  /**
   * Label content.
   */
  children?: ReactNode;
}
