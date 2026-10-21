"use client";

import {
  useState,
  useId,
  useRef,
  useEffect,
  useCallback,
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  size as sizeMiddleware,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  useTypeahead,
  useInteractions,
} from "@floating-ui/react";
import { SelectContext, type SelectContextValue } from "./SelectContext";
import { SelectTrigger } from "./SelectTrigger";
import { SelectValue } from "./SelectValue";
import { SelectContent } from "./SelectContent";
import { SelectList } from "./SelectList";
import { SelectItem } from "./SelectItem";
import { SelectGroup } from "./SelectGroup";
import { SelectSeparator } from "./SelectSeparator";
import { Label } from "../label/Label";
import { Description } from "../description/Description";
import { any, cond, when } from "../../utils/condition";
import { cn } from "../../utils/cn";
import type { SelectProps } from "./types";

export interface SelectComponent extends React.FC<SelectProps> {
  Trigger: typeof SelectTrigger;
  Value: typeof SelectValue;
  Content: typeof SelectContent;
  List: typeof SelectList;
  Item: typeof SelectItem;
  Group: typeof SelectGroup;
  Label: typeof Label;
  Description: typeof Description;
  Separator: typeof SelectSeparator;
}

export const Select: SelectComponent = function Select({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  invalid = false,
  size = "md",
  radius = "lg",
  variant = "outlined",
  color = "surface",
  placeholder = "Select option",
  label,
  description,
  error,
  options,
  id,
  className,
}: SelectProps) {
  const itemsMapRef = useRef<Map<string, ReactNode>>(new Map());

  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(
    defaultValue
  );
  const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(defaultOpen));

  const isValueControlled = controlledValue !== undefined;
  const isValue = cond(isValueControlled, controlledValue, uncontrolledValue);

  const initialValue = cond(isValueControlled, controlledValue, defaultValue);
  const getInitialLabel = (): ReactNode => {
    if (!initialValue) return undefined;
    if (options && options.length > 0) {
      return options.find((opt) => opt.value === initialValue)?.label || initialValue;
    }
    let foundLabel: ReactNode = undefined;
    const extractFromChildren = (nodes: ReactNode) => {
      Children.forEach(nodes, (child) => {
        if (!isValidElement(child)) return;
        const props = child.props as Record<string, unknown>;
        if (props.value === initialValue) {
          foundLabel = (props.label as ReactNode) || (props.children as ReactNode) || props.value;
          return;
        }
        if (props.children) {
          extractFromChildren(props.children as ReactNode);
        }
      });
    };
    extractFromChildren(children);
    return foundLabel;
  };

  const [selectedLabel, setSelectedLabel] = useState<ReactNode>(getInitialLabel);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const registerItem = useCallback((val: string, labelNode: ReactNode) => {
    itemsMapRef.current.set(val, labelNode);
    if (isValue === val) {
      setSelectedLabel(labelNode);
    }
    return () => {
      itemsMapRef.current.delete(val);
    };
  }, [isValue]);

  const getItemLabel = useCallback((val: string) => {
    return itemsMapRef.current.get(val);
  }, []);

  useEffect(() => {
    if (options && isValue !== undefined) {
      const match = options.find((opt) => opt.value === isValue);
      if (match) {
        setSelectedLabel(match.label || match.value);
        return;
      }
    }
    if (isValue !== undefined) {
      const registered = itemsMapRef.current.get(isValue);
      if (registered !== undefined) {
        setSelectedLabel(registered);
      }
    } else {
      setSelectedLabel(undefined);
    }
  }, [options, isValue]);

  const isOpenControlled = controlledOpen !== undefined;
  const isOpen = cond(isOpenControlled, Boolean(controlledOpen), uncontrolledOpen);

  const rawId = useId();
  const triggerId = id || `select-trigger-${rawId}`;
  const listboxId = `select-listbox-${rawId}`;
  const labelId = `select-label-${rawId}`;
  const descriptionId = `select-desc-${rawId}`;
  const errorId = `select-error-${rawId}`;

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isOpenControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const handleValueChange = (nextValue: string) => {
    if (!isValueControlled) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const {
    floatingStyles,
    context,
    refs: { setReference, setFloating },
  } = useFloating({
    open: !disabled && isOpen,
    onOpenChange: handleOpenChange,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetMiddleware(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      sizeMiddleware({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const click = useClick(context, {
    enabled: !disabled,
  });

  const dismiss = useDismiss(context, {
    enabled: !disabled,
  });

  const role = useRole(context, {
    role: "listbox",
  });

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex: highlightedIndex,
    selectedIndex: highlightedIndex,
    onNavigate: setHighlightedIndex,
    loop: true,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex: highlightedIndex,
    selectedIndex: highlightedIndex,
    onMatch: setHighlightedIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
    typeahead,
  ]);

  const contextValue: SelectContextValue = {
    open: isOpen,
    setOpen: handleOpenChange,
    value: isValue,
    setValue: handleValueChange,
    selectedLabel,
    setSelectedLabel,
    placeholder,
    disabled,
    invalid: Boolean(invalid || error),
    size,
    radius,
    variant,
    color,
    triggerId,
    listboxId,
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
    registerItem,
    getItemLabel,
  };

  let hasExplicitTrigger = false;
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const element = child as ReactElement;
      const displayName = (element.type as { displayName?: string })?.displayName;
      if (cond(element.type === SelectTrigger, true, displayName === "Select.Trigger")) {
        hasExplicitTrigger = true;
      }
    }
  });

  const renderContent = () => {
    if (hasExplicitTrigger) {
      return children;
    }

    if (options && options.length > 0) {
      return (
        <>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectList>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  description={option.description}
                  leading={option.leading}
                  disabled={option.disabled}
                />
              ))}
            </SelectList>
          </SelectContent>
        </>
      );
    }

    return children;
  };

  const hasFormWrapping = any(label, description, error);

  if (hasFormWrapping) {
    return (
      <SelectContext.Provider value={contextValue}>
        <div className={cn("flex flex-col gap-1.5 w-full", className)}>
          {when(
            label,
            <Label id={labelId} htmlFor={triggerId} size={size}>
              {label}
            </Label>
          )}
          {renderContent()}
          {when(
            description && !error,
            <Description id={descriptionId} size="sm">
              {description}
            </Description>
          )}
          {when(
            error,
            <Description id={errorId} size="sm" className="text-destructive">
              {error}
            </Description>
          )}
        </div>
      </SelectContext.Provider>
    );
  }

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn("w-full", className)}>{renderContent()}</div>
    </SelectContext.Provider>
  );
};

Select.displayName = "Select";
Select.Trigger = SelectTrigger;
Select.Value = SelectValue;
Select.Content = SelectContent;
Select.List = SelectList;
Select.Item = SelectItem;
Select.Group = SelectGroup;
Select.Label = Label;
Select.Description = Description;
Select.Separator = SelectSeparator;
