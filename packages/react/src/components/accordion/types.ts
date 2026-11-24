import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";
import type { Variant, Size } from "../../types";

export type AccordionIndicatorPlacement = "leading" | "trailing";

export interface AccordionIndicatorConfig {
  icon: ReactNode;
  placement?: AccordionIndicatorPlacement;
  rotate?: boolean;
}

export type AccordionIndicatorProp = ReactNode | AccordionIndicatorConfig;

export interface AccordionIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  rotate?: boolean;
  children?: ReactNode;
}

export interface AccordionItemDefinition {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  leading?: ReactNode;
  description?: ReactNode;
  trailing?: ReactNode;
  indicator?: AccordionIndicatorProp;
  disabled?: boolean;
}

export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  collapsible?: boolean;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  indicator?: AccordionIndicatorProp;
  items?: AccordionItemDefinition[];
  children?: ReactNode;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
}

export interface AccordionTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  leading?: ReactNode;
  description?: ReactNode;
  trailing?: ReactNode;
  indicator?: AccordionIndicatorProp;
  children?: ReactNode;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
