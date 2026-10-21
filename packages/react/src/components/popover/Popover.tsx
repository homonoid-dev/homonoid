"use client";

import {
  useState,
  useId,
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
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  type Placement,
} from "@floating-ui/react";
import { PopoverContext, type PopoverContextValue } from "./PopoverContext";
import { PopoverTrigger } from "./PopoverTrigger";
import { PopoverContent } from "./PopoverContent";
import { PopoverDialog } from "./PopoverDialog";
import { Heading } from "../heading/Heading";
import { all, cond } from "../../utils/condition";
import type { PopoverProps } from "./types";

export function Popover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  side = "bottom",
  align = "center",
  offset = 8,
  placement: explicitPlacement,
  modal = false,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  variant = "surface",
  size = "auto",
  className,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(defaultOpen));
  const isControlled = controlledOpen !== undefined;
  const isOpen = cond(isControlled, Boolean(controlledOpen), uncontrolledOpen);

  const placement = cond(
    Boolean(explicitPlacement),
    explicitPlacement,
    cond(align === "center", side, `${side}-${align}`)
  ) as Placement;

  const rawId = useId();
  const dialogId = `popover-dialog-${rawId}`;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const {
    floatingStyles,
    context,
    refs: { setReference, setFloating },
  } = useFloating({
    open: all(!disabled, isOpen),
    onOpenChange: handleOpenChange,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetMiddleware(offset),
      flip({ fallbackAxisSideDirection: "start", padding: 8 }),
      shift({ padding: 8 }),
    ],
  });

  const click = useClick(context, {
    enabled: !disabled,
  });

  const dismiss = useDismiss(context, {
    enabled: !disabled,
    outsidePress: isDismissable,
    escapeKey: !isKeyboardDismissDisabled,
  });

  const role = useRole(context, {
    role: "dialog",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const contextValue: PopoverContextValue = {
    open: isOpen,
    setOpen: handleOpenChange,
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
    modal,
    dialogId,
  };

  let hasExplicitTrigger = false;
  let standaloneContentNode: ReactNode = null;
  const triggerNodes: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const element = child as ReactElement;
      const displayName = (element.type as { displayName?: string })?.displayName;

      if (cond(element.type === PopoverTrigger, true, displayName === "Popover.Trigger")) {
        hasExplicitTrigger = true;
      } else if (cond(element.type === PopoverContent, true, displayName === "Popover.Content")) {
        standaloneContentNode = child;
      } else {
        triggerNodes.push(child);
      }
    } else if (child !== null && child !== undefined) {
      triggerNodes.push(child);
    }
  });

  if (all(!hasExplicitTrigger, Boolean(standaloneContentNode))) {
    const triggerContent = cond(triggerNodes.length === 1, triggerNodes[0], triggerNodes);
    return (
      <PopoverContext.Provider value={contextValue}>
        <PopoverTrigger className={className}>{triggerContent}</PopoverTrigger>
        {standaloneContentNode}
      </PopoverContext.Provider>
    );
  }

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}

Popover.displayName = "Popover";
Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Dialog = PopoverDialog;
Popover.Heading = Heading;
