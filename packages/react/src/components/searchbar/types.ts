import type { ReactNode, Ref } from "react";
import type { InputProps } from "../input/types";

export type SearchbarSize = "sm" | "md" | "lg";
export type SearchbarVariant = "outlined" | "filled" | "plain";
export type SearchbarRadius = "none" | "sm" | "md" | "lg" | "full";

export interface SearchbarProps
  extends Omit<InputProps, "size" | "variant"> {
  /**
   * Ref forwarded to the underlying native input element.
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Standard control scale size.
   * @default "md"
   */
  size?: SearchbarSize;

  /**
   * Structural surface treatment.
   * @default "outlined"
   */
  variant?: SearchbarVariant;

  /**
   * Border radius curvature for the container frame.
   */
  radius?: SearchbarRadius;

  /**
   * Whether an asynchronous search operation is in progress.
   * When true, renders a Spinner in place of the leading slot.
   * @default false
   */
  loading?: boolean;

  /**
   * Keyboard shortcut indicator displayed within the trailing slot.
   */
  shortcut?: ReactNode;

  /**
   * Callback fired when user submits a query via Enter key press.
   */
  onSearch?: (value: string) => void;
}
