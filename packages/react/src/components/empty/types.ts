import type { HTMLAttributes, ReactNode, Ref } from "react";

export type EmptyVariant = "plain" | "outlined" | "contained";
export type EmptySize = "sm" | "md" | "lg";
export type EmptyBorderStyle = "dashed" | "solid";

export interface EmptyProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  ref?: Ref<HTMLDivElement>;
  variant?: EmptyVariant;
  size?: EmptySize;
  borderStyle?: EmptyBorderStyle;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}

export interface EmptyMediaProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  variant?: "default" | "subtle" | "surface";
  children?: ReactNode;
}

export interface EmptyHeaderProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

export interface EmptyTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
  as?: "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  children?: ReactNode;
}

export interface EmptyDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
  as?: "p" | "span" | "div";
  children?: ReactNode;
}

export interface EmptyActionsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}
