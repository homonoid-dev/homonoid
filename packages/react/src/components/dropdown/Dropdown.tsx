"use client";

import {
  useState,
  useId,
  useRef,
  type FC,
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
  useListNavigation,
  useTypeahead,
  useInteractions,
} from "@floating-ui/react";
import { DropdownContext, type DropdownContextValue } from "./DropdownContext";
import { DropdownTrigger } from "./DropdownTrigger";
import { DropdownContent } from "./DropdownContent";
import { DropdownList } from "./DropdownList";
import { DropdownItem } from "./DropdownItem";
import { DropdownGroup } from "./DropdownGroup";
import { DropdownShortcut } from "./DropdownShortcut";
import { Label } from "../label/Label";
import { all, cond } from "../../utils/condition";
import { cn } from "../../utils/cn";
import type { DropdownProps } from "./types";

export interface DropdownComponent extends FC<DropdownProps> {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
  List: typeof DropdownList;
  Item: typeof DropdownItem;
  Group: typeof DropdownGroup;
  Label: typeof Label;
  Shortcut: typeof DropdownShortcut;
}

export const Dropdown: DropdownComponent = function Dropdown({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  offset = 8,
  size = "md",
  radius = "lg",
  disabled = false,
  id,
  className,
}: DropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(defaultOpen));
  const isControlled = controlledOpen !== undefined;
  const isOpen = cond(isControlled, Boolean(controlledOpen), uncontrolledOpen);

  const rawId = useId();
  const triggerId = id || `dropdown-trigger-${rawId}`;
  const menuId = `dropdown-menu-${rawId}`;

  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (disabled) return;
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

  const dismiss = useDismiss(context);

  const role = useRole(context, {
    role: "menu",
  });

  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex: highlightedIndex,
    onNavigate: setHighlightedIndex,
    loop: true,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex: highlightedIndex,
    onMatch: setHighlightedIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
    typeahead,
  ]);

  const contextValue: DropdownContextValue = {
    open: isOpen,
    setOpen: handleOpenChange,
    disabled,
    size,
    radius,
    triggerId,
    menuId,
    floatingStyles,
    context,
    setReference,
    setFloating,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    highlightedIndex,
    setHighlightedIndex,
    elementsRef,
    labelsRef,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={cn("relative inline-block", className)}>{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.displayName = "Dropdown";
Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;
Dropdown.Group = DropdownGroup;
Dropdown.Label = Label;
Dropdown.Shortcut = DropdownShortcut;
