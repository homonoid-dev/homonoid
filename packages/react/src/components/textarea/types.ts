import type { TextareaHTMLAttributes, ReactNode, Ref } from "react";
import type { Radius, Size, Variant } from "../../types";

export type TextareaSize = Size;
export type TextareaVariant = Variant;
export type TextareaRadius = Radius;
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /**
   * Ref forwarded to the underlying native textarea element.
   */
  ref?: Ref<HTMLTextAreaElement>;

  /**
   * Structural surface treatment.
   * - `outlined`: Bordered boundary with resting hairline stroke.
   * - `contained`: Tinted subtle surface fill with subdued border.
   * - `plain`: Clean borderless container without resting background.
   * @default "outlined"
   */
  variant?: TextareaVariant;

  /**
   * Standard control scale size.
   * - `sm`: Compact typography and tight insets.
   * - `md`: Standard typography and balanced insets.
   * - `lg`: Prominent typography and generous insets.
   * @default "md"
   */
  size?: TextareaSize;

  /**
   * Border radius curvature for the container frame.
   * - `none`: Square container boundary (`rounded-none`).
   * - `sm`: Subtle rounded corners (`rounded-md`).
   * - `md`: Standard rounded corners (`rounded-lg`).
   * - `lg`: Prominent rounded corners (`rounded-xl`).
   * - `full`: Continuous pill curvature along container edges (`rounded-2xl`).
   * @default "md"
   */
  radius?: TextareaRadius;

  /**
   * Optional primary textual or visual label associated with the textarea.
   */
  label?: ReactNode;

  /**
   * Whether the label transitions smoothly into a floating state upon focus or content presence.
   * @default false
   */
  floating?: boolean;

  /**
   * Alias for `floating`.
   * @default false
   */
  floatingLabel?: boolean;

  /**
   * Optional custom styling class for the floating label background mask.
   */
  floatingLabelClassName?: string;

  /**
   * Optional helper text or guidance rendered beneath the textarea container.
   */
  description?: ReactNode;

  /**
   * Optional error message rendered beneath the textarea container.
   * Automatically sets `invalid` state when provided.
   */
  error?: ReactNode;

  /**
   * Whether the textarea is in an invalid or error state.
   * @default false
   */
  invalid?: boolean;

  /**
   * Whether the textarea expands vertically automatically based on content volume.
   * @default false
   */
  autoResize?: boolean;

  /**
   * Minimum row boundary when auto resize is active.
   * @default 3
   */
  minRows?: number;

  /**
   * Maximum row boundary before enabling native vertical scrolling.
   * @default 10
   */
  maxRows?: number;

  /**
   * Manual resize handle direction.
   * - `none`: Resizing disabled.
   * - `vertical`: Vertical resizing only.
   * - `horizontal`: Horizontal resizing only.
   * - `both`: Both directions enabled.
   * @default "vertical"
   */
  resize?: TextareaResize;

  /**
   * Optional leading slot rendered before the textarea.
   */
  leading?: ReactNode;

  /**
   * Optional trailing slot rendered after the textarea.
   */
  trailing?: ReactNode;
}

