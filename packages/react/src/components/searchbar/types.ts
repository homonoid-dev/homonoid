import type { Ref } from "react";
import type {
  InputProps,
  InputRadius,
  InputSize,
  InputVariant,
} from "../input/types";

export type SearchbarSize = InputSize;
export type SearchbarVariant = InputVariant;
export type SearchbarRadius = InputRadius;

export interface SearchbarProps
  extends Omit<InputProps, "size" | "variant" | "radius"> {
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
   * When true, sets aria-busy attribute on the searchbox container.
   * @default false
   */
  loading?: boolean;

  /**
   * Callback fired when user submits a query via Enter key press.
   */
  onSearch?: (value: string) => void;
}
