import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type LabelSize = Size | "xs" | "2xs";

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
   * - `2xs`: 0.75rem (12px), font-medium
   * - `xs`: 0.875rem (14px), font-medium
   * - `sm`: 1.0rem (16px), font-semibold
   * - `md`: 1.125rem (18px), font-bold
   * - `lg`: 1.5rem (24px), font-bold
   * @default "lg"
   */
  size?: LabelSize;

  /**
   * Association identifier when rendered as an HTML label.
   */
  htmlFor?: string;

  /**
   * Label content.
   */
  children?: ReactNode;
}
