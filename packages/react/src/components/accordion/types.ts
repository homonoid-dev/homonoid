import type { ReactNode, HTMLAttributes } from "react";
import type { TileColor } from "../tile/types";

export type AccordionVariant = "flush" | "bordered" | "separated";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionColor = TileColor;

export interface AccordionItemDefinition {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  leading?: ReactNode;
  description?: ReactNode;
  trailing?: ReactNode;
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
  children?: ReactNode;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
}

export interface AccordionTriggerProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  leading?: ReactNode;
  description?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
