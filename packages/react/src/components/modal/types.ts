import type {
  ReactNode,
  HTMLAttributes,
  CSSProperties,
} from "react";
import type { FloatingContext } from "@floating-ui/react";

export type ModalSize = "sm" | "md" | "lg" | "cover" | "full";
export type ModalVariant = "default" | "destructive";
export type ModalScroll = "inside" | "outside";
export type ModalBackdropVariant = "opaque" | "blur" | "transparent";

export interface ModalProps {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: ModalSize;
  variant?: ModalVariant;
  scroll?: ModalScroll;
  closeOnEscape?: boolean;
  role?: "dialog" | "alertdialog";
  preventClose?: boolean;
  className?: string;
}

export interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  size: ModalSize;
  variant: ModalVariant;
  scroll: ModalScroll;
  closeOnEscape: boolean;
  role: "dialog" | "alertdialog";
  isDismissable: boolean;
  setIsDismissable: (dismissable: boolean) => void;
  context: FloatingContext;
  setReference: (node: HTMLElement | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  getReferenceProps: (
    userProps?: Record<string, unknown>
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: Record<string, unknown>
  ) => Record<string, unknown>;
  isMounted: boolean;
  backdropStyles: CSSProperties;
  dialogStyles: CSSProperties;
}

export interface ModalBackdropProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: ModalBackdropVariant;
  isDismissable?: boolean;
  lockScroll?: boolean;
  className?: string;
}

export interface ModalContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export interface ModalDialogProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  size?: ModalSize;
  variant?: ModalVariant;
  scroll?: ModalScroll;
  className?: string;
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}
