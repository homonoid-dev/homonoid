import type { ElementType, LabelHTMLAttributes, ReactNode, Ref } from "react";
import type { Size } from "../../types";

export type LabelSize = Size;

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Ref forwarded to the underlying element.
   */
  ref?: Ref<HTMLElement>;

  /**
   * The polymorphic element type to render.
   * @default "label"
   */
  as?: ElementType;

  /**
   * Typographic scale size for control and form field labels.
   * - `sm`: 0.75rem (12px), font-medium
   * - `md`: 0.875rem (14px), font-medium
   * - `lg`: 1.0rem (16px), font-semibold
   * @default "md"
   */
  size?: LabelSize;

  /**
   * Association identifier when rendered as an HTML label.
   */
  htmlFor?: string;

  /**
   * Whether the associated control is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Label content.
   */
  children?: ReactNode;
}
