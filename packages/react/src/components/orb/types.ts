import type { HTMLAttributes, ReactNode } from "react";

export type OrbTheme = "cloud" | "bars";

export type OrbState =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "error";

export type OrbSize = "sm" | "md" | "lg";

export interface OrbBaseProps {
  /**
   * The visual theme layout of the voice orb.
   * @default "cloud"
   */
  theme?: OrbTheme;

  /**
   * The active conversational lifecycle state.
   * @default "idle"
   */
  state?: OrbState;

  /**
   * Normalized audio volume envelope amplitude between 0 and 1.
   * @default 0
   */
  volume?: number;

  /**
   * Standardized spatial dimensional scale.
   * @default "md"
   */
  size?: OrbSize;

  /**
   * Whether the orb functions as an interactive button control.
   * @default false
   */
  interactive?: boolean;

  /**
   * Optional accessible label announcing voice assistant state.
   */
  label?: string;

  /**
   * Optional custom child elements or custom center slot.
   */
  children?: ReactNode;
}

export interface OrbProps
  extends OrbBaseProps,
  Omit<HTMLAttributes<HTMLElement>, keyof OrbBaseProps> { }

export interface OrbBarsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The active conversational lifecycle state.
   * @default "idle"
   */
  state?: OrbState;

  /**
   * Normalized audio volume envelope amplitude between 0 and 1.
   * @default 0
   */
  volume?: number;

  /**
   * Standardized spatial dimensional scale.
   * @default "md"
   */
  size?: OrbSize;
}

export interface OrbCloudProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The active conversational lifecycle state.
   * @default "idle"
   */
  state?: OrbState;

  /**
   * Normalized audio volume envelope amplitude between 0 and 1.
   * @default 0
   */
  volume?: number;

  /**
   * Standardized spatial dimensional scale.
   * @default "md"
   */
  size?: OrbSize;
}
