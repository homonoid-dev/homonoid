import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";

export type AccordionVariant = "flush" | "bordered" | "separated";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionColor = "surface" | "primary" | "subtle";
export type AccordionHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface AccordionItemDefinition {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  leading?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  collapsible?: boolean;
  variant?: AccordionVariant;
  color?: AccordionColor;
  size?: AccordionSize;
  disabled?: boolean;
  items?: AccordionItemDefinition[];
  headingLevel?: AccordionHeadingLevel;
  children?: ReactNode;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
}

export interface AccordionTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asHeading?: AccordionHeadingLevel;
  leading?: ReactNode;
  description?: ReactNode;
  hideChevron?: boolean;
  chevronIcon?: ReactNode;
  children?: ReactNode;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
