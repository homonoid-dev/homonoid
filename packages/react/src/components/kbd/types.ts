import type { HTMLAttributes, ReactNode, Ref } from "react";
import type { Size, Radius, Variant, Color } from "../../types";

export type KbdSize = Size;
export type KbdRadius = Radius;
export type KbdVariant = Variant;
export type KbdColor = Color;

export type KbdKeyValue =
  | "command"
  | "cmd"
  | "shift"
  | "ctrl"
  | "control"
  | "option"
  | "alt"
  | "enter"
  | "return"
  | "delete"
  | "backspace"
  | "escape"
  | "esc"
  | "tab"
  | "capslock"
  | "up"
  | "arrowup"
  | "down"
  | "arrowdown"
  | "left"
  | "arrowleft"
  | "right"
  | "arrowright"
  | "space"
  | (string & {});

export interface KbdAbbrProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;

  /**
   * Semantic key identifier representing a standard keyboard modifier or action key.
   */
  keyValue?: KbdKeyValue;
}

export interface KbdContentProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}

export interface KbdProps extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  ref?: Ref<HTMLElement>;

  /**
   * Surface display variant.
   * - `contained`: Solid filled background.
   * - `outlined`: Transparent background with border outline.
   * - `plain`: Borderless flat key presentation.
   * @default "contained"
   */
  variant?: KbdVariant;

  /**
   * Semantic color palette.
   * - `surface`: Standard neutral keyboard badge.
   * - `subtle`: Chroma subtle tint.
   * - `primary`: Chroma brand accent.
   * - `destructive`: Destructive red emphasis.
   * @default "surface"
   */
  color?: KbdColor;

  /**
   * Standard control scale size.
   * @default "md"
   */
  size?: KbdSize;

  /**
   * Border radius curvature for the container boundary.
   */
  radius?: KbdRadius;

  /**
   * Semantic modifier key or list of modifier keys to render automatically.
   */
  keyValue?: KbdKeyValue | readonly KbdKeyValue[];

  /**
   * Primary key label or alphanumeric character content.
   */
  content?: ReactNode;

  /**
   * Additional CSS classes.
   */
  className?: string;
}
