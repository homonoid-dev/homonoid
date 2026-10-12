import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import type { VariantProps } from "class-variance-authority";
import type { variants } from "./Button";

export type ButtonVariant = NonNullable<VariantProps<typeof variants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof variants>["size"]>;
export type ButtonShape = NonNullable<VariantProps<typeof variants>["shape"]>;
export type ButtonLayout = NonNullable<VariantProps<typeof variants>["layout"]>;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof variants> {
  /**
   * Ref forwarded to the native button element.
   */
  ref?: Ref<HTMLButtonElement>;

  /**
   * Whether the button is in a loading state.
   * Preserves container geometry while morphing the label into a loading indicator.
   * @default false
   */
  loading?: boolean;

  /**
   * An optional icon to display before the label.
   */
  leading?: ReactNode;

  /**
   * An optional icon to display after the label.
   */
  trailing?: ReactNode;
}
