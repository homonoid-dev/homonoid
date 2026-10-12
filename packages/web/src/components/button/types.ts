import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./Button";

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
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
  leadingIcon?: ReactNode;

  /**
   * An optional icon to display after the label.
   */
  trailingIcon?: ReactNode;
}
