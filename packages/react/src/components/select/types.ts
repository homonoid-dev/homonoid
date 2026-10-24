import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import type { Variant, Radius, Size, Color } from "../../types";

export type SelectVariant = Variant;
export type SelectColor = Color
export type SelectSize = Size;
export type SelectRadius = Radius;

export interface SelectOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  invalid?: boolean;
  size?: SelectSize;
  radius?: SelectRadius;
  variant?: SelectVariant;
  color?: SelectColor;
  placeholder?: string;
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  options?: SelectOption[];
  id?: string;
  name?: string;
  className?: string;
}

export interface SelectTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  children?: ReactNode;
}

export interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  placeholder?: string;
  children?: ReactNode;
}

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
  className?: string;
}

export interface SelectListProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

export interface SelectItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "color"> {
  ref?: Ref<HTMLDivElement>;
  value: string;
  disabled?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export interface SelectGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  label?: ReactNode;
  children?: ReactNode;
}
