"use client";

import {
  useState,
  Children,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  type Placement,
} from "@floating-ui/react";
import { TooltipContext, type TooltipContextValue } from "./TooltipContext";
import { TooltipTrigger } from "./TooltipTrigger";
import { TooltipContent } from "./TooltipContent";
import { TooltipShortcut } from "./TooltipShortcut";
import { all, cond } from "../../utils/condition";
import type { TooltipProps } from "./types";

export function Tooltip({
  children,
  content,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  side = "top",
  align = "center",
  offset = 6,
  delay = { open: 120, close: 0 },
  variant = "inverted",
  size = "sm",
  className,
}: TooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(defaultOpen));
  const isControlled = controlledOpen !== undefined;
  const isOpen = cond(isControlled, Boolean(controlledOpen), uncontrolledOpen);

  const placement = cond(
    align === "center",
    side,
    `${side}-${align}`
  ) as Placement;

  const resolvedDelay = cond(
    typeof delay === "number",
    { open: delay as number, close: 0 },
    delay || { open: 120, close: 0 }
  );

  const {
    floatingStyles,
    context,
    refs: { setReference, setFloating },
  } = useFloating({
    open: all(!disabled, isOpen),
    onOpenChange: (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetMiddleware(offset),
      flip({ fallbackAxisSideDirection: "start", padding: 8 }),
      shift({ padding: 8 }),
    ],
  });

  const hover = useHover(context, {
    enabled: !disabled,
    move: false,
    delay: resolvedDelay,
  });

  const focus = useFocus(context, {
    enabled: !disabled,
  });

  const dismiss = useDismiss(context, {
    referencePress: true,
  });

  const role = useRole(context, {
    role: "tooltip",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const contextValue: TooltipContextValue = {
    open: isOpen,
    setOpen: (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    floatingStyles,
    context,
    setReference,
    setFloating,
    getReferenceProps,
    getFloatingProps,
    disabled,
    variant,
    size,
    side,
    align,
    offset,
  };

  if (Boolean(content)) {
    return (
      <TooltipContext.Provider value={contextValue}>
        <TooltipTrigger className={className}>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipContext.Provider>
    );
  }

  let hasExplicitTrigger = false;
  let standaloneContentNode: ReactNode = null;
  const triggerNodes: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const element = child as ReactElement;
      const displayName = (element.type as { displayName?: string })?.displayName;

      if (cond(element.type === TooltipTrigger, true, displayName === "Tooltip.Trigger")) {
        hasExplicitTrigger = true;
      } else if (cond(element.type === TooltipContent, true, displayName === "Tooltip.Content")) {
        standaloneContentNode = child;
      } else {
        triggerNodes.push(child);
      }
    } else {
      triggerNodes.push(child);
    }
  });

  if (all(!hasExplicitTrigger, Boolean(standaloneContentNode))) {
    return (
      <TooltipContext.Provider value={contextValue}>
        <TooltipTrigger className={className}>{triggerNodes}</TooltipTrigger>
        {standaloneContentNode}
      </TooltipContext.Provider>
    );
  }

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  );
}

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
Tooltip.Shortcut = TooltipShortcut;
