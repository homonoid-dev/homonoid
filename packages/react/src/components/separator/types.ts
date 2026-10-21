import type { HTMLAttributes, Ref } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Layout axis along which the separator divides content.
   * @default "horizontal"
   */
  orientation?: SeparatorOrientation;

  /**
   * Whether the separator is purely visual and should be ignored by assistive technology.
   * When false, assigns role="separator" and aria-orientation.
   * @default true
   */
  decorative?: boolean;

  /**
   * Additional CSS classes.
   */
  className?: string;
}
