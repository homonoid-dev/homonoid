import type { ReactNode, HTMLAttributes } from "react";
import type { Placement } from "@floating-ui/react";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";
export type TooltipVariant = "inverted" | "surface" | "primary";
export type TooltipSize = "sm" | "md";

export interface TooltipProps {
  children: ReactNode;
  content?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  side?: TooltipSide;
  align?: TooltipAlign;
  offset?: number;
  delay?: number | { open?: number; close?: number };
  variant?: TooltipVariant;
  size?: TooltipSize;
  className?: string;
}

export interface TooltipTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: TooltipVariant;
  size?: TooltipSize;
  className?: string;
  side?: TooltipSide;
  align?: TooltipAlign;
  offset?: number;
}

import type { KbdProps } from "../kbd/types";

export interface TooltipShortcutProps extends KbdProps { }

export type { Placement };
