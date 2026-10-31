"use client";

import {
  forwardRef,
  useState,
  useRef,
  useId,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  size as sizeMiddleware,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { Label } from "../label/Label";
import {
  AutocompleteContext,
  type AutocompleteContextValue,
  type RegisteredItem,
} from "./AutocompleteContext";
import { AutocompleteInput } from "./AutocompleteInput";
import { AutocompleteContent } from "./AutocompleteContent";
import { AutocompleteList } from "./AutocompleteList";
import { AutocompleteItem } from "./AutocompleteItem";
import { AutocompleteGroup } from "./AutocompleteGroup";
import { AutocompleteEmpty } from "./AutocompleteEmpty";
import type { AutocompleteOption, AutocompleteProps } from "./types";

export interface AutocompleteComponent
  extends React.ForwardRefExoticComponent<
    AutocompleteProps & React.RefAttributes<HTMLDivElement>
  > {
  Input: typeof AutocompleteInput;
  Content: typeof AutocompleteContent;
  List: typeof AutocompleteList;
  Item: typeof AutocompleteItem;
  Group: typeof AutocompleteGroup;
  Label: typeof Label;
  Empty: typeof AutocompleteEmpty;
}

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  function Autocomplete(
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      query: controlledQuery,
      defaultQuery,
      onQueryChange,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      onSelect,
      disabled = false,
      invalid = false,
      size = "md",
      radius = "lg",
      color = "surface",
      placeholder = "Search...",
      options,
      leading,
      trailing,
      loading = false,
      filter,
      clearable = true,
      className,
      children,
      ...props
    },
    ref
  ) {
    const isValueControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(
      defaultValue
    );
    const activeValue = cond(isValueControlled, controlledValue, uncontrolledValue);

    const isQueryControlled = controlledQuery !== undefined;
    const [uncontrolledQuery, setUncontrolledQuery] = useState<string>(() => {
      if (defaultQuery !== undefined) return defaultQuery;
      if (defaultValue && options) {
        const found = options.find((opt) => opt.value === defaultValue);
        return found?.label || found?.value || "";
      }
      return "";
    });
    const activeQuery = cond(isQueryControlled, controlledQuery ?? "", uncontrolledQuery);

    const queryRef = useRef(activeQuery);
    queryRef.current = activeQuery;

    const valueRef = useRef(activeValue);
    valueRef.current = activeValue;

    const isOpenControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(Boolean(defaultOpen));
    const isOpen = cond(isOpenControlled, Boolean(controlledOpen), uncontrolledOpen);

    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const [registeredItems, setRegisteredItems] = useState<RegisteredItem[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const rawId = useId();
    const inputId = `autocomplete-input-${rawId}`;
    const listboxId = `autocomplete-listbox-${rawId}`;

    const handleOpenChange = useCallback(
      (nextOpen: boolean) => {
        if (disabled) return;
        if (!isOpenControlled) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
        if (!nextOpen) {
          setHighlightedIndex(null);
          if (!queryRef.current.trim() && !isValueControlled) {
            setUncontrolledValue("");
            onValueChange?.("");
          }
        }
      },
      [disabled, isOpenControlled, onOpenChange, isValueControlled, onValueChange]
    );

    const handleQueryChange = useCallback(
      (nextQuery: string) => {
        queryRef.current = nextQuery;
        if (!isQueryControlled) {
          setUncontrolledQuery(nextQuery);
        }
        onQueryChange?.(nextQuery);
      },
      [isQueryControlled, onQueryChange]
    );

    const handleValueChange = useCallback(
      (nextValue: string) => {
        valueRef.current = nextValue;
        if (!isValueControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [isValueControlled, onValueChange]
    );

    const registerItem = useCallback((item: RegisteredItem) => {
      setRegisteredItems((prev) => {
        const existing = prev.findIndex((i) => i.id === item.id);
        if (existing !== -1) {
          const updated = [...prev];
          updated[existing] = item;
          return updated;
        }
        return [...prev, item];
      });

      if (valueRef.current && item.value === valueRef.current && !queryRef.current) {
        queryRef.current = item.label || item.value;
        handleQueryChange(item.label || item.value);
      }

      return () => {
        setRegisteredItems((prev) => prev.filter((i) => i.id !== item.id));
      };
    }, [handleQueryChange]);

    const onSelectOption = useCallback(
      (val: string, option?: AutocompleteOption) => {
        const nextQuery = option?.label || val;
        queryRef.current = nextQuery;
        valueRef.current = val;
        handleValueChange(val);
        handleQueryChange(nextQuery);
        handleOpenChange(false);
        onSelect?.(val, option);
      },
      [handleValueChange, handleQueryChange, handleOpenChange, onSelect]
    );

    const clear = useCallback(() => {
      handleQueryChange("");
      handleValueChange("");
      setHighlightedIndex(null);
    }, [handleQueryChange, handleValueChange]);

    useEffect(() => {
      setHighlightedIndex(null);
    }, [activeQuery]);

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
              width: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });

    const dismiss = useDismiss(context, {
      enabled: !disabled,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
      dismiss,
    ]);

    const highlightedId =
      highlightedIndex !== null
        ? registeredItems[highlightedIndex]?.id
        : undefined;

    const contextValue: AutocompleteContextValue = {
      open: isOpen,
      setOpen: handleOpenChange,
      value: activeValue,
      setValue: handleValueChange,
      query: activeQuery,
      setQuery: handleQueryChange,
      disabled,
      invalid,
      size,
      radius,
      color,
      placeholder,
      clearable,
      loading,
      inputRef,
      inputId,
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
      highlightedId,
      registeredItems,
      registerItem,
      onSelectOption,
      clear,
      customFilter: filter,
    };

    const hasOptions = Boolean(options && options.length > 0);

    return (
      <AutocompleteContext.Provider value={contextValue}>
        <div ref={ref} className={cn("relative w-full", className)} {...props}>
          {cond(
            hasOptions,
            <>
              <AutocompleteInput
                placeholder={placeholder}
                leading={leading}
                trailing={trailing}
              />
              <AutocompleteContent>
                <AutocompleteList>
                  {options?.map((option) => (
                    <AutocompleteItem
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      description={option.description}
                      leading={option.leading}
                      trailing={option.trailing}
                      disabled={option.disabled}
                    />
                  ))}
                </AutocompleteList>
                <AutocompleteEmpty />
              </AutocompleteContent>
            </>,
            children
          )}
        </div>
      </AutocompleteContext.Provider>
    );
  }
) as AutocompleteComponent;

Autocomplete.displayName = "Autocomplete";
Autocomplete.Input = AutocompleteInput;
Autocomplete.Content = AutocompleteContent;
Autocomplete.List = AutocompleteList;
Autocomplete.Item = AutocompleteItem;
Autocomplete.Group = AutocompleteGroup;
Autocomplete.Label = Label;
Autocomplete.Empty = AutocompleteEmpty;
