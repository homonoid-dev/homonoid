import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, CSSProperties } from "react";
import type { Placement } from "@floating-ui/react";

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";
export type PopoverVariant = "surface" | "primary" | "inverted";
export type PopoverSize = "sm" | "md" | "lg" | "auto";

export interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  side?: PopoverSide;
  align?: PopoverAlign;
  offset?: number;
  placement?: Placement;
  modal?: boolean;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  variant?: PopoverVariant;
  size?: PopoverSize;
  className?: string;
}

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLElement> {
  children?: ReactNode;
  asChild?: boolean;
  className?: string;
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface PopoverDialogProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: PopoverVariant;
  size?: PopoverSize;
  className?: string;
  style?: CSSProperties;
}

export type { Placement };
