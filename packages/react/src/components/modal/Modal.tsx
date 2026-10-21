"use client";

import {
  useState,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
  useMergeRefs,
} from "@floating-ui/react";
import { ModalContext } from "./ModalContext";
import { ModalTrigger } from "./ModalTrigger";
import { ModalBackdrop } from "./ModalBackdrop";
import { ModalContainer } from "./ModalContainer";
import { ModalDialog } from "./ModalDialog";
import { ModalHeader } from "./ModalHeader";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { Heading } from "../heading/Heading";
import { cn } from "../../utils/cn";
import { all, cond } from "../../utils/condition";
import type { ModalProps, ModalContextValue } from "./types";

export function Modal({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  size = "md",
  variant = "default",
  scroll = "inside",
  closeOnEscape = true,
  role = "dialog",
  preventClose = false,
  className,
}: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(defaultOpen));
  const [isDismissable, setIsDismissable] = useState(true);
  const isControlled = controlledOpen !== undefined;
  const isOpen = cond(isControlled, Boolean(controlledOpen), uncontrolledOpen);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const { context, refs } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
  });

  const click = useClick(context, {
    enabled: true,
  });

  const dismiss = useDismiss(context, {
    enabled: !preventClose,
    escapeKey: all(!preventClose, closeOnEscape),
    outsidePress: all(!preventClose, isDismissable),
  });

  const roleHook = useRole(context, {
    role,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    roleHook,
  ]);

  const backdropTransition = useTransitionStyles(context, {
    duration: { open: 200, close: 150 },
    common: {
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  });

  const dialogTransition = useTransitionStyles(context, {
    duration: { open: 200, close: 150 },
    common: {
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    initial: {
      opacity: 0,
      transform: "scale(0.96)",
    },
    open: {
      opacity: 1,
      transform: "scale(1)",
    },
    close: {
      opacity: 0,
      transform: "scale(0.96)",
    },
  });

  const contextValue: ModalContextValue = {
    open: isOpen,
    setOpen: handleOpenChange,
    size,
    variant,
    scroll,
    closeOnEscape: all(!preventClose, closeOnEscape),
    role,
    isDismissable: all(!preventClose, isDismissable),
    setIsDismissable,
    context,
    setReference: refs.setReference,
    setFloating: refs.setFloating,
    getReferenceProps,
    getFloatingProps,
    isMounted: backdropTransition.isMounted,
    backdropStyles: backdropTransition.styles,
    dialogStyles: dialogTransition.styles,
  };

  let hasExplicitTrigger = false;
  let backdropNode: ReactNode = null;
  const triggerNodes: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const element = child as ReactElement;
      const displayName = (element.type as { displayName?: string })?.displayName;

      if (cond(element.type === ModalTrigger, true, displayName === "Modal.Trigger")) {
        hasExplicitTrigger = true;
      } else if (cond(element.type === ModalBackdrop, true, displayName === "Modal.Backdrop")) {
        backdropNode = child;
      } else {
        triggerNodes.push(child);
      }
    } else if (child !== null && child !== undefined) {
      triggerNodes.push(child);
    }
  });

  if (hasExplicitTrigger) {
    return (
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
    );
  }

  const renderedTriggers = triggerNodes.map((child, index) => {
    if (isValidElement(child)) {
      const el = child as ReactElement<Record<string, unknown>>;
      const childRef = (el.props as { ref?: React.Ref<HTMLElement> })?.ref;
      const mergedRef = useMergeRefs([refs.setReference, childRef]);
      const referenceProps = getReferenceProps(el.props);

      return cloneElement(el, {
        key: el.key ?? index,
        ...referenceProps,
        ref: mergedRef,
      });
    }

    const mergedRef = useMergeRefs([refs.setReference]);
    return (
      <span
        key={index}
        ref={mergedRef}
        {...getReferenceProps()}
        className={cn("inline-flex items-center", className)}
      >
        {child}
      </span>
    );
  });

  return (
    <ModalContext.Provider value={contextValue}>
      {renderedTriggers}
      {backdropNode}
    </ModalContext.Provider>
  );
}

Modal.displayName = "Modal";
Modal.Trigger = ModalTrigger;
Modal.Backdrop = ModalBackdrop;
Modal.Container = ModalContainer;
Modal.Dialog = ModalDialog;
Modal.Header = ModalHeader;
Modal.Heading = Heading;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
